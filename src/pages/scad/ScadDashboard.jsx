import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import Charts from '../../components/statistics/Charts';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/ToastContext';

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
      details: 'Tech Solutions Inc., a medium-sized Information Technology company, has submitted an application to offer internships for the Summer 2025 cycle. The application includes 3 internship positions in Software Engineering and Data Analysis. Review their proposal to approve or request additional information.',
      actions: [
        {
          label: 'Review Application',
          action: 'review',
          path: '/scad/company-applications',
        },
      ],
    },
    {
      id: 2,
      type: 'appointmentAccepted',
      title: 'Appointment Accepted',
      message: 'Your appointment with Ahmed Hassan on 2025-05-12 has been accepted.',
      date: '2025-05-11',
      read: false,
      details: 'Your scheduled appointment with Ahmed Hassan (Computer Science student) on May 12, 2025, at 2:00 PM has been confirmed. The meeting will discuss internship opportunities for the Summer 2025 cycle. Please prepare any relevant materials.',
      actions: [
        {
          label: 'View Appointment',
          action: 'view',
          path: '/scad/career-guidance',
        },
      ],
    },
    {
      id: 3,
      type: 'incomingCall',
      title: 'Incoming Call',
      message: 'You have an incoming call from Jane Doe scheduled for 2025-05-13.',
      date: '2025-05-12',
      read: false,
      details: 'Jane Doe, a SCAD Officer, has scheduled a call with you on May 13, 2025, at 10:00 AM to discuss the Summer 2025 internship cycle. Please ensure you are available to join the call.',
      actions: [
        {
          label: 'Join Call',
          action: 'join',
          path: '/scad/career-guidance',
        },
      ],
    },
  ],
};

// Notification Modal
const NotificationModal = ({ notification, onClose, onAction }) => {
  if (!notification) return null;

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'companyApplication':
        return (
          <div className="bg-indigo-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'appointmentAccepted':
        return (
          <div className="bg-yellow-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      case 'incomingCall':
        return (
          <div className="bg-green-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-gray-200 flex items-start space-x-4">
          {getTypeIcon()}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{notification.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600">{notification.details}</p>
        </div>
        <div className="p-6 bg-gray-50 flex flex-wrap justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none"
          >
            Close
          </button>
          {notification.actions &&
            notification.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => onAction(action)}
                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded focus:outline-none"
              >
                {action.label}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

const ScadDashboard = () => {
  const { success } = useToast();
  const [data, setData] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

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
    success('All notifications marked as read!');
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
    success('Report exported successfully!');
  };

  const handleNotificationClick = (notification) => {
    const updatedNotifications = data.notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setData({ ...data, notifications: updatedNotifications });
    setUnreadNotifications(updatedNotifications.filter((n) => !n.read).length);
    setSelectedNotification(notification);
  };

  const handleNotificationAction = (action) => {
    setSelectedNotification(null);
    if (action.path) {
      navigate(action.path);
    }
  };

  const handleModalClose = () => {
    setSelectedNotification(null);
  };

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Welcome, {data.officerName}</h1>
          <p className="mt-2">SCAD Office Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Pending Company Applications</h3>
              <p className="text-3xl font-bold text-gray-800">{data.pendingCompanyApplications}</p>
              <Link
                to="/scad/company-applications"
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
              >
                View Details
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Students</h3>
              <p className="text-3xl font-bold text-gray-800">{data.totalStudents}</p>
              <Link
                to="/scad/student-management"
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
              >
                View Details
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Submitted Reports</h3>
              <p className="text-3xl font-bold text-gray-800">{data.submittedReports}</p>
              <Link
                to="/scad/report-management"
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Real-Time Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Real-Time Statistics</h2>
              <Button
                onClick={exportReport}
                className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm py-1"
              >
                Generate Report
              </Button>
            </div>
            <Charts statsData={data.stats} />
          </div>

          {/* Applying Companies */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Applying Companies</h2>
              <Link
                to="/scad/company-applications"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {data.companies.map((company) => (
                <div
                  key={company.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{company.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        company.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Industry: {company.industry}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Students</h2>
              <Link
                to="/scad/student-management"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {data.students.map((student) => (
                <div
                  key={student.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{student.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        student.internshipStatus === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {student.internshipStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Major: {student.major}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submitted Reports */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Submitted Reports</h2>
              <Link
                to="/scad/report-reviews"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {data.reports.map((report) => (
                <div
                  key={report.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        report.status === 'Accepted'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'Flagged'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Major: {report.major}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
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
                  className="text-sm text-indigo-600 hover:text-indigo-800"
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
                      notification.read ? 'bg-gray-50' : 'bg-indigo-50'
                    } cursor-pointer`}
                    onClick={() => handleNotificationClick(notification)}
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
                Applying Companies
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

      {/* Notification Modal */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={handleModalClose}
          onAction={handleNotificationAction}
        />
      )}
    </div>
  );
};

export default ScadDashboard;