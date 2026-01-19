import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock } from 'lucide-react';
import { courses, categories } from '../data/courses';

const Courses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                        type="text"
                        placeholder="Search for courses, skills, or instructors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--color-border)',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: 'var(--radius-full)',
                                border: selectedCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                                background: selectedCategory === cat ? 'var(--color-primary)' : 'white',
                                color: selectedCategory === cat ? 'white' : 'var(--color-text-secondary)',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {filteredCourses.map(course => (
                    <div key={course.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '180px', overflow: 'hidden' }}>
                            <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                        </div>
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-primary)', background: '#e0e7ff', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                    {course.category}
                                </span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                    <Star size={14} fill="#fbbf24" />
                                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{course.rating}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>({course.reviews})</span>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{course.title}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>by {course.instructor}</p>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                                    <Clock size={14} /> {course.duration}
                                </div>
                                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-main)' }}>${course.price}</span>
                            </div>

                            <Link
                                to={`/course/${course.id}`}
                                className="btn btn-primary"
                                style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                    <p>No courses found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Courses;
