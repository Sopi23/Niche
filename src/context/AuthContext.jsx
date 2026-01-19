import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name, email, role, avatar }

    const login = (email, password) => {
        // Mock login logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@niche.com') {
                    setUser({ name: 'Super Admin', email, role: 'admin' });
                    resolve({ role: 'admin' });
                } else if (email.includes('instructor')) {
                    setUser({ name: 'John Doe', email, role: 'instructor' });
                    resolve({ role: 'instructor' });
                } else if (email) {
                    setUser({ name: 'Jane Student', email, role: 'student', enrolledCourses: [] });
                    resolve({ role: 'student' });
                } else {
                    reject('Invalid credentials');
                }
            }, 500);
        });
    };

    const register = (userData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const { name, email, role, subtype } = userData;
                setUser({ name, email, role, subtype });
                resolve({ role, subtype });
            }, 800);
        });
    };

    const enroll = (courseId) => {
        if (user) {
            setUser({ ...user, enrolledCourses: [...(user.enrolledCourses || []), courseId] });
            return Promise.resolve();
        }
        return Promise.reject('User not logged in');
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, enroll }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
