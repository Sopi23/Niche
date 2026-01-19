import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <header style={{
                padding: 'var(--spacing-3xl) 0',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '50%',
                    transform: 'translate(-50%)',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    opacity: 0.1,
                    filter: 'blur(80px)',
                    zIndex: -1
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--color-primary)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '1.5rem'
                    }}>
                        🚀 Launch your career today
                    </span>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        marginBottom: 'var(--spacing-md)',
                        letterSpacing: '-1px'
                    }}>
                        <span className="text-gradient">Niche Online Learning & <br /> Course Marketplace</span>
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-xl)',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Explore specialized courses in technology, arts, and business.
                        Join a community of learners and professionals.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <Link to="/courses" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                            Start Learning
                        </Link>
                        <Link to="/register" className="btn btn-outline" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <section className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Why Choose Niche?</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>We focus on quality and specialization</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: 'Expert Instructors', desc: 'Learn from industry leaders in specialized fields.', icon: '👨‍🏫' },
                        { title: 'Flexible Learning', desc: 'Study at your own pace with lifetime access.', icon: '⏱️' },
                        { title: 'Certified Skills', desc: 'Earn certificates that boost your career profile.', icon: '📜' }
                    ].map((item, i) => (
                        <div key={i} className="card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--color-bg-body)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1.5rem auto' }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
