import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockBundles } from '../data/mockData';
import { Package, Star, CheckCircle, ArrowLeft } from 'lucide-react';

const BundleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find bundle by ID (convert id to number as params are strings)
    const bundle = mockBundles.find(b => b.id === parseInt(id));

    if (!bundle) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Bundle not found</h2>
                <button onClick={() => navigate('/bundles')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Back to Bundles
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <button
                onClick={() => navigate('/bundles')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeft size={20} /> Back to Bundles
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '3rem' }}>
                {/* Main Content */}
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 }}>{bundle.title}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                        Combined curriculum by {bundle.instructor}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', color: '#fbbf24' }}>
                                <Star size={20} fill="#fbbf24" />
                            </div>
                            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>{bundle.rating}</span>
                            <span style={{ color: 'var(--color-text-secondary)' }}>({bundle.reviews} reviews)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Package size={20} />
                            <span>{bundle.courses.length} Courses Included</span>
                        </div>
                    </div>

                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>What's included</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {bundle.features.map((feature, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <CheckCircle size={20} color="var(--color-success)" />
                                    <span style={{ fontSize: '1.1rem' }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placeholder for Course List within Bundle */}
                    <div style={{ padding: '2rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Course List in this Bundle</h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>This bundle contains {bundle.courses.length} premium courses designed to take you from beginner to advanced.</p>
                        {/* We could map over bundle.courses if we had the full course objects, but mockBundles only has IDs */}
                    </div>
                </div>

                {/* Sidebar */}
                <div>
                    <div style={{
                        position: 'sticky',
                        top: '100px',
                        padding: '2rem',
                        background: 'var(--color-bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}>
                        <img
                            src={bundle.thumbnail}
                            alt={bundle.title}
                            style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', aspectRatio: '16/9', objectFit: 'cover' }}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)' }}>${bundle.price}</span>
                            <span style={{ fontSize: '1.25rem', textDecoration: 'line-through', color: 'var(--color-text-light)' }}>${bundle.originalPrice}</span>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', marginBottom: '1rem' }}>
                            Buy Bundle Now
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BundleDetails;
