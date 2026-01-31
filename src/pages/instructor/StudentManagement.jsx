import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, CheckCircle, XCircle, X, User } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const StudentManagement = () => {
    const { user } = useAuth();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch real students (Dynamic Implementation)
    useEffect(() => {
        const fetchStudents = async () => {
            if (!user) return;
            setLoading(true);
            try {
                // 1. Get courses by this instructor
                const coursesQ = query(collection(db, "courses"), where("instructorId", "==", user.uid));
                const coursesSnapshot = await getDocs(coursesQ);
                const myCourseIds = coursesSnapshot.docs.map(doc => doc.id);

                if (myCourseIds.length === 0) {
                    setStudents([]);
                    setLoading(false);
                    return;
                }

                // 2. Get users who are enrolled in ANY of these courses
                // Note: array-contains-any is limited to 10 items. For scale, we'd need a different approach (e.g. separate enrollments collection).
                // For this demo, we'll fetch all students and filter in memory if list is small, or use batches.
                // Let's use a simpler approach: Fetch all 'student' users and filter client side for safety/simplicity in this demo.

                const usersQ = query(collection(db, "users"), where("role", "==", "student"));
                const usersSnapshot = await getDocs(usersQ);

                const myStudents = [];
                usersSnapshot.forEach(doc => {
                    const studentData = doc.data();
                    const enrolledInMyCourses = studentData.enrolledCourses?.filter(id => myCourseIds.includes(id));

                    if (enrolledInMyCourses && enrolledInMyCourses.length > 0) {
                        // Find which course names
                        const courseNames = coursesSnapshot.docs.filter(c => enrolledInMyCourses.includes(c.id)).map(c => c.data().title);

                        myStudents.push({
                            id: doc.id,
                            name: studentData.name,
                            email: studentData.email,
                            courses: courseNames.join(", "),
                            progress: Math.floor(Math.random() * 100), // Random progress for now as we don't track it per enrollment yet
                            status: 'Active', // Default
                            ...studentData
                        });
                    }
                });

                setStudents(myStudents);

            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [user]);

    // Fallback to mock if API fails or empty (optional, but good for demo continuity if they have no students yet)
    // Actually, let's stick to showing "No students found" if empty, to prove dynamic working.

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>Student Management</h1>

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Name</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Course(s) Enrolled</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Progress</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Loading students...</td></tr>
                            ) : students.length === 0 ? (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No students enrolled in your courses yet.</td></tr>
                            ) : (
                                students.map(student => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{student.name}</td>
                                        <td style={{ padding: '1rem' }}>{student.courses}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '100px', height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                                                    <div style={{ width: `${student.progress}%`, height: '100%', background: student.progress === 100 ? '#10b981' : 'var(--color-primary)' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.875rem' }}>{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: student.status === 'Completed' ? '#d1fae5' : '#e0e7ff',
                                                color: student.status === 'Completed' ? '#047857' : '#4338ca'
                                            }}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <button
                                                onClick={() => setSelectedStudent(student)}
                                                className="btn btn-outline"
                                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Details Modal */}
            {selectedStudent && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
                        <button
                            onClick={() => setSelectedStudent(null)}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--color-bg-body)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--color-primary)' }}>
                                <User size={40} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{selectedStudent.name}</h2>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{selectedStudent.email}</p>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'var(--color-bg-body)', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Enrolled Courses</h4>
                                <p style={{ fontWeight: '500' }}>{selectedStudent.courses}</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'var(--color-bg-body)', borderRadius: 'var(--radius-md)' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Progress</h4>
                                    <p style={{ fontWeight: '500', color: 'var(--color-primary)' }}>{selectedStudent.progress}%</p>
                                </div>
                                <div style={{ padding: '1rem', background: 'var(--color-bg-body)', borderRadius: 'var(--radius-md)' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>Join Date</h4>
                                    <p style={{ fontWeight: '500' }}>{new Date(selectedStudent.createdAt || Date.now()).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                                <Mail size={18} style={{ marginRight: '0.5rem' }} /> Send Message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentManagement;
