import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Briefcase, GraduationCap, Phone, Calendar, MapPin, Globe, Linkedin, BookOpen, Clock, Globe2 } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('student');
    const [subtype, setSubtype] = useState('student');

    // Common Fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('prefer-not-say');
    const [address, setAddress] = useState('');

    // Student Fields
    const [education, setEducation] = useState('');
    const [learningGoals, setLearningGoals] = useState('');

    // Instructor Fields
    const [bio, setBio] = useState('');
    const [expertise, setExpertise] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [website, setWebsite] = useState('');
    const [experience, setExperience] = useState('');
    const [languages, setLanguages] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        if (newRole === 'student') setSubtype('student');
        else setSubtype('trainer');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const userData = {
                name, email, password, role, subtype,
                phone, dob, gender, address,
                ...(role === 'student' ? { education, learningGoals } : { bio, expertise, linkedin, website, experience, languages })
            };

            await register(userData);

            setLoading(false);
            if (role === 'student') navigate('/dashboard');
            else navigate('/instructor/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to register');
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
        outline: 'none', fontFamily: 'inherit'
    };

    const simpleInputStyle = {
        width: '100%', padding: '0.75rem',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
        outline: 'none', fontFamily: 'inherit'
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '2.5rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-primary)', fontSize: '2rem' }}>Create Account</h2>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '2.5rem' }}>
                    Join Niche to start your journey
                </p>

                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{error}</div>}

                {/* Role Tabs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('student')}
                        className={role === 'student' ? 'btn btn-primary' : 'btn btn-outline'}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '50px' }}
                    >
                        <GraduationCap size={20} /> I want to Learn
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleChange('instructor')}
                        className={role === 'instructor' ? 'btn btn-primary' : 'btn btn-outline'}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '50px' }}
                    >
                        <Briefcase size={20} /> I want to Teach
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Section 1: Account Info */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Account Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={inputStyle} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Role Type</label>
                                <select value={subtype} onChange={(e) => setSubtype(e.target.value)} style={simpleInputStyle}>
                                    {role === 'student' ? (
                                        <>
                                            <option value="student">Student</option>
                                            <option value="professional">Working Professional</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="trainer">Individual Trainer</option>
                                            <option value="academy">Academy</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Personal Details */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" style={inputStyle} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Date of Birth</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} style={simpleInputStyle}>
                                    <option value="prefer-not-say">Prefer not to say</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Full Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '10px', top: '15px', color: 'var(--color-text-light)' }} />
                                <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, Country" style={{ ...inputStyle, resize: 'none', paddingLeft: '2.5rem' }}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Professional/Learning Profile */}
                    {role === 'student' ? (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Learning Profile</h3>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Current Education Level / Job Title</label>
                                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. Undergraduate, Software Engineer" style={simpleInputStyle} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Learning Goals</label>
                                <textarea rows="3" value={learningGoals} onChange={(e) => setLearningGoals(e.target.value)} placeholder="What do you hope to achieve?" style={{ ...simpleInputStyle, resize: 'vertical' }}></textarea>
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Professional Profile</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Area of Expertise</label>
                                    <input type="text" required value={expertise} onChange={(e) => setExpertise(e.target.value)} placeholder="e.g. Web Development" style={simpleInputStyle} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Years of Experience</label>
                                    <div style={{ position: 'relative' }}>
                                        <Clock size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="number" min="0" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 5" style={inputStyle} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Bio / Introduction</label>
                                <textarea required rows="3" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell students about yourself..." style={{ ...simpleInputStyle, resize: 'vertical' }}></textarea>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>LinkedIn Profile</label>
                                    <div style={{ position: 'relative' }}>
                                        <Linkedin size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." style={inputStyle} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Website / Portfolio</label>
                                    <div style={{ position: 'relative' }}>
                                        <Globe size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." style={inputStyle} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Languages Spoken</label>
                                <div style={{ position: 'relative' }}>
                                    <Globe2 size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="e.g. English, Spanish" style={inputStyle} />
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem', fontSize: '1.1rem' }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Login Here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
