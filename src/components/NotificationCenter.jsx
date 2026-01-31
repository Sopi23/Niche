import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, X, Check } from 'lucide-react';

const NotificationCenter = () => {
    const { notifications, markAsRead } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    color: 'var(--color-text-main)'
                }}
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '300px',
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    marginTop: '0.5rem'
                }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)', fontWeight: '600' }}>
                        Notifications
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.length === 0 ? (
                            <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                                No notifications
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div key={notification.id} style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--color-border)',
                                    background: notification.read ? 'transparent' : 'rgba(79, 70, 229, 0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        <div style={{
                                            color: notification.type === 'error' ? '#ef4444' :
                                                notification.type === 'success' ? '#22c55e' : 'var(--color-text-main)'
                                        }}>
                                            {notification.message}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                            {new Date(notification.createdAt).toLocaleTimeString()}
                                        </div>
                                    </div>
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}
                                            title="Mark as read"
                                        >
                                            <Check size={16} />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
