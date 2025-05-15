import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import Charts from '../../components/statistics/Charts';
import Button from '../../components/common/Button';

// Dummy data for SCAD dashboard
const dummyScadData = {
  officerName: 'Sarah Mahmoud',
  pendingCompanyApplications: 8,
  totalStudents: 150,
  submittedReports: 45,
  companies: [
    { id: 'COMP-001', name: 'Tech Solutions Inc.', industry: 'Technology', status: 'Pending' },
    { id: 'COMP-002', name: 'HealthCare Ltd.', industry: 'Healthcare', status: 'Pending' },
  ],
  students: [
    { id: 'STU-001', name: 'Ahmed Hassan', major: 'Computer Science', internshipStatus: 'Active' },
    { id: 'STU-002', name: 'Fatima Ali', major: 'Media Engineering', internshipStatus: 'None' },
  ],
  reports: [
    { id: 'REP-001', title: 'Internship Report - Tech Solutions', major: 'Computer Science', status: 'Accepted' },
    { id: 'REP-002', title: 'Evaluation Report - HealthCare Ltd.', major: 'Healthcare', status: 'Flagged' },
  ],
  stats: {
    reports: [
      { name: 'Accepted', value: 30 },
      { name: 'Rejected', value: 10 },
      { name: 'Flagged', value: 5 },
    ],
    reviewTime: [
      { name: 'Week 1', days: 2 },
      { name: 'Week 2', days: 3 },
      { name: 'Week 3', days: 2.5 },
    ],
    courses: [
      { name: 'Computer Science', usage: 50 },
      { name: 'Media Engineering', usage: 30 },
    ],
    ratings: [
      { name: 'Tech Solutions Inc.', rating: 4.5 },
      { name: 'HealthCare Ltd.', rating: 3.8 },
    ],
  },
  notifications: [
    {
      id: 1,
      type: 'companyApplication',
      title: 'New Company Application',
      message: 'Tech Solutions Inc. applied to offer internships.',
      date: '2025-05-10',
      read: false,
    },
  ],
};

const ScadDashboard = () => {
  const [data, setData] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setData(dummyScadData);
      setUnreadNotifications(dummyScadData.notifications.filter((n) => !n.read).length);
    }, 500);
  }, []);

  const markAllAsRead = () => {
    const updatedNotifications = data.notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setData({ ...data, notifications: updatedNotifications });
    setUnreadNotifications(0);
  };

  const exportReport = () => {
    const reportData = [
      {
        ReportStatus: 'Accepted',
        Count: data.stats.reports.find((r) => r.name === 'Accepted')?.value || 0,
      },
      {
        ReportStatus: 'Rejected',
        Count: data.stats.reports.find((r) => r.name === 'Rejected')?.value || 0,
      },
      {
        ReportStatus: 'Flagged',
        Count: data.stats.reports.find((r) => r.name === 'Flagged')?.value || 0,
      },
    ];
    const csv = Papa.unparse(reportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'scad_statistics_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Welcome, {data.officerName}</h1>
          <p className="mt-2">SCAD Office Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Pending Company Applications</p>
              <p className="text-2xl font-bold text-blue-600">{data.pendingCompanyApplications}</p>
              <Link
                to="/scad/company-applications"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Details
              </Link>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-green-600">{data.totalStudents}</p>
              <Link
                to="/scad/student-management"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Details
              </Link>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Submitted Reports</p>
              <p className="text-2xl font-bold text-yellow-600">{data.submittedReports}</p>
              <Link
                to="/scad/report-management"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Real-Time Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Real-Time Statistics</h2>
            <Button onClick={exportReport} variant="primary">
              Generate Report
            </Button>
          </div>
          <Charts statsData={data.stats} />
        </div>

        {/* Companies Applying */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Applying Companies</h2>
          <div className="space-y-4">
            {data.companies.map((company) => (
              <div key={company.id} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium text-gray-900">{company.name}</p>
                <p className="text-sm text-gray-600">Industry: {company.industry}</p>
                <p className="text-sm text-gray-600">Status: {company.status}</p>
              </div>
            ))}
          </div>
          <Link
            to="/scad/company-applications"
            className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
          >
            View All Companies
          </Link>
        </div>

        {/* Students */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Students</h2>
          <div className="space-y-4">
            {data.students.map((student) => (
              <div key={student.id} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-600">Major: {student.major}</p>
                <p className="text-sm text-gray-600">Internship Status: {student.internshipStatus}</p>
              </div>
            ))}
          </div>
          <Link
            to="/scad/student-management"
            className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
          >
            View All Students
          </Link>
        </div>

        {/* Submitted Reports */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Submitted Reports</h2>
          <div className="space-y-4">
            {data.reports.map((report) => (
              <div key={report.id} className="p-3 bg-gray-50 rounded-md">
                <p className="font-medium text-gray-900">{report.title}</p>
                <p className="text-sm text-gray-600">Major: {report.major}</p>
                <p className="text-sm text-gray-600">Status: {report.status}</p>
              </div>
            ))}
          </div>
          <Link
            to="/scad/report-reviews"
            className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
          >
            View All Reports
          </Link>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
              {unreadNotifications > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </h2>
            {unreadNotifications > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="space-y-4">
            {data.notifications.length > 0 ? (
              data.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No notifications yet</p>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link
              to="/scad/company-applications"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
            >
              Company Applications
            </Link>
            <Link
              to="/scad/internship-management"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
            >
              Internship Management
            </Link>
            <Link
              to="/scad/student-management"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
            >
              Student Management
            </Link>
            <Link
              to="/scad/report-management"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
            >
              Report Management
            </Link>
            <Link
              to="/scad/internship-cycle"
              className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
            >
              Internship Cycle Management
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScadDashboard;