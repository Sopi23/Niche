import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';

import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';

import Enroll from './pages/Enroll';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard';
import CoursePlayer from './pages/CoursePlayer';
import Certificate from './pages/Certificate';
import Bundles from './pages/Bundles';
import BundleDetails from './pages/BundleDetails';
import LiveClasses from './pages/LiveClasses';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorLogin from './pages/instructor/InstructorLogin';
import CreateCourse from './pages/instructor/CreateCourse';
import StudentManagement from './pages/instructor/StudentManagement';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/enroll/:id" element={<Enroll />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/certificate/:id" element={<Certificate />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/bundle/:id" element={<BundleDetails />} />
              <Route path="/live-classes" element={<LiveClasses />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/learn/:courseId" element={<CoursePlayer />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />

              {/* Instructor Routes */}
              <Route path="/instructor/login" element={<InstructorLogin />} />
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/course/new" element={<CreateCourse />} />
              <Route path="/instructor/students" element={<StudentManagement />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
