import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const categories = [
    'All', 'Technology', 'Business', 'Design', 'Marketing', 'Photography', 'Music', 'Health & Fitness', 'Lifestyle'
];

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const q = query(collection(db, "courses"), where("status", "==", "approved"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const courseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(courseData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Explore Niche Courses</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Discover unique skills taught by experts.</p>
            </div>

            {/* Search and Filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                        type="text"
                        placeholder="Search for courses, skills, or instructors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--color-border)',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)',
                            fontSize: '1rem',
                            background: 'var(--color-bg-surface)',
                            backdropFilter: 'blur(8px)'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: 'var(--radius-full)',
                                border: selectedCategory === cat ? 'none' : '1px solid var(--color-border)',
                                background: selectedCategory === cat ? 'var(--gradient-primary)' : 'var(--color-bg-surface)',
                                color: selectedCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                boxShadow: selectedCategory === cat ? 'var(--shadow-md)' : 'none'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {filteredCourses.map(course => (
                    <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.5)' }}>
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                            <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-primary-dark)', background: 'rgba(255, 255, 255, 0.95)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}>
                                    {course.category}
                                </span>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)' }}>
                                    <Star size={16} fill="currentColor" />
                                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text-main)' }}>{course.rating}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>({course.reviews})</span>
                                </div>
                                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-primary)' }}>${course.price}</span>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.3, fontWeight: '700' }}>{course.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>By {course.instructor}</p>

                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                    <Clock size={16} /> <span>{course.duration} total duration</span>
                                </div>
                                <Link
                                    to={`/course/${course.id}`}
                                    className="btn btn-primary"
                                    style={{ width: '100%', textAlign: 'center', padding: '0.8rem' }}
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Loading courses...</div>
            ) : filteredCourses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                    <p>No courses found matching your criteria.</p>
                </div>
            ) : null}
        </div>
    );
};

export default Courses;
