import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import { Heart, Clock, Star, PlayCircle, Info } from 'lucide-react';

const Wishlist = () => {
    const { user, toggleWishlist } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const wishlistIds = user.wishlist || [];
    const wishlistCourses = courses.filter(c => wishlistIds.includes(c.id));

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>My Wishlist</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Courses you've saved for later.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)' }}>{wishlistCourses.length}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Saved Courses</div>
                </div>
            </div>

            {wishlistCourses.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Heart size={48} color="var(--color-text-light)" />
                    </div>
                    <h3 style={{ marginBottom: '1rem' }}>Your wishlist is empty.</h3>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Explore courses and start building your learning path.</p>
                    <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {wishlistCourses.map(course => (
                        <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                                <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(course.id);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'rgba(255,255,255,0.9)',
                                        borderRadius: '50%',
                                        padding: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}
                                    title="Remove from Wishlist"
                                >
                                    <Heart size={18} fill="#ef4444" color="#ef4444" />
                                </button>
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-primary)', background: '#e0e7ff', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                        {course.category}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                        <Star size={14} fill="#fbbf24" />
                                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{course.rating}</span>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{course.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>by {course.instructor}</p>

                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-main)' }}>${course.price}</span>
                                    <Link to={`/course/${course.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
                                        View <Info size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
