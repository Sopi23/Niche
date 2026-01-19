import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { CreditCard, CheckCircle } from 'lucide-react';

const Enroll = () => {
    const { id } = useParams();
    const course = courses.find(c => c.id === parseInt(id));
    const { user, enroll } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!course) return <div>Course not found</div>;

    const handlePayment = () => {
        setLoading(true);
        // Mock payment delay
        setTimeout(() => {
            enroll(course.id);
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }, 1500);
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>
                    <CheckCircle size={64} style={{ margin: '0 auto' }} />
                </div>
                <h2 style={{ marginBottom: '1rem' }}>Enrollment Successful!</h2>
                <p>Redirecting to your learning dashboard...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '3rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Complete Your Enrollment</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Billing Details</h3>
                    <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                        Logged in as: <strong>{user?.name || 'Guest'}</strong> <br />
                        Email: {user?.email}
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Payment Method</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-primary)', background: '#e0e7ff', color: 'var(--color-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <CreditCard size={20} /> Credit Card
                            </button>
                            <button style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                UPI / Wallet
                            </button>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Card Number</label>
                        <input type="text" placeholder="**** **** **** 4242" disabled style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: '#f9fafb' }} />
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Mock Payment - No real card needed</p>
                    </div>
                </div>

                <div className="card" style={{ height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <img src={course.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '0.9rem', lineHeight: 1.2 }}>{course.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{course.instructor}</div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem' }}>
                        <span>Total</span>
                        <span>${course.price}</span>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1.5rem' }}
                    >
                        {loading ? 'Processing...' : 'Pay & Enroll'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Enroll;
