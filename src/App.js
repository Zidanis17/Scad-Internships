import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from 'components/common/ToastContext';
import Navbar from './components/navigation/Navbar';
import Login from './pages/auth/Login';
import CompanyRegistration from './pages/auth/CompanyRegistration';
import CompanyDashboard from './pages/company/Dashboard';
import CompanyInterns from './pages/company/Interns';
import CompanyApplications from './pages/company/Applications';
import InternshipPosts from './pages/company/InternshipPosts';
import StudentDashboard from './pages/student/Dashboard';
import StudentInternship from './pages/student/Internship';
import StudentProfile from './pages/student/Profile';
import StudentApplications from './pages/student/Applications';
import StudentReports from "./pages/student/Reports";
import ProStudentDashboard from 'pages/proStudent/ProStudentDashboard';
import Assessments from 'pages/proStudent/Assessments';
import Workshops from 'pages/proStudent/Workshops';
import CareerGuidance from 'pages/proStudent/CareerGuidance';
import Profile from './pages/student/Profile';
import ScadDashboard from 'pages/scad/ScadDashboard';
import InternshipCycles from 'pages/scad/InternshipCycles';
import ScadProfile from 'pages/scad/ScadProfile';
import CompanyApplicationsScad from 'pages/scad/CompanyApplicationsScad';
import StudentManagement from 'pages/scad/StudentManagement';
import Statistics from 'pages/scad/Statistics';
import FacultyReportReview from 'pages/faculty/ReportReviews';
import FacultyDashboard from 'pages/faculty/FacultyDashboard';
import FacultyStatistics from 'pages/faculty/FacultyStatistics';
import FacultyProfile from 'pages/faculty/FacultyProfile';
import AutoEmailSender from './components/common/AutoEmailSender';
import Internships from './pages/student/Internship';
import WorkshopManagement from 'pages/scad/workShopManagement';
import NotFound from './pages/auth/NotFound';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-company" element={<CompanyRegistration />} />
            <Route path="/company/dashboard" element={<CompanyDashboard />} />
            <Route path="/company/internship-posts" element={<InternshipPosts />} />
            <Route path="/company/applications" element={<CompanyApplications />} />
            <Route path="/company/interns" element={<CompanyInterns />} />
            <Route path="/company/internships" element={<Internships />} />
            <Route path="/student/dashboard" element={<ProStudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/internships" element={<StudentInternship />} />
            <Route path="/student/applications" element={<StudentApplications />} />
            <Route path="/student/reports" element={<StudentReports />} />
            <Route path="/prostudent/dashboard" element={<ProStudentDashboard />} />
            <Route path="/prostudent/profile" element={<Profile />} />
            <Route path="/prostudent/internships" element={<StudentInternship />} />
            <Route path="/prostudent/applications" element={<StudentApplications />} />
            <Route path="/prostudent/reports" element={<StudentReports />} />
            <Route path="/prostudent/assessments" element={<Assessments />} />
            <Route path="/prostudent/workshops" element={<Workshops />} />
            <Route path="/prostudent/career-guidance" element={<CareerGuidance />} />
            <Route path="/scad/dashboard" element={<ScadDashboard />} />
            <Route path="/scad/company-applications" element={<CompanyApplicationsScad />} />
            <Route path="/scad/internship-cycles" element={<InternshipCycles />} />
            <Route path="/scad/report-reviews" element={<FacultyReportReview />} />
            <Route path="/scad/career-guidance" element={<CareerGuidance />} />
            <Route path="/scadOffice/profile" element={<ScadProfile />} />
            <Route path="/scad/student-management" element={<StudentManagement />} />
            <Route path="/scad/statistics" element={<Statistics />} />
            <Route path="/scad/workshops" element={<WorkshopManagement />} />
            <Route path="/scad/internships" element={<Internships />} />
            <Route path="/faculty/report-reviews" element={<FacultyReportReview />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/faculty-statistics" element={<FacultyStatistics />} />
            <Route path="/faculty/profile" element={<FacultyProfile />} />
            {/* Catch-all route to redirect to login for undefined paths */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;