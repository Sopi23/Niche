import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                // Admin Registration
                // We typically wouldn't allow open registration for admins, but for this setup we allow it
                // specifically for the master email or validation.
                if (email !== 'admin@niche.com') {
                    // warning or restrict if needed. For now, we allow it.
                }

                // Explicitly passing role: 'admin'
                await register({ name: 'Super Admin', email, password, role: 'admin' });
                navigate('/admin/dashboard');
            } else {
                // Admin Login
                const userData = await login(email, password);

                // SECURITY CHECK: If this is the Master Admin email, ensure they have the role.
                if (email === 'admin@niche.com' && userData.role !== 'admin') {
                    await updateDoc(doc(db, "users", userData.uid), { role: 'admin' });
                    navigate('/admin/dashboard');
                    return;
                }

                if (userData.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    setError('Access Denied: You do not have administrator privileges.');
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Authentication failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderTop: '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                        <Shield size={32} />
                    </div>
                    <h2 style={{ textAlign: 'center', color: '#1e293b' }}>{isRegistering ? 'Setup Admin Access' : 'Admin Portal'}</h2>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>{isRegistering ? 'Create your secure admin account' : 'Secured Access Only'}</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#334155' }}>Admin Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@niche.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#334155' }}>
                            {isRegistering ? 'Create Password' : 'Security Key / Password'}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid #e2e8f0',
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
                        style={{ width: '100%', marginBottom: '1rem', padding: '0.875rem', fontWeight: '600' }}
                    >
                        {loading ? 'Processing...' : (isRegistering ? 'Create Admin Account' : 'Access Dashboard')}
                    </button>

                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button
                            type="button"
                            onClick={() => setIsRegistering(!isRegistering)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '500' }}
                        >
                            {isRegistering ? 'Back to Login' : 'First time? Create Admin Account'}
                        </button>

                        {!isRegistering && (
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.875rem', cursor: 'pointer' }}
                            >
                                Return to Platform
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
