import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { BookOpen, Users, DollarSign, PlusCircle } from 'lucide-react';

const InstructorDashboard = () => {
    const { user } = useAuth();

    // Mock Data
    const stats = [
        { label: 'Active Courses', value: '4', icon: BookOpen, color: '#3b82f6' },
        { label: 'Total Students', value: '1,204', icon: Users, color: '#10b981' },
        { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: '#f59e0b' },
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
                <h3 style={{ marginBottom: '1.5rem' }}>Your Recently Active Courses</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>No courses active right now (Mock).</p>
            </div>
        </div>
    );
};

export default InstructorDashboard;
