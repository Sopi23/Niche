import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/courses" className="nav-link">Browse</Link>
                    <Link to="/bundles" className="nav-link">Bundles</Link>
                    <Link to="/live-classes" className="nav-link">Live</Link>
                    <Link to="/plans" className="nav-link">Plans</Link>

                    {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" className="nav-link">Admin</Link>
                    )}

                    {user ? (
                        <>
                            {user.role === 'instructor' && (
                                <Link to="/instructor/dashboard" className="nav-link">Dashboard</Link>
                            )}
                            {user.role === 'student' && (
                                <>
                                    <Link to="/dashboard" className="nav-link">My Learning</Link>
                                    <Link to="/wishlist" className="nav-link">Wishlist</Link>
                                </>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem', position: 'relative' }}>
                                <NotificationCenter />

                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-main)'
                                    }}
                                >
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={18} />
                                    </div>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{user.name}</span>
                                </button>

                                {showUserMenu && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '120%',
                                        right: 0,
                                        width: '200px',
                                        background: 'var(--color-bg-surface)',
                                        backdropFilter: 'var(--backdrop-blur)',
                                        WebkitBackdropFilter: 'var(--backdrop-blur)',
                                        borderRadius: 'var(--radius-md)',
                                        boxShadow: 'var(--shadow-lg)',
                                        border: '1px solid var(--color-border)',
                                        padding: '0.5rem',
                                        zIndex: 1000
                                    }}>
                                        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.5rem' }}>
                                            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{user.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{user.email}</p>
                                            <span style={{ display: 'inline-block', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--color-primary)', marginTop: '0.25rem', textTransform: 'capitalize' }}>{user.role}</span>
                                        </div>

                                        <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', color: 'var(--color-text-main)', textDecoration: 'none', fontSize: '0.875rem' }} className="nav-item-hover">
                                            <User size={16} /> My Profile
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.75rem',
                                                borderRadius: 'var(--radius-sm)',
                                                border: 'none',
                                                background: 'transparent',
                                                color: 'var(--color-danger)',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                                textAlign: 'left'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>Student Login</Link>
                            <Link to="/instructor/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', background: 'var(--gradient-text)', border: 'none' }}>Instructor Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
