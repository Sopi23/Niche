import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import { Award, Download, Share2 } from 'lucide-react';

const Certificate = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const course = courses.find(c => c.id === parseInt(id));

    if (!user || !course) return <div className="container">Certificate not found</div>;

    const date = new Date().toLocaleDateString();

    return (
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '2rem' }}>Course Completion Certificate</h1>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '3rem',
                border: '10px solid var(--color-primary)',
                position: 'relative',
                background: 'white',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <Award size={64} style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }} />

                <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', marginBottom: '1rem', color: 'var(--color-text-main)' }}>Certificate of Completion</h2>

                <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>This is to certify that</p>

                <h3 style={{ fontSize: '2rem', borderBottom: '2px solid var(--color-border)', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>
                    {user.name}
                </h3>

                <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>has successfully completed the course</p>

                <h4 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem' }}>{course.title}</h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem', padding: '0 2rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ borderTop: '1px solid black', paddingTop: '0.5rem', width: '200px' }}>{course.instructor}</p>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Instructor</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ borderTop: '1px solid black', paddingTop: '0.5rem', width: '200px' }}>{date}</p>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Date</span>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    Certificate ID: NICHE-{course.id}-{Date.now().toString().slice(-6)}
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary">
                    <Download size={18} style={{ marginRight: '0.5rem' }} /> Download PDF
                </button>
                <button className="btn btn-outline">
                    <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share
                </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <Link to="/dashboard" style={{ color: 'var(--color-primary)' }}>Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default Certificate;
