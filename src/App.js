import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/navigation/Navbar';
import Login from './pages/auth/Login';
import CompanyRegistration from './pages/auth/CompanyRegistration';
import CompanyDashboard from './pages/company/Dashboard';
import CompanyInterns from './pages/company/Interns'
import CompanyApplications from './pages/company/Applications'
import InternshipPosts from './pages/company/InternshipPosts';
import StudentDashboard from './pages/student/Dashboard';
import StudentInternship from './pages/student/Internship';
import StudentProfile from './pages/student/Profile';
import StudentApplications from './pages/student/Applications';
import StudentReports from "./pages/student/Reports";



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/register-company" element={<CompanyRegistration />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/internship-posts" element={<InternshipPosts />} />
          <Route path="/company/applications" element={<CompanyApplications />} />
          <Route path="/company/interns" element={<CompanyInterns />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/internships" element={<StudentInternship />} />
          <Route path="/student/applications" element={<StudentApplications />} />
          <Route path="/student/reports" element={<StudentReports />} />
          

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;