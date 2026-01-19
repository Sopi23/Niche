import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { Share2, Clock, Star, PlayCircle, ShieldCheck } from 'lucide-react';

const CourseDetails = () => {
    const { id } = useParams();
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) {
        return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Course not found</div>;
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div style={{ background: '#1e1b4b', color: 'white', padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', color: '#818cf8', fontWeight: '600' }}>
                            {course.category}
                        </span>
                        <h1 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '1rem', lineHeight: 1.2 }}>{course.title}</h1>
                        <p style={{ fontSize: '1.25rem', color: '#c7d2fe', marginBottom: '2rem' }}>
                            {course.description} A detailed breakdown of this specialized niche skill.
                        </p>

                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star fill="#fcd34d" size={18} color="#fcd34d" />
                                <span style={{ fontWeight: '700' }}>{course.rating}</span>
                                <span style={{ color: '#c7d2fe' }}>({course.reviews} reviews)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c7d2fe' }}>
                                <Clock size={18} /> {course.duration}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.875rem' }}>Created by </span>
                            <a href="#" style={{ color: '#818cf8', fontWeight: '600' }}>{course.instructor}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Content */}
                <div>
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--color-primary)' }}>What you'll learn</h2>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {['Master specialized techniques', 'Industry standard tools', 'Certification preparation', 'Real-world projects'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <ShieldCheck size={20} color="var(--color-accent)" />
                                    <span style={{ fontSize: '0.9rem' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--color-primary)' }}>Course Content</h2>
                        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                            {[1, 2, 3, 4].map((module) => (
                                <div key={module} style={{ borderBottom: '1px solid var(--color-border)', background: 'white' }}>
                                    <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9fafb' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Module {module}: Fundamentals</h4>
                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>3 Lectures • 45m</span>
                                    </div>
                                    <div style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                            <PlayCircle size={16} /> Introduction to concepts
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                            <PlayCircle size={16} /> Advanced methodology
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div>
                    <div className="card" style={{ position: 'sticky', top: '100px', padding: '2rem' }}>
                        <img src={course.image} alt={course.title} style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }} />
                        <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>${course.price}</div>
                        <div style={{ color: '#dc2626', fontSize: '0.875rem', marginBottom: '1.5rem' }}>30-Day Money-Back Guarantee</div>

                        <Link to="/enroll" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem', textAlign: 'center' }}>
                            Enroll Now
                        </Link>
                        <button className="btn btn-outline" style={{ width: '100%' }}>Add to Wishlist</button>

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>This course includes:</h4>
                            <ul style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                <li>• {course.duration} on-demand video</li>
                                <li>• 5 downloadable resources</li>
                                <li>• Full lifetime access</li>
                                <li>• Certificate of completion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
