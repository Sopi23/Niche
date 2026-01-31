import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Save, FileText, Camera, Phone, Calendar, MapPin, GraduationCap, Briefcase, Linkedin, Globe, Clock, Globe2 } from 'lucide-react';

const Profile = () => {
    const { user, updateProfileData, uploadProfileImage } = useAuth();
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    // Common Fields
    const [name, setName] = useState('');
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

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setDob(user.dob || '');
            setGender(user.gender || 'prefer-not-say');
            setAddress(user.address || '');

            if (user.role === 'student') {
                setEducation(user.education || '');
                setLearningGoals(user.learningGoals || '');
            } else if (user.role === 'instructor') {
                setBio(user.bio || '');
                setExpertise(user.expertise || '');
                setLinkedin(user.linkedin || '');
                setWebsite(user.website || '');
                setExperience(user.experience || '');
                setLanguages(user.languages || '');
            }
        }
    }, [user]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageLoading(true);
        try {
            await uploadProfileImage(file);
        } catch (error) {
            console.error("Image upload failed", error);
        } finally {
            setImageLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const commonData = { name, phone, dob, gender, address };
            let roleSpecificData = {};

            if (user.role === 'student') {
                roleSpecificData = { education, learningGoals };
            } else if (user.role === 'instructor') {
                roleSpecificData = { bio, expertise, linkedin, website, experience, languages };
            }

            await updateProfileData({ ...commonData, ...roleSpecificData });
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
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

    if (!user) return <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>Please log in to view your profile.</div>;

    return (
        <div className="container" style={{ padding: '3rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-main)' }}>My Profile</h1>

            <div className="card" style={{ padding: '2.5rem' }}>
                {/* Profile Header & Image */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                        <div style={{
                            width: '100%', height: '100%',
                            background: user.photoURL ? 'transparent' : 'var(--gradient-primary)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: '3rem', fontWeight: '700',
                            overflow: 'hidden', border: '4px solid white',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                name.charAt(0)?.toUpperCase()
                            )}
                        </div>
                        <label
                            style={{
                                position: 'absolute', bottom: '0', right: '0',
                                background: 'var(--color-primary)', color: 'white',
                                width: '36px', height: '36px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.2s'
                            }}
                            title="Upload Profile Picture"
                        >
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={imageLoading} />
                            <Camera size={18} />
                        </label>
                        {imageLoading && <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>}
                    </div>

                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>{user.name}</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{user.email}</p>
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>
                        {user.role}
                    </span>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Common Details */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontWeight: '600' }}>Personal Information</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Date of Birth</label>
                                <div style={{ position: 'relative' }}>
                                    <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Gender</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)} style={simpleInputStyle}>
                                    <option value="prefer-not-say">Prefer not to say</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Full Address</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--color-text-light)' }} />
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows="2"
                                    style={{ ...inputStyle, resize: 'none', paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Role Specific Details */}
                    {user.role === 'student' && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontWeight: '600' }}>Learning Profile</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Current Education / Job Title</label>
                                    <div style={{ position: 'relative' }}>
                                        <GraduationCap size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Learning Goals</label>
                                    <div style={{ position: 'relative' }}>
                                        <FileText size={18} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--color-text-light)' }} />
                                        <textarea value={learningGoals} onChange={(e) => setLearningGoals(e.target.value)} rows="3" style={{ ...inputStyle, resize: 'vertical', paddingLeft: '2.5rem' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {user.role === 'instructor' && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-main)', fontWeight: '600' }}>Professional Profile</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Area of Expertise</label>
                                    <div style={{ position: 'relative' }}>
                                        <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="text" value={expertise} onChange={(e) => setExpertise(e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Years of Experience</label>
                                    <div style={{ position: 'relative' }}>
                                        <Clock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Bio / Introduction</label>
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="3" style={{ ...simpleInputStyle, resize: 'vertical' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>LinkedIn Profile</label>
                                    <div style={{ position: 'relative' }}>
                                        <Linkedin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Website</label>
                                    <div style={{ position: 'relative' }}>
                                        <Globe size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                        <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} style={inputStyle} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>Languages Spoken</label>
                                <div style={{ position: 'relative' }}>
                                    <Globe2 size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                    <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} style={inputStyle} />
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', fontSize: '1rem' }}
                    >
                        <Save size={18} /> {loading ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
