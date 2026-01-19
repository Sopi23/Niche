import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Briefcase, GraduationCap } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('student'); // 'student' or 'instructor'
    const [subtype, setSubtype] = useState('student'); // Default subtype
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        // Set default subtype based on role
        if (newRole === 'student') setSubtype('student');
        else setSubtype('trainer');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await register({ name, email, password, role, subtype });
        setLoading(false);
        // Redirect based on role
        if (role === 'student') navigate('/dashboard');
        else navigate('/instructor/dashboard');
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '2rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Create Account</h2>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                    Join Niche to start your journey
                </p>

                {/* Role Selector */}
                <div style={{ display: 'flex', background: 'var(--color-bg-body)', padding: '0.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('student')}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            background: role === 'student' ? 'white' : 'transparent',
                            boxShadow: role === 'student' ? 'var(--shadow-sm)' : 'none',
                            color: role === 'student' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: '500',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}
                    >
                        <GraduationCap size={16} /> Learner
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('instructor')}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-sm)',
                            background: role === 'instructor' ? 'white' : 'transparent',
                            boxShadow: role === 'instructor' ? 'var(--shadow-sm)' : 'none',
                            color: role === 'instructor' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: '500',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}
                    >
                        <Briefcase size={16} /> Vendor/Instructor
                    </button>
                </div>

                {/* Subtype Selector */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                        {role === 'student' ? 'I am a...' : 'Register as...'}
                    </label>
                    <select
                        value={subtype}
                        onChange={(e) => setSubtype(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit' }}
                    >
                        {role === 'student' ? (
                            <>
                                <option value="student">Student</option>
                                <option value="professional">Working Professional</option>
                            </>
                        ) : (
                            <>
                                <option value="trainer">Individual Trainer</option>
                                <option value="academy">Academy</option>
                                <option value="institute">Institute</option>
                            </>
                        )}
                    </select>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit' }}
                            />
                        </div>
                    </div>

                    {role === 'instructor' && (
                        <>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Professional Bio</label>
                                <textarea
                                    placeholder="Tell us about your experience..."
                                    rows="3"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                                ></textarea>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Area of Expertise</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Design, Healthcare"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', fontFamily: 'inherit' }}
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '1rem' }}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
