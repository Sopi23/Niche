import React from 'react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import { PlayCircle, Award } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const enrolledCourseIds = user.enrolledCourses || [];
    const myCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>My Learning</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Track your progress and continue learning.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>{myCourses.length}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Enrolled Courses</div>
                </div>
            </div>

            {myCourses.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>You haven't enrolled in any courses yet.</h3>
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {myCourses.map(course => (
                        <div key={course.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <img src={course.image} alt={course.title} style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />

                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{course.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{course.instructor}</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <div style={{ flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: '35%', height: '100%', background: 'var(--color-accent)' }}></div>
                                    </div>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>35%</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <PlayCircle size={16} style={{ marginRight: '0.5rem' }} /> Continue
                                </button>
                                <Link to={`/certificate/${course.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none' }}>
                                    <Award size={16} style={{ marginRight: '0.5rem' }} /> Certificate
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
