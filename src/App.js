import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navigation/Navbar';
import Login from './pages/auth/Login';
import CompanyRegistration from './pages/auth/CompanyRegistration';
import CompanyDashboard from './pages/company/Dashboard';
import InternshipPosts from './pages/company/InternshipPosts';
import StudentDashboard from './pages/student/Dashboard';
import StudentInternship from './pages/student/Internship';
import StudentProfile from './pages/student/Profile';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register-company" element={<CompanyRegistration />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/internship-posts" element={<InternshipPosts />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/internships" element={<StudentInternship />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;