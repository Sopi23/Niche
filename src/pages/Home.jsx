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
                    opacity: 0.15,
                    filter: 'blur(100px)',
                    zIndex: -1
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(124, 58, 237, 0.1)',
                        color: 'var(--color-primary)',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        marginBottom: '2rem',
                        border: '1px solid rgba(124, 58, 237, 0.2)'
                    }}>
                        🚀 Launch your career today
                    </span>
                    <h1 style={{
                        fontSize: 'var(--font-size-4xl)',
                        fontWeight: '800',
                        lineHeight: 1.1,
                        marginBottom: 'var(--spacing-lg)',
                        letterSpacing: '-0.02em',
                        background: 'var(--gradient-text)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Niche Online Learning & <br /> Course Marketplace
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-xl)',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: 1.7
                    }}>
                        Explore specialized courses in technology, arts, and business.
                        Join a community of learners and professionals.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <Link to="/courses" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Start Learning
                        </Link>
                        <Link to="/register" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <section className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Why Choose Niche?</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>We focus on quality and specialization</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {[
                        { title: 'Expert Instructors', desc: 'Learn from industry leaders in specialized fields.', icon: '👨‍🏫' },
                        { title: 'Flexible Learning', desc: 'Study at your own pace with lifetime access.', icon: '⏱️' },
                        { title: 'Certified Skills', desc: 'Earn certificates that boost your career profile.', icon: '📜' }
                    ].map((item, i) => (
                        <div key={i} className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'var(--color-bg-body)', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', margin: '0 auto 1.5rem auto', boxShadow: 'var(--shadow-md)' }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
