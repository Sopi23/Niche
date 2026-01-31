import React from 'react';
import { Link } from 'react-router-dom';
import { mockBundles } from '../data/mockData';
import { Package, Star, Clock, CheckCircle } from 'lucide-react';

const Bundles = () => {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(219, 39, 119, 0.1)',
                    color: 'var(--color-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '1rem'
                }}>
                    Curated Packages
                </span>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '1rem' }}>Course Bundles</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Save more with our carefully selected course packages designed for comprehensive learning.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                {mockBundles.map(bundle => (
                    <div key={bundle.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.5)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                        <div style={{ position: 'relative', height: '220px' }}>
                            <img
                                src={bundle.thumbnail}
                                alt={bundle.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'rgba(0,0,0,0.6)',
                                backdropFilter: 'blur(4px)',
                                color: 'white',
                                padding: '0.35rem 0.85rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                <Package size={14} /> {bundle.courses.length} Courses
                            </div>
                        </div>

                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-text-main)', lineHeight: 1.3 }}>{bundle.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>By {bundle.instructor}</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-warning)', fontWeight: '600' }}>
                                    <Star size={18} fill="currentColor" /> {bundle.rating}
                                </div>
                                <span style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>({bundle.reviews} reviews)</span>
                            </div>

                            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-bg-body)', borderRadius: 'var(--radius-md)' }}>
                                {bundle.features.slice(0, 2).map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: idx === 0 ? '0.5rem' : '0' }}>
                                        <CheckCircle size={16} color="var(--color-success)" /> {feature}
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-primary)' }}>${bundle.price}</span>
                                    <span style={{ textDecoration: 'line-through', color: 'var(--color-text-light)', marginLeft: '0.5rem', fontSize: '1rem' }}>${bundle.originalPrice}</span>
                                </div>
                                <Link to={`/bundle/${bundle.id}`} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem', fontWeight: '600' }}>
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
