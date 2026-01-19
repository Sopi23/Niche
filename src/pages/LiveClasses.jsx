import React from 'react';
import { mockLiveClasses } from '../data/mockData';
import { Video, Calendar, Clock, User } from 'lucide-react';

const LiveClasses = () => {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Live Classes</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Join interactive sessions with expert instructors</p>
                </div>
                <div style={{ background: '#eff6ff', color: '#3b82f6', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: '600' }}>
                    {mockLiveClasses.length} Upcoming Sessions
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {mockLiveClasses.map(session => (
                    <div key={session.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#f0f9ff',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0369a1' }}>{new Date(session.date).getDate()}</span>
                            <span style={{ fontSize: '0.875rem', color: '#0ea5e9', textTransform: 'uppercase' }}>
                                {new Date(session.date).toLocaleString('default', { month: 'short' })}
                            </span>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                                    {session.status}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                    <Clock size={14} /> {session.time} ({session.duration})
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{session.title}</h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    <User size={16} /> {session.instructorName}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    <User size={16} /> {session.attendees} Attending
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Video size={18} /> Join Session
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveClasses;
