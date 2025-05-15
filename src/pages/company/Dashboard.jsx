import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import InternshipForm from '../../components/internship/InternshipForm';
import EvaluationForm from '../../components/evaluation/EvaluationForm';
import { useToast } from '../../components/common/ToastContext';

// Dummy data for the company dashboard
const dummyCompanyData = {
  name: 'Tech Solutions Inc.',
  id: 'COMP-5678',
  industry: 'Information Technology',
  size: 'Medium',
  logo: '/companies/tech-solutions.png',
  status: 'Approved',
  joinDate: '2025-01-15',
  notifications: [
    {
      id: 1,
      type: 'application',
      title: 'New Application Received',
      message: 'Ahmed Hassan has applied for "Software Engineering Intern" position.',
      date: '2025-05-10',
      read: false,
      details: 'Ahmed Hassan (Computer Science, Semester 8) has applied for the "Software Engineering Intern" position. Their application includes experience with JavaScript, React, and Node.js. They are available to start immediately and can work full-time for the duration of the internship.',
      actions: [
        { 
          label: 'Review Application', 
          action: 'view',
          path: '/company/applications'
        }
      ]
    },
    {
      id: 2,
      type: 'intern',
      title: 'Intern Completion',
      message: 'Mariam Ali has completed her internship. Please submit an evaluation.',
      date: '2025-05-08',
      read: false,
      details: 'Mariam Ali has completed her 3-month Data Analysis internship. According to our records, she has fulfilled all required hours. Please submit an evaluation of her performance to complete the internship process. Your evaluation is crucial for her academic requirements.',
      actions: [
        { 
          label: 'Submit Evaluation', 
          action: 'evaluate',
          path: '/company/interns'
        }
      ]
    },
    {
      id: 3,
      type: 'cycle',
      title: 'New Internship Cycle',
      message: 'Summer 2025 internship cycle has begun! Post your internship opportunities now.',
      date: '2025-05-01',
      read: true,
      details: 'The Summer 2025 internship cycle has officially begun! This is the perfect time to post your internship opportunities to attract top talent from our partner universities. Internship positions posted early typically receive 40% more qualified applications. The application window for students will be open until June 30, 2025.',
      actions: [
        { 
          label: 'Post New Internship', 
          action: 'create',
          path: '/company/internship-posts'
        }
      ]
    }
  ]
};

const dummyInternshipPosts = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    duration: '3 months',
    isPaid: true,
    salary: '8000 EGP/month',
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    applicationsCount: 12,
    status: 'Active',
    deadline: '2025-06-15',
    postedAt: '2025-05-07',
    description: 'We are looking for a motivated Software Engineering Intern to join our development team. The intern will work on real-world projects under the guidance of senior developers.',
    industry: 'Information Technology'
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    duration: '4 months',
    isPaid: true,
    salary: '7500 EGP/month',
    skillsRequired: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    applicationsCount: 8,
    status: 'Active',
    deadline: '2025-06-20',
    postedAt: '2025-05-05',
    description: 'Join our design team to create user-centered designs for web and mobile applications. The intern will participate in the entire design process from concept to implementation.',
    industry: 'Information Technology'
  },
  {
    id: 3,
    title: 'Data Analysis Intern',
    duration: '2 months',
    isPaid: false,
    skillsRequired: ['Excel', 'SQL', 'Data Visualization'],
    applicationsCount: 5,
    status: 'Active',
    deadline: '2025-06-10',
    postedAt: '2025-05-03',
    description: 'We are seeking a Data Analysis Intern to help our team gather insights from various datasets. The intern will work with our business intelligence team to create reports and visualizations.',
    industry: 'Information Technology'
  }
];

const dummyCurrentInterns = [
  {
    id: 1,
    name: 'Omar Ibrahim',
    major: 'Computer Science',
    position: 'Software Engineering Intern',
    startDate: '2025-04-01',
    endDate: '2025-07-01',
    progress: 50,
    skills: ['JavaScript', 'React', 'Node.js'],
    supervisor: 'Ahmed Mahmoud',
    status: 'current',
    evaluated: false,
    contactEmail: 'omar.ibrahim@student.guc.edu.eg',
    phone: '+20 123-456-7890'
  },
  {
    id: 2,
    name: 'Nour Ahmed',
    major: 'Business Informatics',
    position: 'Data Analysis Intern',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    progress: 75,
    skills: ['SQL', 'Excel', 'Python'],
    supervisor: 'Hossam Ali',
    status: 'current',
    evaluated: false,
    contactEmail: 'nour.ahmed@student.guc.edu.eg',
    phone: '+20 123-456-7891'
  }
];

