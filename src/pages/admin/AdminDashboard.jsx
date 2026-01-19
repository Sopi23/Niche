import React from 'react';
import { CheckCircle, XCircle, Users, BookOpen, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    // Mock Data
    const pendingInstructors = [
        { id: 1, name: 'Dr. Emily White', email: 'emily@example.com', expertise: 'Healthcare', status: 'Pending' },
        { id: 2, name: 'Mark Zuckerberg', email: 'mark@example.com', expertise: 'Technology', status: 'Pending' },
    ];

    const stats = [
        { label: 'Total Users', value: '15,234', icon: Users, color: '#4f46e5' },
        { label: 'Total Courses', value: '450', icon: BookOpen, color: '#f59e0b' },
        { label: 'Platform Revenue', value: '$85,400', icon: DollarSign, color: '#10b981' },
    ];

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>Platform Overview and Management</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${stat.color}` }}>
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

            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Pending Instructor Approvals</h2>
            <div className="card" style={{ marginBottom: '3rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Name</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Email</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Expertise Area</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingInstructors.map(inst => (
                            <tr key={inst.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{inst.name}</td>
                                <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{inst.email}</td>
                                <td style={{ padding: '1rem' }}>{inst.expertise}</td>
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', background: '#10b981' }}>
                                        Approve
                                    </button>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', color: '#dc2626', borderColor: '#dc2626' }}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Platform Commissions</h2>
            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Transaction ID</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Course/Bundle</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Instructor</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Amount</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Platform Fee (10%)</th>
                            <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 'TXN-001', item: 'React Mastery Bundle', instructor: 'Niche Academy', amount: '$199.99', fee: '$20.00', status: 'Paid' },
                            { id: 'TXN-002', item: 'Data Science Path', instructor: 'Data Pro Institute', amount: '$349.99', fee: '$35.00', status: 'Pending' },
                            { id: 'TXN-003', item: 'Advanced Medical Imaging', instructor: 'Dr. Sarah Smith', amount: '$49.99', fee: '$5.00', status: 'Paid' },
                        ].map((txn, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '500' }}>{txn.id}</td>
                                <td style={{ padding: '1rem' }}>{txn.item}</td>
                                <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{txn.instructor}</td>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>{txn.amount}</td>
                                <td style={{ padding: '1rem', color: '#10b981', fontWeight: '600' }}>{txn.fee}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        background: txn.status === 'Paid' ? '#dcfce7' : '#fff7ed',
                                        color: txn.status === 'Paid' ? '#15803d' : '#fea500'
                                    }}>
                                        {txn.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
