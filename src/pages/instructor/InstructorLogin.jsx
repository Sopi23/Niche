import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, BookOpen } from 'lucide-react';

const InstructorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { role } = await login(email, password);
            if (role === 'instructor') {
                navigate('/instructor/dashboard');
            } else {
                setError('Access denied. This login is for Instructors only.');
                // Optional: logout if strict
            }
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '60px', height: '60px', background: 'var(--gradient-hover)', borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                        color: 'white', boxShadow: 'var(--shadow-lg)'
                    }}>
                        <BookOpen size={28} />
                    </div>
                    <h2 style={{ color: 'var(--color-text-main)', marginBottom: '0.5rem', fontSize: '1.75rem' }}>Instructor Login</h2>
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Manage your courses and students</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem', border: '1px solid currentColor' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="instructor@example.com"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 0.875rem 0.875rem 3rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Password</label>
                            <a href="#" style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '500' }}>Forgot?</a>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 0.875rem 0.875rem 3rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem', fontSize: '1rem' }}
                    >
                        {loading ? 'Logging in...' : 'Login as Instructor'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: '0.95rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                    <p style={{ marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Are you a student?</p>
                    <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Go to Student Login</Link>
                </div>
            </div>
        </div>
    );
};

export default InstructorLogin;
