import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { Play, Pause, SkipBack, SkipForward, CheckCircle, ArrowLeft, Menu } from 'lucide-react';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const course = courses.find(c => c.id === parseInt(courseId));
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeModule, setActiveModule] = useState(1);

    if (!course) return <div className="container" style={{ padding: '4rem' }}>Course not found</div>;

    const modules = [
        { id: 1, title: 'Introduction & Setup', duration: '12:45' },
        { id: 2, title: 'Core Concepts Explained', duration: '45:10' },
        { id: 3, title: 'Advanced Techniques', duration: '32:20' },
        { id: 4, title: 'Final Project Guidelines', duration: '15:00' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ background: '#1e293b', color: 'white', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/dashboard" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}>
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>
                    <div style={{ width: '1px', height: '24px', background: '#475569' }}></div>
                    <h1 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{course.title}</h1>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>0% Complete</div>
            </div>

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Main Player Area */}
                <div style={{ flex: 1, background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            backdropFilter: 'blur(4px)'
                        }} onClick={() => setIsPlaying(!isPlaying)}>
                            {isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" style={{ marginLeft: '4px' }} />}
                        </div>
                        <p style={{ marginTop: '1.5rem', fontSize: '1.2rem' }}>
                            {isPlaying ? 'Playing: ' + modules.find(m => m.id === activeModule)?.title : 'Click to Play'}
                        </p>
                    </div>
                </div>

                {/* Sidebar Playlist */}
                <div style={{ width: '350px', background: 'white', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Course Content</h3>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{modules.length} lessons • {course.duration} total</p>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {modules.map(module => (
                            <div
                                key={module.id}
                                onClick={() => setActiveModule(module.id)}
                                style={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid #f1f5f9',
                                    cursor: 'pointer',
                                    background: activeModule === module.id ? '#eff6ff' : 'white',
                                    borderLeft: activeModule === module.id ? '4px solid var(--color-primary)' : '4px solid transparent'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '0.95rem', fontWeight: activeModule === module.id ? '600' : '400', color: activeModule === module.id ? 'var(--color-primary)' : '#334155' }}>
                                        {module.id}. {module.title}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                    <Play size={12} /> {module.duration}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
