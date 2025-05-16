import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastContext';
import CustomVideoPlayer from '../../components/common/CustomVideoPlayer';
import VideoModal from '../../components/common/VideoModal';
import ModernChatInterface from '../../components/common/ModernChatInterface';
import jsPDF from 'jspdf';


// Mock workshops data with enhanced structure to match requirements
const dummyWorkshops = [
  {
    id: 1,
    name: 'Advanced Interview Techniques',
    description: 'Learn advanced techniques to ace your technical interviews with confidence.',
    startDate: '2025-05-20',
    endDate: '2025-05-20',
    time: '10:00 AM - 12:00 PM',
    speaker: {
      name: 'John Doe',
      bio: 'Senior Technical Recruiter at TechCorp with over 10 years of experience in hiring software engineers.'
    },
    agenda: [
      'Common technical interview patterns',
      'How to approach algorithm questions',
      'Effective communication during interviews',
      'Q&A session'
    ],
    isLive: true,
    requiresRegistration: true,
    registered: false,
    videoId: 'rHux0gMZ3Eg',
    comments: [],
    attendees: 45
  },
  {
    id: 2,
    name: 'Resume Building Workshop',
    description: 'Create a standout resume that will get you noticed by recruiters in the tech industry.',
    startDate: '2025-05-25',
    endDate: '2025-05-25',
    time: '2:00 PM - 4:00 PM',
    speaker: {
      name: 'Jane Smith',
      bio: 'Career Counselor with expertise in helping CS graduates land jobs at top tech companies.'
    },
    agenda: [
      'Resume structure and formatting',
      'Highlighting relevant experience',
      'Tailoring your resume for different roles',
      'Common resume mistakes to avoid'
    ],
    isLive: false,
    requiresRegistration: true,
    registered: true,
    videoId: 'GuXR0OlRWcY',
    comments: [
      { id: 1, user: 'Alex Chen', message: 'This workshop helped me land an interview at Google!', timestamp: '2025-05-10' },
      { id: 2, user: 'Sarah Johnson', message: 'Great practical advice for new graduates.', timestamp: '2025-05-11' }
    ],
    attendees: 78
  },
  {
    id: 3,
    name: 'Networking for Tech Professionals',
    description: 'Build a professional network that will help advance your career in technology.',
    startDate: '2025-06-05',
    endDate: '2025-06-05',
    time: '1:00 PM - 3:00 PM',
    speaker: {
      name: 'Emily Johnson',
      bio: 'LinkedIn Talent Solutions Specialist and Professional Networking Coach.'
    },
    agenda: [
      'Building your online presence',
      'Effective networking strategies',
      'Following up after networking events',
      'Maintaining professional relationships'
    ],
    isLive: false,
    requiresRegistration: false,
    registered: false,
    videoId: 'mVhx9g3fap4',
    comments: [
      { id: 1, user: 'Michael Wong', message: 'The LinkedIn tips were invaluable!', timestamp: '2025-04-28' },
      { id: 2, user: 'Lisa Park', message: 'Great strategies for introverts like me.', timestamp: '2025-04-30' }
    ],
    attendees: 56
  },
  {
    id: 4,
    name: 'Technical Portfolio Development',
    description: 'Learn how to build an impressive technical portfolio to showcase your skills to potential employers.',
    startDate: '2025-06-15',
    endDate: '2025-06-15',
    time: '11:00 AM - 1:00 PM',
    speaker: {
      name: 'Robert Chen',
      bio: 'Senior Developer Advocate and former Hiring Manager at Microsoft.'
    },
    agenda: [
      'Choosing meaningful projects',
      'GitHub best practices',
      'Documentation techniques',
      'Presenting your work effectively'
    ],
    isLive: false,
    requiresRegistration: true,
    registered: false,
    videoId: 'u-RLu_8kwA0',
    comments: [],
    attendees: 32
  }
];

