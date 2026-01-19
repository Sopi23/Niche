import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'var(--color-bg-glass)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            transition: 'all 0.3s ease'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '70px'
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    lineHeight: 1.1,
                    letterSpacing: '-0.5px',
                    textDecoration: 'none'
                }}>
                    <span className="text-gradient" style={{ fontSize: '1.1rem', fontWeight: '800' }}>Niche Online Learning</span>
                    <span className="text-gradient" style={{ fontSize: '1.1rem', fontWeight: '800' }}>& Course Marketplace</span>
                </Link>

                {/* Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/courses" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.95rem' }}>Browse</Link>
                    <Link to="/bundles" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.95rem' }}>Bundles</Link>
                    <Link to="/live-classes" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.95rem' }}>Live</Link>
                    <Link to="/plans" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.95rem' }}>Plans</Link>
                    <Link to="/admin/dashboard" style={{ color: 'var(--color-text-secondary)', fontWeight: '600', fontSize: '0.95rem' }}>Admin</Link>

                    {user ? (
                        <>
                            {user.role === 'instructor' && (
                                <Link to="/instructor/dashboard" style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>Dashboard</Link>
                            )}
                            {user.role === 'student' && (
                                <Link to="/dashboard" style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>My Learning</Link>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user.name}</span>
                                <button onClick={handleLogout} style={{ color: 'var(--color-text-light)' }} title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1.2rem' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.4rem 1.2rem' }}>Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
