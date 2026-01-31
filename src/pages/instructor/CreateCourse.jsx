import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Upload, DollarSign, Book, Layers, User, Clock, CheckCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const CreateCourse = () => {
    const navigate = useNavigate();
    const { user, addNotification } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Technology',
        price: '',
        description: '',
        image: '',
        type: 'course', // 'course' or 'bundle'
        instructorName: '',
        duration: '',
        featuresText: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, instructorName: user.name || '' }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            addNotification('You must be logged in to create a course', 'error');
            return;
        }

        setLoading(true);
        try {
            // Process features from text area (split by new line)
            const featuresList = formData.featuresText
                ? formData.featuresText.split('\n').filter(line => line.trim() !== '')
                : ["Certificate of Completion", "Lifetime Access"]; // Default fallback

            const newCourse = {
                ...formData,
                instructor: formData.instructorName || user.name || 'Anonymous Instructor',
                instructorId: user.uid,
                rating: 0,
                reviews: 0,
                status: 'approved', // Auto-approve for demo purposes
                createdAt: new Date().toISOString(),
                features: featuresList,
                courses: formData.type === 'bundle' ? [] : null // Use null instead of undefined for Firestore
            };

            // Remove temporary fields
            delete newCourse.instructorName;
            delete newCourse.featuresText;

            await addDoc(collection(db, "courses"), newCourse);

            addNotification(`${formData.type === 'bundle' ? 'Bundle' : 'Course'} created successfully!`, 'success');

            if (formData.type === 'bundle') {
                navigate('/bundles');
            } else {
                navigate('/courses');
            }
        } catch (error) {
            console.error("Error creating course:", error);
            addNotification(`Failed to create course: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '3rem 0', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Create New Content</h1>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
                        <div style={{ position: 'relative' }}>
                            <Book size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Advanced AI Analytics"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Instructor Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="text"
                                name="instructorName"
                                required
                                value={formData.instructorName}
                                onChange={handleChange}
                                placeholder="e.g. John Doe"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Content Type</label>
                            <div style={{ position: 'relative' }}>
                                <Layers size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'white' }}
                                >
                                    <option value="course">Individual Course</option>
                                    <option value="bundle">Course Bundle</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'white' }}
                            >
                                <option>Technology</option>
                                <option>Business</option>
                                <option>Design</option>
                                <option>Healthcare</option>
                                <option>Lifestyle</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price ($)</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="number"
                                name="price"
                                required
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="49.99"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Duration</label>
                        <div style={{ position: 'relative' }}>
                            <Clock size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="text"
                                name="duration"
                                required
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g. 5 hours 30 mins"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                        <textarea
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Detailed description of what students will learn..."
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                        ></textarea>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>What you'll learn (Features)</label>
                        <div style={{ position: 'relative' }}>
                            <CheckCircle size={18} style={{ position: 'absolute', left: '10px', top: '15px', color: 'var(--color-text-light)' }} />
                            <textarea
                                name="featuresText"
                                required
                                value={formData.featuresText}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Enter each key learning point on a new line...&#10;- Master React&#10;- Build Projects&#10;- Get Certified"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                            ></textarea>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                            Separate each point with a new line.
                        </p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Course Image URL (Public URL)</label>
                        <div style={{ position: 'relative' }}>
                            <Upload size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}
                            />
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                            * Ideally use Unsplash or similar hosting for now.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => navigate('/instructor/dashboard')} className="btn btn-outline">Cancel</button>
                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Publishing...' : 'Publish Content'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
