import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [{ id, message, type, read: false, createdAt: new Date() }, ...prev]);
        // Auto remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUser({ ...userDoc.data(), uid: firebaseUser.uid, email: firebaseUser.email });
                    } else {
                        // Fallback if firestore doc is missing, primarily for safety
                        setUser({ email: firebaseUser.email, uid: firebaseUser.uid });
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Check for approval
            if (userData.role !== 'admin' && userData.status === 'pending') {
                await signOut(auth); // Sign out immediately
                throw new Error("Your account is pending approval by an administrator.");
            }
            if (userData.role !== 'admin' && userData.status === 'rejected') {
                await signOut(auth);
                throw new Error("Your account has been rejected.");
            }

            setUser({ ...userData, uid: userCredential.user.uid, email: userCredential.user.email });
            return userData;
        } else {
            throw new Error("User profile not found");
        }
    };

    const register = async (userData) => {
        const { email, password, name, role, subtype, ...rest } = userData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const newUser = {
            name,
            email,
            role,
            subtype: subtype || 'student',
            status: 'pending', // Default status for everyone
            createdAt: new Date().toISOString(),
            enrolledCourses: [],
            wishlist: [],
            ...rest
        };

        await setDoc(doc(db, "users", userCredential.user.uid), newUser);
        // Do NOT set user state here to prevent auto-login for pending users
        // setUser({ ...newUser, uid: userCredential.user.uid });
        // Instead, require them to wait for approval.
        // But Firebase automatically signs them in. We should sign them out.
        await signOut(auth);

        return newUser;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const enroll = async (courseId) => {
        if (user) {
            const updatedEnrolled = [...(user.enrolledCourses || []), courseId];

            // Prevent duplicate enrollment
            if (user.enrolledCourses?.includes(courseId)) {
                return Promise.resolve(); // Already enrolled
            }

            // Optimistic update
            setUser({ ...user, enrolledCourses: updatedEnrolled });

            // Update Firestore
            try {
                await updateDoc(doc(db, 'users', user.uid), { enrolledCourses: updatedEnrolled });
                return Promise.resolve();
            } catch (error) {
                console.error("Enrollment failed:", error);
                return Promise.reject(error);
            }
        }
        return Promise.reject('User not logged in');
    };

    const toggleWishlist = async (courseId) => {
        if (!user) return;

        const currentWishlist = user.wishlist || [];
        let newWishlist;

        if (currentWishlist.includes(courseId)) {
            newWishlist = currentWishlist.filter(id => id !== courseId);
        } else {
            newWishlist = [...currentWishlist, courseId];
        }

        // Optimistic update
        setUser({ ...user, wishlist: newWishlist });

        // Firestore update
        try {
            await updateDoc(doc(db, "users", user.uid), { wishlist: newWishlist });
        } catch (error) {
            console.error("Error updating wishlist:", error);
            // Revert on error (optional, simplified here)
        }
    };

    const updateProfileData = async (data) => {
        if (!user) return;
        try {
            await updateDoc(doc(db, "users", user.uid), data);
            setUser({ ...user, ...data });
            addNotification('Profile updated successfully!', 'success');
        } catch (error) {
            console.error("Error updating profile:", error);
            addNotification('Failed to update profile.', 'error');
            throw error;
        }
    };

    const uploadProfileImage = async (file) => {
        if (!user || !file) return;
        try {
            const storageRef = ref(storage, `profile_images/${user.uid}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Update Firestore and Local State
            await updateProfileData({ photoURL: downloadURL });
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            addNotification('Failed to upload image.', 'error');
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, resetPassword, enroll, toggleWishlist, updateProfileData, uploadProfileImage, loading, notifications, addNotification, markAsRead }}>
            {loading ? (
                <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
