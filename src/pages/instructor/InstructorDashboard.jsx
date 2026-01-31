import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { BookOpen, Users, DollarSign, PlusCircle } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const InstructorDashboard = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role === 'instructor') {
            // Matching by name for this demo since seed data uses names
            const q = query(collection(db, "courses"), where("instructor", "==", user.name || ""));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const courseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCourses(courseData);
                setLoading(false);
            });
            return () => unsubscribe();
        }
    }, [user]);

    // Calculate Stats
    const totalStudents = courses.reduce((acc, curr) => acc + (curr.totalStudents || 0), 0); // Mock field if not present
    // Assuming revenue is a calculation
    const totalRevenue = courses.length * 1500; // Mock calculation

    const stats = [
        { label: 'Active Courses', value: courses.length.toString(), icon: BookOpen, color: '#7c3aed' },
        { label: 'Total Students', value: totalStudents.toString(), icon: Users, color: '#10b981' },
        { label: 'Total Revenue', value: `$${totalRevenue}`, icon: DollarSign, color: '#f59e0b' },
    ];

    if (!user || user.role !== 'instructor') {
        // In a real app we would protect this route better
        // return <Navigate to="/login" />;
    }

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Instructor Dashboard</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back, {user?.name}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/instructor/students" className="btn btn-outline">
                        <Users size={20} style={{ marginRight: '0.5rem' }} /> Manage Students
                    </Link>
                    <Link to="/instructor/course/new" className="btn btn-primary">
                        <PlusCircle size={20} style={{ marginRight: '0.5rem' }} /> Create New Course
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ background: `${stat.color}20`, padding: '1rem', borderRadius: 'var(--radius-full)', color: stat.color }}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem' }}>Your Active Courses</h3>
                {courses.length > 0 ? (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {courses.map(course => (
                            <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{course.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Status: {course.status}</div>
                                </div>
                                <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>${course.price}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No active courses found.</p>
                )}
            </div>
        </div>
    );
};

export default InstructorDashboard;
