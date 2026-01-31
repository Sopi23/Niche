import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { CheckCircle, XCircle, Users, BookOpen, DollarSign, PlusCircle, Trash2, Edit2, Search, Filter } from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { courses } from '../../data/courses';

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [seeding, setSeeding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);

    const {
        pendingInstructors,
        pendingStudents,
        pendingCourses,
        allCourses,
        allUsers,
        approveInstructor,
        rejectInstructor,
        approveStudent,
        rejectStudent,
        approveCourse,
        rejectCourse,
        deleteCourse,
        updateCourse,
        deleteUser,
        updateUser
    } = useAdmin();

    // Derived State
    const students = allUsers.filter(u => u.role === 'student');
    const instructors = allUsers.filter(u => u.role === 'instructor');

    // Filtered Lists
    const filteredStudents = students.filter(s => s.name?.toLowerCase().includes(searchTerm.toLowerCase()) || s.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredInstructors = instructors.filter(i => i.name?.toLowerCase().includes(searchTerm.toLowerCase()) || i.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredCourses = allCourses.filter(c => c.title?.toLowerCase().includes(searchTerm.toLowerCase()));

    // Temporary Seed Function (kept for utility)
    const seedDatabase = async () => {
        if (!window.confirm("This will overwrite/add data to Firestore. Continue?")) return;
        setSeeding(true);
        try {
            const batch = writeBatch(db);
            courses.forEach(course => {
                const docRef = doc(db, "courses", String(course.id));
                batch.set(docRef, { ...course, status: 'approved' });
            });
            await batch.commit();
            alert("Database seeded successfully!");
        } catch (error) {
            console.error("Error seeding DB:", error);
            alert("Error seeding database check console.");
        } finally {
            setSeeding(false);
        }
    };

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                navigate('/admin/login');
            }
        }
    }, [user, loading, navigate]);

    if (loading || !user || user.role !== 'admin') {
        return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin Panel...</div>;
    }

    const stats = [
        { label: 'Total Students', value: students.length, icon: Users, color: '#7c3aed' },
        { label: 'Total Instructors', value: instructors.length, icon: Users, color: '#db2777' },
        { label: 'Total Courses', value: allCourses.length, icon: BookOpen, color: '#f59e0b' },
        { label: 'Platform Revenue', value: '$85,400', icon: DollarSign, color: '#10b981' }, // Mock
    ];

    return (
        <div className="container" style={{ padding: '3rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={seedDatabase} disabled={seeding} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
                        {seeding ? 'Seeding...' : 'Seed Data'}
                    </button>
                    <button onClick={() => navigate('/instructor/course/new')} className="btn btn-primary" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PlusCircle size={16} /> Add New Course
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                {['overview', 'students', 'instructors', 'courses'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setSearchTerm(''); }}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            fontWeight: activeTab === tab ? '600' : '500',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search Bar for Lists */}
            {activeTab !== 'overview' && (
                <div style={{ marginBottom: '1.5rem', position: 'relative', maxWidth: '400px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-light)' }} />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                    />
                </div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        {stats.map((stat, i) => (
                            <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${stat.color}` }}>
                                <div style={{ background: `${stat.color}20`, padding: '1rem', borderRadius: 'var(--radius-full)', color: stat.color }}>
                                    <stat.icon size={28} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Pending actions via respective tabs or use quick links below if specific approvals needed</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <div className="card">
                            <h3>Pending Instructors ({pendingInstructors.length})</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Go to Instructors tab to manage.</p>
                            {pendingInstructors.length > 0 && <button onClick={() => setActiveTab('instructors')} className="btn btn-outline" style={{ width: '100%' }}>View</button>}
                        </div>
                        <div className="card">
                            <h3>Pending Students ({pendingStudents.length})</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Go to Students tab to manage.</p>
                            {pendingStudents.length > 0 && <button onClick={() => setActiveTab('students')} className="btn btn-outline" style={{ width: '100%' }}>View</button>}
                        </div>
                        <div className="card">
                            <h3>Pending Courses ({pendingCourses.length})</h3>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>Go to Courses tab to manage.</p>
                            {pendingCourses.length > 0 && <button onClick={() => setActiveTab('courses')} className="btn btn-outline" style={{ width: '100%' }}>View</button>}
                        </div>
                    </div>
                </>
            )}

            {/* STUDENTS TAB */}
            {activeTab === 'students' && (
                <div>
                    {/* Pending Section */}
                    {pendingStudents.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>Pending Approvals</h3>
                            <div className="card">
                                {pendingStudents.map(student => (
                                    <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{student.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{student.email}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => approveStudent(student.id)} className="btn btn-primary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: '#10b981' }}>Approve</button>
                                            <button onClick={() => rejectStudent(student.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: '#dc2626' }}>Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Name</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Email</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Role</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Status</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>
                                            {student.name}
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{student.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>Student</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600',
                                                background: student.status === 'approved' ? '#dcfce7' : student.status === 'pending' ? '#fef3c7' : '#fee2e2',
                                                color: student.status === 'approved' ? '#16a34a' : student.status === 'pending' ? '#d97706' : '#dc2626'
                                            }}>
                                                {student.status || 'active'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => {
                                                const newName = prompt("Enter new name for student:", student.name);
                                                if (newName && newName !== student.name) updateUser(student.id, { name: newName });
                                            }} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--color-text-main)' }} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteUser(student.id)} className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', padding: '0.4rem' }} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredStudents.length === 0 && <p style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No students found.</p>}
                    </div>
                </div>
            )}

            {/* INSTRUCTORS TAB */}
            {activeTab === 'instructors' && (
                <div>
                    {/* Pending Section */}
                    {pendingInstructors.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>Pending Approvals</h3>
                            <div className="card">
                                {pendingInstructors.map(inst => (
                                    <div key={inst.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{inst.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{inst.email} - {inst.expertise}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => approveInstructor(inst.id)} className="btn btn-primary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: '#10b981' }}>Approve</button>
                                            <button onClick={() => rejectInstructor(inst.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: '#dc2626' }}>Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Name</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Email</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Expertise</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Status</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInstructors.map(inst => (
                                    <tr key={inst.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{inst.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{inst.email}</td>
                                        <td style={{ padding: '1rem' }}>{inst.expertise}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600',
                                                background: inst.status === 'approved' ? '#dcfce7' : inst.status === 'pending' ? '#fef3c7' : '#fee2e2',
                                                color: inst.status === 'approved' ? '#16a34a' : inst.status === 'pending' ? '#d97706' : '#dc2626'
                                            }}>
                                                {inst.status || 'active'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => {
                                                const newName = prompt("Enter new name for instructor:", inst.name);
                                                if (newName && newName !== inst.name) updateUser(inst.id, { name: newName });
                                            }} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--color-text-main)' }} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteUser(inst.id)} className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', padding: '0.4rem' }} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredInstructors.length === 0 && <p style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No instructors found.</p>}
                    </div>
                </div>
            )}

            {/* COURSES TAB */}
            {activeTab === 'courses' && (
                <div>
                    {/* Pending Section */}
                    {pendingCourses.length > 0 && (
                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>Pending Approvals</h3>
                            <div className="card">
                                {pendingCourses.map(course => (
                                    <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{course.title}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>By {course.instructor} - ${course.price}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => approveCourse(course.id)} className="btn btn-primary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: '#10b981' }}>Approve</button>
                                            <button onClick={() => rejectCourse(course.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: '#dc2626' }}>Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Title</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Instructor</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Price</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Category</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCourses.map(course => (
                                    <tr key={course.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{course.title}</td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>{course.instructor}</td>
                                        <td style={{ padding: '1rem' }}>${course.price}</td>
                                        <td style={{ padding: '1rem' }}>{course.category}</td>
                                        <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => setEditingCourse(course)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--color-text-main)' }} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => deleteCourse(course.id)} className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', padding: '0.4rem' }} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCourses.length === 0 && <p style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No courses found.</p>}
                    </div>
                </div>
            )}
            {
                editingCourse && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}>
                        <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.25rem' }}>Edit Course</h2>
                                <button onClick={() => setEditingCourse(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    <XCircle size={24} color="var(--color-text-secondary)" />
                                </button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                updateCourse(editingCourse.id, {
                                    title: formData.get('title'),
                                    price: Number(formData.get('price')),
                                    category: formData.get('category'),
                                    instructor: formData.get('instructor') // Admin override instructor name too if needed
                                });
                                setEditingCourse(null);
                            }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
                                    <input
                                        name="title"
                                        defaultValue={editingCourse.title}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price ($)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        defaultValue={editingCourse.price}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                                    <input
                                        name="category"
                                        defaultValue={editingCourse.category}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Instructor Name (Override)</label>
                                    <input
                                        name="instructor"
                                        defaultValue={editingCourse.instructor}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button type="button" onClick={() => setEditingCourse(null)} className="btn btn-outline">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminDashboard;
