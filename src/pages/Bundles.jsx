import React from 'react';
import { Link } from 'react-router-dom';
import { mockBundles } from '../data/mockData';
import { Package, Star, Clock, CheckCircle } from 'lucide-react';

const Bundles = () => {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Course Bundles</h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>Save with our curated course packages</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {mockBundles.map(bundle => (
                    <div key={bundle.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', height: '200px' }}>
                            <img
                                src={bundle.thumbnail}
                                alt={bundle.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(0,0,0,0.7)',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.875rem',
                                fontWeight: '500'
                            }}>
                                {bundle.courses.length} Courses
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-text-light)', fontSize: '0.875rem' }}>
                                <Package size={16} /> Bundle
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{bundle.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>by {bundle.instructor}</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontWeight: '500' }}>
                                    <Star size={16} fill="#fbbf24" /> {bundle.rating}
                                </div>
                                <span style={{ color: 'var(--color-text-light)', fontSize: '0.875rem' }}>({bundle.reviews} reviews)</span>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                {bundle.features.slice(0, 2).map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                                        <CheckCircle size={14} color="var(--color-success)" /> {feature}
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>${bundle.price}</span>
                                    <span style={{ textDecoration: 'line-through', color: 'var(--color-text-light)', marginLeft: '0.5rem', fontSize: '0.875rem' }}>${bundle.originalPrice}</span>
                                </div>
                                <Link to={`/bundle/${bundle.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bundles;
