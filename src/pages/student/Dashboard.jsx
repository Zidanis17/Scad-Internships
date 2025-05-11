import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

// Dummy data for the student dashboard
const dummyStudentData = {
  name: 'Ahmed Hassan',
  id: '41-12345',
  major: 'Computer Science',
  semester: 8,
  internshipHours: 180,
  requiredHours: 240,
  profileCompletion: 85,
  notifications: [
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for "Software Engineering Intern" at Tech Solutions Inc. has been accepted!',
      date: '2025-05-09',
      read: false
    },
    {
      id: 2,
      type: 'report',
      title: 'Report Status Update',
      message: 'Your internship report has been flagged. Please check the comments.',
      date: '2025-05-08',
      read: true
    },
    {
      id: 3,
      type: 'cycle',
      title: 'New Internship Cycle',
      message: 'Summer 2025 internship cycle has begun! Start applying now.',
      date: '2025-05-01',
      read: true
    }
  ]
};

const dummySuggestedCompanies = [
  {
    id: 1,
    name: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    logo: '/companies/tech-solutions.png',
    rating: 4.8,
    recommendedBy: 27,
    openPositions: 3
  },
  {
    id: 2,
    name: 'DataInsights Corp.',
    industry: 'Data Analytics',
    logo: '/companies/datainsights.png',
    rating: 4.5,
    recommendedBy: 15,
    openPositions: 2
  },
  {
    id: 3,
    name: 'Creative Studios',
    industry: 'Design',
    logo: '/companies/creative-studios.png',
    rating: 4.6,
    recommendedBy: 12,
    openPositions: 1
  }
];

const dummyRecentInternships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    duration: '3 months',
    isPaid: true,
    salary: '8000 EGP/month',
    deadline: '2025-06-15',
    postedAt: '3 days ago'
  },
  {
    id: 2,
    title: 'Data Analysis Intern',
    company: 'DataInsights Corp.',
    industry: 'Data Analytics',
    duration: '4 months',
    isPaid: true,
    salary: '10000 EGP/month',
    deadline: '2025-06-20',
    postedAt: '5 days ago'
  },
  {
    id: 3,
    title: 'UX Research Intern',
    company: 'Digital UX Lab',
    industry: 'UX/UI Design',
    duration: '3 months',
    isPaid: true,
    salary: '7500 EGP/month',
    deadline: '2025-06-25',
    postedAt: '1 week ago'
  }
];

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const [recentInternships, setRecentInternships] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    // Simulate API calls with dummy data
    setStudent(dummyStudentData);
    setSuggestedCompanies(dummySuggestedCompanies);
    setRecentInternships(dummyRecentInternships);
    setUnreadNotifications(dummyStudentData.notifications.filter(n => !n.read).length);
  }, []);

  if (!student) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const markAllAsRead = () => {
    const updatedNotifications = student.notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setStudent({
      ...student,
      notifications: updatedNotifications
    });
    setUnreadNotifications(0);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Welcome back, {student.name}</h1>
          <p className="mt-2">Student ID: {student.id} | {student.major}, Semester {student.semester}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Internship Progress</h2>
            <div className="flex items-center mb-2">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{student.internshipHours} / {student.requiredHours} hours completed</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round((student.internshipHours / student.requiredHours) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(student.internshipHours / student.requiredHours) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-medium text-gray-700">{student.profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${student.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/student/profile">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Complete Your Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Internships */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Internships</h2>
              <Link to="/student/internships" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentInternships.map((internship) => (
                <div key={internship.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{internship.title}</h3>
                    <span className="text-sm text-gray-500">{internship.postedAt}</span>
                  </div>
                  <p className="text-gray-600">{internship.company}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {internship.industry}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {internship.duration}
                    </span>
                    {internship.isPaid && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        {internship.salary}
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <Link to={`/student/internships/${internship.id}`}>
                      <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1">
                        View Details
                      </Button>
                    </Link>
                  </div>
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
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="space-y-4">
              {student.notifications.length > 0 ? (
                student.notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
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

          {/* Suggested Companies */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Suggested Companies</h2>
            </div>
            <div className="space-y-4">
              {suggestedCompanies.map((company) => (
                <div key={company.id} className="flex items-center space-x-3 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-medium text-gray-700">{company.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                    <div className="mt-1 flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-600">{company.rating} • Recommended by {company.recommendedBy} students</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-sm text-blue-600">{company.openPositions} open positions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link 
                to="/student/applications" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
              >
                My Applications
              </Link>
              <Link 
                to="/student/reports" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
              >
                My Reports
              </Link>
              <Link 
                to="/student/internships" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
              >
                Browse Internships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;