const Workshops = () => {
  const toast = useToast();
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [watchingWorkshop, setWatchingWorkshop] = useState(null);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [watchingComments, setWatchingComments] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past', 'registered'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Resume Building Workshop starts in 2 days!", read: false, timestamp: "2025-05-23" },
    { id: 2, message: "You have a new message in Advanced Interview Techniques workshop", read: true, timestamp: "2025-05-18" }
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setWorkshops(dummyWorkshops);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleRegister = (workshop) => {
    setWorkshops(workshops.map(w => w.id === workshop.id ? { ...w, registered: true } : w));
    setIsModalOpen(false);
    toast.success(`Successfully registered for "${workshop.name}"`);
    
    const newNotification = {
      id: notifications.length + 1,
      message: `You've registered for ${workshop.name} on ${workshop.startDate}`,
      read: false,
      timestamp: new Date().toISOString().slice(0, 10)
    };
    setNotifications([newNotification, ...notifications]);
  };

  const handleJoinLive = (workshop) => {
    setWatchingWorkshop(workshop);
    setIsLiveModalOpen(true);
    setChatMessages([
      { id: 1, user: 'Alice', message: 'Excited for this workshop!', timestamp: '10:01 AM' },
      { id: 2, user: 'Bob', message: 'Me too!', timestamp: '10:02 AM' }
    ]);
    setWatchingComments([]);
    setNotes('');
    setRating(0);
    setFeedback('');
    toast.info('You have joined the live workshop');
  };

  const handleWatch = (workshop) => {
    setWatchingWorkshop(workshop);
    setIsLiveModalOpen(true);
    setChatMessages([]);
    setWatchingComments(workshop.comments || []);
    setNotes('');
    setRating(0);
    setFeedback('');
  };

  const handleSendMessage = () => {
  if (!newMessage.trim()) return;
  
  const newMsg = {
    id: chatMessages.length + 1,
    user: 'You',
    message: newMessage,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  
  setChatMessages([...chatMessages, newMsg]);
  setNewMessage('');
  
  // Show toast notification that you sent a message
  toast.info(`You sent a message`);
  
  // Simulate response from the speaker
  setTimeout(() => {
    const speakerMsg = {
      id: chatMessages.length + 2,
      user: watchingWorkshop.speaker.name,
      message: 'Thank you for your question! I\'ll address that in a moment.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages(prev => [...prev, speakerMsg]);
    
    // Show toast notification for speaker's response
    toast.info(`${watchingWorkshop.speaker.name} sent a message`);
  }, 2000);
};

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast.warning('Please provide a rating before submitting feedback');
      return;
    }
    
    toast.success(`Thank you for your feedback on "${watchingWorkshop?.name}"`);
    setIsLiveModalOpen(false);
    setRating(0);
    setFeedback('');
  };

  const handleDownloadCertificate = (workshop) => {
  toast.info('Generating your certificate...');
  
  setTimeout(() => {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    
    // Add background color
    doc.setFillColor(240, 248, 255); // Light blue background
    doc.rect(0, 0, 297, 210, 'F');
    
    // Add border
    doc.setDrawColor(70, 130, 180); // Steel blue border
    doc.setLineWidth(5);
    doc.rect(10, 10, 277, 190);
    
    // Add header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(25, 25, 112); // Midnight blue text
    doc.text("Certificate of Completion", 148.5, 40, { align: "center" });
    
    // Add main text
    doc.setFontSize(16);
    doc.text("This is to certify that", 148.5, 70, { align: "center" });
    
    // Add name
    doc.setFontSize(22);
    doc.setFont("helvetica", "bolditalic");
    doc.text("[Your Name]", 148.5, 85, { align: "center" });
    
    // Add workshop details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("has successfully completed the workshop", 148.5, 105, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`"${workshop.name}"`, 148.5, 120, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`held on ${workshop.endDate}`, 148.5, 135, { align: "center" });
    doc.text(`Speaker: ${workshop.speaker.name}`, 148.5, 145, { align: "center" });
    
    // Add footer
    doc.setFontSize(12);
    doc.text("This certificate is awarded in recognition of your commitment", 148.5, 165, { align: "center" });
    doc.text("to professional development and career advancement.", 148.5, 175, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.text("SCAD Career Center", 148.5, 190, { align: "center" });
    
    // Save the PDF
    doc.save(`${workshop.name.replace(/\s+/g, '_')}_Certificate.pdf`);
    
    toast.success('Certificate downloaded successfully');
  }, 1000);
};

  const handleSaveNotes = () => {
    toast.success('Notes saved successfully');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.speaker.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const today = new Date();
    const workshopDate = new Date(workshop.startDate);
    
    switch(filter) {
      case 'upcoming':
        return matchesSearch && workshopDate >= today;
      case 'past':
        return matchesSearch && workshopDate < today;
      case 'registered':
        return matchesSearch && workshop.registered;
      default:
        return matchesSearch;
    }
  });

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const unreadNotificationsCount = notifications.filter(notification => !notification.read).length;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading workshops...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header Banner */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Career Workshops</h1>
              <p className="mt-2">Enhance your skills with professional development workshops</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                Notifications
                {unreadNotificationsCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200">
                  <div className="py-2 px-3 bg-gray-100 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-700">Notifications</h3>
                  </div>
                  {notifications.length > 0 ? (
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 border-b hover:bg-gray-50 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                  <div className="py-2 px-4 bg-gray-100 text-right">
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={markAllNotificationsAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search workshops by name, description, or speaker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <select 
                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Workshops</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="registered">Registered</option>
              </select>
              <div className="flex border rounded overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workshop Listings */}
        {filteredWorkshops.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkshops.map((workshop) => (
                <div key={workshop.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-blue-100 rounded-t-lg flex items-center justify-center">
                    <svg className="w-20 h-20 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{workshop.name}</h3>
                      {workshop.isLive && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                          Live
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{workshop.description}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500"><span className="font-medium">Date:</span> {workshop.startDate}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">Time:</span> {workshop.time}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">Speaker:</span> {workshop.speaker.name}</p>
                      <p className="text-sm text-gray-500"><span className="font-medium">Attendees:</span> {workshop.attendees}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="small" 
                        variant="secondary" 
                        onClick={() => {
                          setSelectedWorkshop(workshop);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        Details
                      </Button>
                      {workshop.requiresRegistration ? (
                        workshop.registered ? (
                          workshop.isLive ? (
                            <Button size="small" onClick={() => handleJoinLive(workshop)}>
                              Join Live
                            </Button>
                          ) : (
                            <Button size="small" onClick={() => handleDownloadCertificate(workshop)}>
                              Get Certificate
                            </Button>
                          )
                        ) : (
                          <Button 
                            size="small" 
                            onClick={() => {
                              setSelectedWorkshop(workshop);
                              setIsModalOpen(true);
                            }}
                          >
                            Register
                          </Button>
                        )
                      ) : (
                        <Button size="small" onClick={() => handleWatch(workshop)}>
                          Watch Video
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWorkshops.map((workshop) => (
                <div key={workshop.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-2/3">
                      <div className="flex items-center">
                        <h3 className="text-lg font-bold text-gray-800">{workshop.name}</h3>
                        {workshop.isLive && (
                          <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{workshop.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                        <p className="text-sm text-gray-500"><span className="font-medium">Date:</span> {workshop.startDate}</p>
                        <p className="text-sm text-gray-500"><span className="font-medium">Time:</span> {workshop.time}</p>
                        <p className="text-sm text-gray-500"><span className="font-medium">Speaker:</span> {workshop.speaker.name}</p>
                        <p className="text-sm text-gray-500"><span className="font-medium">Attendees:</span> {workshop.attendees}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-auto flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                      <Button 
                        size="small" 
                        variant="secondary" 
                        onClick={() => {
                          setSelectedWorkshop(workshop);
                          setIsDetailsModalOpen(true);
                        }}
                      >
                        Details
                      </Button>
                      {workshop.requiresRegistration ? (
                        workshop.registered ? (
                          workshop.isLive ? (
                            <Button size="small" onClick={() => handleJoinLive(workshop)}>
                              Join Live
                            </Button>
                          ) : (
                            <Button size="small" onClick={() => handleDownloadCertificate(workshop)}>
                              Get Certificate
                            </Button>
                          )
                        ) : (
                          <Button 
                            size="small" 
                            onClick={() => {
                              setSelectedWorkshop(workshop);
                              setIsModalOpen(true);
                            }}
                          >
                            Register
                          </Button>
                        )
                      ) : (
                        <Button size="small" onClick={() => handleWatch(workshop)}>
                          Watch Video
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No workshops found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Register for ${selectedWorkshop?.name}`}
      >
        <div className="space-y-4">
          <p className="text-gray-600">Please confirm your registration for this workshop:</p>
          
          <div className="bg-blue-50 p-4 rounded">
            <p><strong>Workshop:</strong> {selectedWorkshop?.name}</p>
            <p><strong>Date:</strong> {selectedWorkshop?.startDate}</p>
            <p><strong>Time:</strong> {selectedWorkshop?.time}</p>
            <p><strong>Speaker:</strong> {selectedWorkshop?.speaker.name}</p>
          </div>
          
          <p className="text-sm text-gray-500">
            By registering, you'll receive email notifications about this workshop, 
            and a certificate of attendance after completion.
          </p>
          
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleRegister(selectedWorkshop)}>
              Confirm Registration
            </Button>
          </div>
        </div>
      </Modal>

      {/* Workshop Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={selectedWorkshop?.name}
      >
        {selectedWorkshop && (
          <div className="space-y-4">
            <p className="text-gray-600">{selectedWorkshop.description}</p>
            
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>Date:</strong> {selectedWorkshop.startDate}</p>
              <p><strong>Time:</strong> {selectedWorkshop.time}</p>
              <p><strong>Format:</strong> {selectedWorkshop.isLive ? 'Live Online Workshop' : 'Pre-recorded Workshop'}</p>
              <p><strong>Registration Required:</strong> {selectedWorkshop.requiresRegistration ? 'Yes' : 'No'}</p>
              <p><strong>Current Attendees:</strong> {selectedWorkshop.attendees}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700">Speaker</h4>
              <p className="font-medium">{selectedWorkshop.speaker.name}</p>
              <p className="text-sm text-gray-600">{selectedWorkshop.speaker.bio}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-700">Workshop Agenda</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedWorkshop.agenda.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
            
            {selectedWorkshop.comments.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-700">Participant Feedback</h4>
                <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded">
                  {selectedWorkshop.comments.map(comment => (
                    <div key={comment.id} className="mb-2">
                      <p className="text-sm font-medium">
                        {comment.user} <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </p>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setIsDetailsModalOpen(false)}>
                Close
              </Button>
              {!selectedWorkshop.registered && selectedWorkshop.requiresRegistration ? (
                <Button 
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    setIsModalOpen(true);
                  }}
                >
                  Register Now
                </Button>
              ) : selectedWorkshop.registered && selectedWorkshop.isLive ? (
                <Button 
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    handleJoinLive(selectedWorkshop);
                  }}
                >
                  Join Live
                </Button>
              ) : !selectedWorkshop.requiresRegistration || (selectedWorkshop.registered && !selectedWorkshop.isLive) ? (
                <Button 
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    handleWatch(selectedWorkshop);
                  }}
                >
                  Watch Video
                </Button>
              ) : null}
            </div>
          </div>
        )}
      </Modal>

      {/* Live Workshop Modal */}
<VideoModal
  isOpen={isLiveModalOpen}
  onClose={() => {
    setIsLiveModalOpen(false);
    setWatchingWorkshop(null);
    setChatMessages([]);
    setWatchingComments([]);
    setNotes('');
    setRating(0);
    setFeedback('');
  }}
  title={watchingWorkshop?.name}
  workshop={watchingWorkshop}
>
  {watchingWorkshop && (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Video Player */}
        <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden">
          <CustomVideoPlayer
            videoId={watchingWorkshop.videoId}
            isLive={watchingWorkshop.isLive}
          />
        </div>
        
        {/* Chat/Comments Section */}
        <div className="h-96 lg:h-auto">
          {watchingWorkshop.isLive ? (
            <ModernChatInterface
              messages={chatMessages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              isLive={true}
            />
          ) : (
            <ModernChatInterface
              messages={watchingComments}
              newMessage=""
              setNewMessage={() => {}}
              handleSendMessage={() => {}}
              isLive={false}
            />
          )}
        </div>
      </div>
      
      {/* Workshop Information */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Workshop Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500"><span className="font-medium">Date:</span> {watchingWorkshop.startDate}</p>
            <p className="text-sm text-gray-500"><span className="font-medium">Time:</span> {watchingWorkshop.time}</p>
            <p className="text-sm text-gray-500"><span className="font-medium">Speaker:</span> {watchingWorkshop.speaker.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500"><span className="font-medium">Status:</span> {watchingWorkshop.isLive ? 'Live Now' : 'Recorded'}</p>
            <p className="text-sm text-gray-500"><span className="font-medium">Attendees:</span> {watchingWorkshop.attendees}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-700">{watchingWorkshop.description}</p>
        </div>
      </div>
      
      {/* Notes */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">My Notes</h3>
          <Button size="small" variant="secondary" onClick={handleSaveNotes}>
            Save Notes
          </Button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-32 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Take notes during the workshop..."
        />
      </div>
      
      {/* Feedback */}
      {!watchingWorkshop.isLive && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Workshop Feedback</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">How would you rate this workshop?</p>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-gray-700">
                {rating > 0 ? `${rating}/5` : 'No rating'}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">Share your thoughts about this workshop:</p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-24 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What did you like or dislike? Do you have suggestions for improvement?"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button 
          variant="secondary" 
          onClick={() => setIsLiveModalOpen(false)}
        >
          Close
        </Button>
        {!watchingWorkshop.isLive && watchingWorkshop.registered && (
          <Button onClick={() => handleDownloadCertificate(watchingWorkshop)}>
            Download Certificate
          </Button>
        )}
      </div>
    </div>
  )}
</VideoModal>

    </div>
  );
};

export default Workshops;