const dummyRecentApplications = [
  {
    id: 1,
    studentName: 'Ahmed Hassan',
    major: 'Computer Science',
    position: 'Software Engineering Intern',
    appliedDate: '2025-05-10',
    status: 'Pending'
  },
  {
    id: 2,
    studentName: 'Sara Mohamed',
    major: 'Business Informatics',
    position: 'UI/UX Design Intern',
    appliedDate: '2025-05-09',
    status: 'Finalized'
  },
  {
    id: 3,
    studentName: 'Yousef Ali',
    major: 'Computer Engineering',
    position: 'Software Engineering Intern',
    appliedDate: '2025-05-08',
    status: 'Finalized'
  }
];

// Modal component for notification details - copied from ProStudentDashboard
const NotificationModal = ({ notification, onClose, onAction }) => {
  if (!notification) return null;

  // Define icon based on notification type
  const getTypeIcon = () => {
    switch (notification.type) {
      case 'application':
        return (
          <div className="bg-indigo-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'intern':
        return (
          <div className="bg-green-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'cycle':
        return (
          <div className="bg-yellow-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto overflow-hidden animate-fade-in-up">
        {/* Header */}
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600">{notification.details}</p>
        </div>
        
        {/* Actions */}
        <div className="p-6 bg-gray-50 flex flex-wrap justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none"
          >
            Close
          </button>
          {notification.actions && notification.actions.map((action, index) => (
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

const Dashboard = () => {
  const { success } = useToast();
  const [company, setCompany] = useState(null);
  const [internshipPosts, setInternshipPosts] = useState([]);
  const [currentInterns, setCurrentInterns] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostDetailsModalOpen, setIsPostDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API calls with dummy data
    setCompany(dummyCompanyData);
    setInternshipPosts(dummyInternshipPosts);
    setCurrentInterns(dummyCurrentInterns);
    setRecentApplications(dummyRecentApplications);
    setUnreadNotifications(dummyCompanyData.notifications.filter(n => !n.read).length);
  }, []);

  if (!company) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderSkills = (skills) => {
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  const markAllAsRead = () => {
    const updatedNotifications = company.notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setCompany({
      ...company,
      notifications: updatedNotifications
    });
    setUnreadNotifications(0);
  };

  const handleNotificationAction = (action) => {
    console.log(`Action triggered: ${action.action}`);
    // Close the modal
    setSelectedNotification(null);
    
    // Navigate to the corresponding page
    if (action.path) {
      navigate(action.path);
    }
  };

  const handleModalClose = () => {
    setSelectedNotification(null);
  };

  const handleNotificationClick = (notification) => {
    // Mark this notification as read
    const updatedNotifications = company.notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    );
    
    setCompany({
      ...company,
      notifications: updatedNotifications
    });
    
    // Update unread count
    setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
    
    // Show the notification modal
    setSelectedNotification(notification);
  };

  const handleMarkAsComplete = (internId) => {
    const updatedInterns = currentInterns.map(intern => {
      if (intern.id === internId) {
        return { ...intern, status: 'completed', progress: 100 };
      }
      return intern;
    });
    setCurrentInterns(updatedInterns.filter(intern => intern.status === 'current'));
    const completedIntern = updatedInterns.find(intern => intern.id === internId);
    setSelectedIntern(completedIntern);
    setIsEvaluationModalOpen(true);
  };

  const handleEvaluationSubmit = (evaluation) => {
    const updatedInterns = currentInterns.map(intern => {
      if (intern.id === selectedIntern.id) {
        return { ...intern, evaluated: true };
      }
      return intern;
    });
    setCurrentInterns(updatedInterns);
    setIsEvaluationModalOpen(false);
    setSelectedIntern(null);
    console.log('Evaluation submitted:', evaluation);
  };

  const handleCreatePost = () => {
    setFormMode('create');
    setSelectedPost(null);
    setIsFormModalOpen(true);
  };

  const handleAcceptIntern = (applicationId) => {
    // Find the application
    const application = recentApplications.find(app => app.id === applicationId);
    if (!application) return;

    // Remove application from recentApplications
    const updatedApplications = recentApplications.filter(app => app.id !== applicationId);
    setRecentApplications(updatedApplications);

    // Find the corresponding internship post to get skills and duration
    const internshipPost = internshipPosts.find(post => post.title === application.position);
    
    // Calculate start and end dates
    const startDate = new Date().toISOString().split('T')[0]; // Today
    const durationMonths = internshipPost?.duration
      ? parseInt(internshipPost.duration.split(' ')[0]) || 3
      : 3; // Default to 3 months if not found
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    // Create new intern
    const newIntern = {
      id: Math.max(...currentInterns.map(intern => intern.id), 0) + 1, // Generate new ID
      name: application.studentName,
      major: application.major,
      position: application.position,
      startDate,
      endDate: formattedEndDate,
      progress: 0,
      skills: internshipPost?.skillsRequired || [], // Use post skills or empty array
      supervisor: 'TBD', // Default supervisor
      status: 'current',
      evaluated: false,
      contactEmail: `${application.studentName.toLowerCase().replace(/\s+/g, '.')}@student.guc.edu.eg`, // Mock email
      phone: 'N/A' // Default phone
    };

    // Add to current interns
    setCurrentInterns([...currentInterns, newIntern]);

    // Mark related notification as read (if exists)
    const relatedNotification = company.notifications.find(n =>
      n.type === 'application' && n.message.includes(application.studentName)
    );
    if (relatedNotification) {
      const updatedNotifications = company.notifications.map(n =>
        n.id === relatedNotification.id ? { ...n, read: true } : n
      );
      setCompany({ ...company, notifications: updatedNotifications });
      setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
    }

    // Show success toast
    success(`${application.studentName} has been accepted as a current intern!`);
  };

  const handleSubmitPost = (postData) => {
    const { jobTitle, skills, ...rest } = postData;
    const title = jobTitle;
    const skillsRequired = skills;
    const durationMonths = parseInt(postData.duration?.split(' ')[0]) || 0;
    
    if (formMode === 'create') {
      const newPost = {
        id: internshipPosts.length + 1,
        title,
        skillsRequired,
        ...rest,
        durationMonths,
        postedAt: new Date().toISOString().split('T')[0],
        applicationsCount: 0,
        status: postData.status || 'Active'
      };
      setInternshipPosts([...internshipPosts, newPost]);
    }
    setIsFormModalOpen(false);
    setSelectedPost(null);
  };

  const renderInternDetails = () => {
    if (!selectedIntern) return null;
    
    return (
      <div className="space-y-6 max-w-full overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between pb-6 border-b border-gray-200">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">{selectedIntern.name}</h3>
            <p className="text-lg text-indigo-600">{selectedIntern.position}</p>
            <p className="text-gray-600">{selectedIntern.major}</p>
          </div>
          <div>
            <span 
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                selectedIntern.status === 'current' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {selectedIntern.status === 'current' ? 'Current Intern' : 'Internship Complete'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Internship Details</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Start Date:</span>
                <span className="md:text-right">{selectedIntern.startDate}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">End Date:</span>
                <span className="md:text-right">{selectedIntern.endDate}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Supervisor:</span>
                <span className="md:text-right">{selectedIntern.supervisor}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Progress:</span>
                <span className="md:text-right">{selectedIntern.progress}% Complete</span>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Contact Information</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="md:text-right break-all">{selectedIntern.contactEmail}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="md:text-right">{selectedIntern.phone}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {selectedIntern.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const totalApplications = internshipPosts.reduce((total, post) => total + post.applicationsCount, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Welcome, {company.name}</h1>
          <p className="mt-2">Company ID: {company.id} | {company.industry} | {company.size} Company</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Active Internship Posts</h3>
              <p className="text-3xl font-bold text-gray-800">{internshipPosts.length}</p>
              <Link to="/company/internship-posts" className="mt-4 text-sm text-indigo-600 hover:text-indigo-800">
                Manage Posts
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Applications</h3>
              <p className="text-3xl font-bold text-gray-800">{totalApplications}</p>
              <Link to="/company/applications" className="mt-4 text-sm text-indigo-600 hover:text-indigo-800">
                Review Applications
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <h3 className="text-gray-500 text-sm font-medium mb-1">Current Interns</h3>
              <p className="text-3xl font-bold text-gray-800">{currentInterns.length}</p>
              <Link to="/company/interns" className="mt-4 text-sm text-indigo-600 hover:text-indigo-800">
                Manage Interns
              </Link>
            </div>
          </div>

          {/* Internship Posts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Internship Posts</h2>
              <Link to="/company/internship-posts" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {internshipPosts.map((post) => (
                <div key={post.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      post.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Posted on: {post.postedAt} | Deadline: {post.deadline}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {post.duration}
                    </span>
                    {post.isPaid ? (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        Paid: {post.salary}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        Unpaid
                      </span>
                    )}
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {post.applicationsCount} Applications
                    </span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm py-1"
                      onClick={() => {
                        setSelectedPost(post);
                        setIsPostDetailsModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Link to={`/company/applications?post=${post.id}`}>
                      <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1">
                        View Applications
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button 
                className="bg-indigo-600 text-white hover:bg-indigo- rustic text-sm font-medium py-1"
                onClick={handleCreatePost}
              >
                Create New Internship Post
              </Button>
            </div>
          </div>

          {/* Current Interns */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Current Interns</h2>
              <Link to="/company/interns" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            {currentInterns.length > 0 ? (
              <div className="space-y-4">
                {currentInterns.map((intern) => (
                  <div key={intern.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{intern.name}</h3>
                      {intern.evaluated ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Evaluated
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Pending Evaluation
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{intern.position} | {intern.major}</p>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Internship Progress</span>
                        <span className="text-sm text-gray-600">{intern.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${intern.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {intern.startDate} to {intern.endDate}
                      </p>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button 
                        className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm py-1"
                        onClick={() => {
                          setSelectedIntern(intern);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                      {intern.status === 'current' && (
                        <Button 
                          className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1"
                          onClick={() => handleMarkAsComplete(intern.id)}
                        >
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No current interns</p>
            )}
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
              {company.notifications.length > 0 ? (
                company.notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-indigo-50'} cursor-pointer`}
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

          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
              <Link to="/company/applications" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View All
              </Link>
            </div>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{application.studentName}</h3>
                        <p className="text-sm text-gray-600">{application.major}</p>
                        <p className="text-sm text-gray-500">Applied for: {application.position}</p>
                        <p className="text-xs text-gray-500">Applied on: {application.appliedDate}</p>
                      </div>
                      <span 
                        className={`text-xs px-2 py-1 rounded ${
                          application.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : application.status === 'Finalized'
                            ? 'bg-blue-100 text-blue-800'
                            : application.status === 'Accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Link to={`/company/applications/${application.id}`}>
                        <Button className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm py-1">
                          Review Application
                        </Button>
                      </Link>
                      { (
                        <Button 
                          className="bg-green-600 text-white hover:bg-green-700 text-sm py-1"
                          onClick={() => handleAcceptIntern(application.id)}
                        >
                          Accept Intern
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent applications</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium w-full text-left"
                onClick={handleCreatePost}
              >
                Create New Internship Post
              </Link>
              <Link 
                to="/company/applications" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
              >
                Review Applications
              </Link>
              <Link 
                to="/company/interns" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
              >
                Manage Interns
              </Link>
              <Link 
                to="/company/profile" 
                className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium"
              >
                Company Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isDetailsModalOpen && selectedIntern && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="Intern Details"
          size="xl"
        >
          {renderInternDetails()}
        </Modal>
      )}

      {isEvaluationModalOpen && selectedIntern && (
        <Modal
          isOpen={isEvaluationModalOpen}
          onClose={() => setIsEvaluationModalOpen(false)}
          title="Evaluate Intern"
        >
          <EvaluationForm
            intern={selectedIntern}
            onSubmit={handleEvaluationSubmit}
          />
        </Modal>
      )}

      {isPostDetailsModalOpen && selectedPost && (
        <Modal
          isOpen={isPostDetailsModalOpen}
          onClose={() => setIsPostDetailsModalOpen(false)}
          title={selectedPost.title || 'Internship Details'}
          size="lg"
        >
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Internship Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                    <span className="ml-2 text-sm">{selectedPost.duration}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedPost.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      selectedPost.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedPost.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Compensation:</span>
                    <span className="ml-2 text-sm">
                      {selectedPost.isPaid ? `Paid (${selectedPost.salary})` : 'Unpaid'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Industry:</span>
                    <span className="ml-2 text-sm">{selectedPost.industry}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Application Deadline:</span>
                    <span className="ml-2 text-sm">{formatDate(selectedPost.deadline)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Posted On:</span>
                    <span className="ml-2 text-sm">{formatDate(selectedPost.postedAt)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Applications:</span>
                    <Link to={`/company/applications?post=${selectedPost.id}`}>
                      <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-indigo-200">
                        {selectedPost.applicationsCount} {selectedPost.applicationsCount === 1 ? 'Application' : 'Applications'}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">{selectedPost.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Skills Required</h3>
                {renderSkills(selectedPost.skillsRequired)}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button 
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => setIsPostDetailsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create Internship Post Modal */}
      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title="Create New Internship Post"
          size="lg"
        >
          <InternshipForm
            initialData={{}}
            onSubmit={handleSubmitPost}
            mode="create"
          />
        </Modal>
      )}

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

export default Dashboard;