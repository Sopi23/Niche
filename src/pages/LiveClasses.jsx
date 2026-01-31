import React from 'react';
import { mockLiveClasses } from '../data/mockData';
import { Video, Calendar, Clock, User } from 'lucide-react';

const LiveClasses = () => {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <div>
                    <span style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>Interactive Sessions</span>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Live Classes</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '600px' }}>Join real-time interactive sessions with expert instructors.</p>
                </div>
                <div style={{ background: 'var(--gradient-primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.95rem', fontWeight: '600', boxShadow: 'var(--shadow-md)' }}>
                    {mockLiveClasses.length} Upcoming Sessions
                </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {mockLiveClasses.map(session => (
                    <div key={session.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem', transition: 'transform 0.2s', border: '1px solid rgba(255,255,255,0.6)' }}>
                        <div style={{
                            width: '90px',
                            height: '90px',
                            background: 'var(--color-bg-body)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: '1px solid var(--color-border)'
                        }}>
                            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-primary)' }}>{new Date(session.date).getDate()}</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>
                                {new Date(session.date).toLocaleString('default', { month: 'short' })}
                            </span>
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                                    {session.status}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                                    <Clock size={16} color="var(--color-primary)" /> {session.time} ({session.duration})
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>{session.title}</h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <User size={14} />
                                    </div>
                                    <span style={{ fontWeight: '500' }}>{session.instructorName}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{session.attendees}</span> Attending
                                </div>
                            </div>
                        </div>

                        <div>
                            <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 2rem', fontSize: '1rem' }}>
                                <Video size={20} /> Join Session
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveClasses;
