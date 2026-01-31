import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const { addNotification } = useAuth();

    const [pendingInstructors, setPendingInstructors] = useState([]);
    const [pendingStudents, setPendingStudents] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Subscribe to Pending Instructors
    useEffect(() => {
        const q = query(collection(db, "users"), where("role", "==", "instructor"), where("status", "==", "pending"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const instructors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingInstructors(instructors);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Subscribe to Pending Students
    useEffect(() => {
        const q = query(collection(db, "users"), where("role", "==", "student"), where("status", "==", "pending"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingStudents(students);
        });
        return () => unsubscribe();
    }, []);

    // Subscribe to Pending Courses
    useEffect(() => {
        const q = query(collection(db, "courses"), where("status", "==", "pending"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingCourses(courses);
        });
        return () => unsubscribe();
    }, []);

    // Subscribe to ALL Approved/Active Courses
    useEffect(() => {
        const q = query(collection(db, "courses"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllCourses(courses);
        });
        return () => unsubscribe();
    }, []);

    // Subscribe to All Users
    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllUsers(users);
        });
        return () => unsubscribe();
    }, []);

    // Instructor Actions
    const approveInstructor = async (id) => {
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, { status: "approved" });
            const instructor = pendingInstructors.find(i => i.id === id);
            addNotification(`Approved instructor: ${instructor?.name}`, 'success');
        } catch (error) {
            console.error("Error approving instructor:", error);
            addNotification("Failed to approve instructor", 'error');
        }
    };

    const rejectInstructor = async (id) => {
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, { status: "rejected" });
            const instructor = pendingInstructors.find(i => i.id === id);
            addNotification(`Rejected instructor: ${instructor?.name}`, 'error');
        } catch (error) {
            console.error("Error rejecting instructor:", error);
            addNotification("Failed to reject instructor", 'error');
        }
    };

    // Student Actions
    const approveStudent = async (id) => {
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, { status: "approved" });
            const student = pendingStudents.find(s => s.id === id);
            addNotification(`Approved student: ${student?.name}`, 'success');
        } catch (error) {
            console.error("Error approving student:", error);
            addNotification("Failed to approve student", 'error');
        }
    };

    const rejectStudent = async (id) => {
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, { status: "rejected" });
            const student = pendingStudents.find(s => s.id === id);
            addNotification(`Rejected student: ${student?.name}`, 'error');
        } catch (error) {
            console.error("Error rejecting student:", error);
            addNotification("Failed to reject student", 'error');
        }
    };

    // Course Actions
    const approveCourse = async (id) => {
        try {
            const courseRef = doc(db, "courses", id);
            await updateDoc(courseRef, { status: "approved" });
            const course = pendingCourses.find(c => c.id === id);
            addNotification(`Approved course: ${course?.title}`, 'success');
        } catch (error) {
            console.error("Error approving course:", error);
            addNotification("Failed to approve course", 'error');
        }
    };

    const rejectCourse = async (id) => {
        try {
            const courseRef = doc(db, "courses", id);
            await updateDoc(courseRef, { status: "rejected" });
            const course = pendingCourses.find(c => c.id === id);
            addNotification(`Rejected course: ${course?.title}`, 'error');
        } catch (error) {
            console.error("Error rejecting course:", error);
            addNotification("Failed to reject course", 'error');
        }
    };

    const deleteCourse = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this course? This cannot be undone.")) return;
            await deleteDoc(doc(db, "courses", id));
            addNotification("Course deleted successfully", 'success');
        } catch (error) {
            console.error("Error deleting course:", error);
            addNotification("Failed to delete course", 'error');
        }
    };

    const updateCourse = async (id, data) => {
        try {
            const courseRef = doc(db, "courses", id);
            await updateDoc(courseRef, data);
            addNotification("Course updated successfully", 'success');
        } catch (error) {
            console.error("Error updating course:", error);
            addNotification("Failed to update course", 'error');
        }
    };

    // User Management Actions
    const updateUser = async (id, data) => {
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, data);
            addNotification("User updated successfully", 'success');
        } catch (error) {
            console.error("Error updating user:", error);
            addNotification("Failed to update user", 'error');
        }
    };

    const deleteUser = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this user? Their account data will be removed.")) return;
            await deleteDoc(doc(db, "users", id));
            addNotification("User deleted successfully", 'success');
        } catch (error) {
            console.error("Error deleting user:", error);
            addNotification("Failed to delete user", 'error');
        }
    };

    return (
        <AdminContext.Provider value={{
            pendingInstructors,
            pendingStudents,
            pendingCourses,
            allCourses,
            approveInstructor,
            rejectInstructor,
            approveStudent,
            rejectStudent,
            approveCourse,
            rejectCourse,
            deleteCourse,
            updateCourse,
            allUsers,
            deleteUser,
            updateUser,
            loading
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
