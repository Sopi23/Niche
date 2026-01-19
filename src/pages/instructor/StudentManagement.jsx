import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

const StudentManagement = () => {
    // Mock Data
    const students = [
        { id: 1, name: 'Alice Johnson', course: 'Advanced Medical Imaging', progress: 85, status: 'Active' },
        { id: 2, name: 'Bob Smith', course: 'Niche Perfumery', progress: 100, status: 'Completed' },
        { id: 3, name: 'Charlie Brown', course: 'Quantum Computing', progress: 45, status: 'Active' },
    ];

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>Student Management</h1>

            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Name</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Course enrolled</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Progress</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Status</th>
                                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--color-text-secondary)' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{student.name}</td>
                                    <td style={{ padding: '1rem' }}>{student.course}</td>
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
                                        <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
