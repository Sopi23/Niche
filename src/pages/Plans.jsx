import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPlans } from '../data/mockData';
import { Check } from 'lucide-react';

const Plans = () => {
    const navigate = useNavigate();
    return (
        <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(124, 58, 237, 0.1)',
                    color: 'var(--color-primary)',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(124, 58, 237, 0.2)'
                }}>
                    Pricing Plans
                </span>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                    Choose the Perfect <span className="text-gradient">Plan for You</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>Unlock the full potential of Niche Learning</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                {mockPlans.map(plan => (
                    <div
                        key={plan.id}
                        className="card"
                        style={{
                            padding: '2.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            border: plan.recommended ? '2px solid transparent' : '1px solid var(--color-border)',
                            backgroundImage: plan.recommended
                                ? 'linear-gradient(var(--color-bg-surface), var(--color-bg-surface)), var(--gradient-primary)'
                                : 'none',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box',
                            transform: plan.recommended ? 'scale(1.05)' : 'none',
                            zIndex: plan.recommended ? 1 : 0,
                            boxShadow: plan.recommended ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
                        }}
                    >
                        {plan.recommended && (
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                padding: '0.5rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                Most Popular
                            </div>
                        )}

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>{plan.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0.25rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--color-text-main)' }}>${plan.price}</span>
                                {plan.billing && <span style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{plan.billing}</span>}
                            </div>
                        </div>

                        <ul style={{ flex: 1, marginBottom: '2rem' }}>
                            {plan.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                                    <div style={{
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <Check size={14} color="var(--color-success)" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => navigate('/register')}
                            className={`btn ${plan.recommended ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: '100%', padding: '1rem' }}
                        >
                            Get Started
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
