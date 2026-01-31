import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Share2, Clock, Star, PlayCircle, ShieldCheck, Heart, FileText } from 'lucide-react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const CourseDetails = () => {
    const { id } = useParams();
    const { user, toggleWishlist } = useAuth();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const docRef = doc(db, "courses", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCourse({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Course not found");
                }
            } catch (err) {
                console.error("Error fetching course:", err);
                setError("Failed to load course details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

    // Check if user is logged in and if course is in wishlist
    // Note: Firestore logic ensures wishlist stores IDs as they are (strings for dynamic courses)
    const isWishlisted = user?.wishlist?.includes(id);

    if (loading) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Loading course details...</div>;
    }

    if (error || !course) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>{error || "Course not found"}</div>;
    }

    // Defaults for fields that might be missing in dynamic courses
    const features = course.features || ['Master specialized techniques', 'Industry standard tools', 'Certification preparation', 'Real-world projects'];
    const duration = course.duration || '10 hours';
    const lectures = course.lectures || 12;

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://www.transparenttextures.com/patterns/cubes.png")', opacity: 0.05 }}></div>
                <div className="container" style={{ position: 'relative' }}>
                    <div style={{ maxWidth: '800px' }}>
                        <span style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', color: '#a5b4fc', fontWeight: '600', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {course.category}
                        </span>
                        <h1 style={{ fontSize: '3rem', marginTop: '1.5rem', marginBottom: '1.25rem', lineHeight: 1.1, fontWeight: '800' }}>{course.title}</h1>
                        <p style={{ fontSize: '1.25rem', color: '#e0e7ff', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                            {course.description}
                        </p>

                        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Star fill="#fbbf24" size={20} color="#fbbf24" />
                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{course.rating || 0}</span>
                                <span style={{ color: '#c7d2fe' }}>({course.reviews || 0} reviews)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#eff6ff', fontSize: '1.05rem' }}>
                                <Clock size={20} /> {duration}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#eff6ff', fontSize: '1.05rem' }}>
                                <ShieldCheck size={20} /> Certificate of Completion
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '1rem', color: '#94a3b8' }}>Created by </span>
                            <a href="#" style={{ color: 'white', fontWeight: '600', textDecoration: 'underline', textDecorationColor: '#818cf8', textUnderlineOffset: '4px' }}>{course.instructor}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-3rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', position: 'relative', zIndex: 10 }}>
                {/* Main Content */}
                <div>
                    <section style={{ marginBottom: '3rem', background: 'var(--color-bg-surface)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-primary)' }}>What you'll learn</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            {features.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <div style={{ marginTop: '3px' }}><ShieldCheck size={18} color="var(--color-success)" /></div>
                                    <span style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text-main)' }}>Course Content</h2>
                        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                            {[1, 2, 3, 4].map((module) => (
                                <div key={module} style={{ borderBottom: '1px solid var(--color-border)', background: 'white' }}>
                                    <div style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', cursor: 'pointer' }}>
                                        <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-text-main)' }}>Module {module}: Fundamentals</h4>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>3 Lectures • 45m</span>
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                            <PlayCircle size={18} color="var(--color-primary)" /> Introduction to concepts
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                            <PlayCircle size={18} color="var(--color-primary)" /> Advanced methodology
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div>
                    <div className="card" style={{ position: 'sticky', top: '100px', padding: '0', overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-xl)' }}>
                        <div style={{ position: 'relative' }}>
                            <img src={course.image} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                    <PlayCircle size={40} fill="white" color="var(--color-primary)" /> Preview this course
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>${course.price}</div>
                            <div style={{ color: 'var(--color-danger)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: '500' }}>30-Day Money-Back Guarantee</div>

                            <Link to={`/enroll/${course.id}`} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', textAlign: 'center', padding: '1rem', fontSize: '1.1rem' }}>
                                Enroll Now
                            </Link>
                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}
                                onClick={() => toggleWishlist(course.id)}
                                disabled={!user}
                                title={!user ? "Login to save to wishlist" : ""}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} color={isWishlisted ? "#ef4444" : "currentColor"} />
                                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>

                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ fontSize: '1rem', marginBottom: '1rem', fontWeight: '600' }}>This course includes:</h4>
                                <ul style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {duration} on-demand video</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16} /> 5 downloadable resources</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={16} /> Full lifetime access</li>
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={16} /> Certificate of completion</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
