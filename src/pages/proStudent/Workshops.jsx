import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import CustomVideoPlayer from '../../components/common/CustomVideoPlayer';

const dummyWorkshops = [
  {
    id: 1,
    name: 'Advanced React Patterns',
    description: 'Learn advanced React patterns and best practices for building scalable applications.',
    startDate: '2025-05-15',
    endDate: '2025-05-15',
    time: '10:00 AM - 12:00 PM',
    speaker: 'John Doe',
    isLive: true,
    requiresRegistration: true,
    registered: true,
    videoId: 'CMwXHvSfJxk',
    comments: []
  },
  {
    id: 2,
    name: 'Technical Interview Preparation',
    description: 'Prepare for technical interviews with coding challenges and mock interviews.',
    startDate: '2025-05-20',
    endDate: '2025-05-20',
    time: '2:00 PM - 4:00 PM',
    speaker: 'Jane Smith',
    isLive: false,
    requiresRegistration: true,
    registered: false,
    videoId: 'M7lc1UVf-VE',
    comments: [
      { id: 1, user: 'User1', message: 'Great workshop!', timestamp: '2025-05-21' },
      { id: 2, user: 'User2', message: 'Very informative.', timestamp: '2025-05-22' }
    ]
  },
  {
    id: 3,
    name: 'Introduction to Machine Learning',
    description: 'Get started with the basics of machine learning and its applications.',
    startDate: '2025-05-25',
    endDate: '2025-05-25',
    time: '1:00 PM - 3:00 PM',
    speaker: 'Emily Johnson',
    isLive: false,
    requiresRegistration: false,
    registered: false,
    videoId: 'ukzFI9rgwfU',
    comments: [
      { id: 1, user: 'User3', message: 'Loved the examples!', timestamp: '2025-05-26' },
      { id: 2, user: 'User4', message: 'Clear explanations.', timestamp: '2025-05-27' }
    ]
  }
];

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      setWorkshops(dummyWorkshops);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleRegister = (workshop) => {
    setWorkshops(workshops.map(w => w.id === workshop.id ? { ...w, registered: true } : w));
    setIsModalOpen(false);
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
    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      user: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) return;
    console.log(`Feedback for ${watchingWorkshop?.name}: Rating ${rating}, Feedback: ${feedback}`);
    setIsLiveModalOpen(false);
    setRating(0);
    setFeedback('');
  };

  const handleDownloadCertificate = (workshop) => {
    const certificateContent = `Certificate of Completion\n\nThis is to certify that [User Name] has completed the workshop "${workshop.name}" on ${workshop.endDate}.\n\nSpeaker: ${workshop.speaker}`;
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workshop.name}_certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workshop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Career Workshops</h1>
          <p className="mt-2">Explore and register for upcoming career workshops</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search workshops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <div key={workshop.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800">{workshop.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{workshop.description}</p>
                <p className="text-sm text-gray-500 mt-2">Date: {workshop.startDate}</p>
                <p className="text-sm text-gray-500">Time: {workshop.time}</p>
                <p className="text-sm text-gray-500">Speaker: {workshop.speaker}</p>
                <div className="mt-4 flex space-x-2">
                  {workshop.requiresRegistration ? (
                    workshop.registered ? (
                      workshop.isLive ? (
                        <Button onClick={() => handleJoinLive(workshop)}>Join Live</Button>
                      ) : (
                        <Button onClick={() => handleDownloadCertificate(workshop)}>Download Certificate</Button>
                      )
                    ) : (
                      <Button onClick={() => {
                        setSelectedWorkshop(workshop);
                        setIsModalOpen(true);
                      }}>Register</Button>
                    )
                  ) : (
                    <Button onClick={() => handleWatch(workshop)}>Watch Video</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No workshops found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Register for ${selectedWorkshop?.name}`}
      >
        <div className="space-y-4">
          <p className="text-gray-600">Confirm your registration for this workshop.</p>
          <p><strong>Date:</strong> {selectedWorkshop?.startDate}</p>
          <p><strong>Time:</strong> {selectedWorkshop?.time}</p>
          <p><strong>Speaker:</strong> {selectedWorkshop?.speaker}</p>
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

      <Modal
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
        size="large"
      >
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <CustomVideoPlayer
                videoId={watchingWorkshop?.videoId}
                isLive={watchingWorkshop?.isLive}
              />
            </div>
            <div className="w-1/3">
              {watchingWorkshop?.isLive ? (
                <>
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <div className="bg-gray-50 h-48 rounded-lg p-2 overflow-y-auto">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="mb-2">
                        <p className="text-sm font-medium">
                          {msg.user} <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </p>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="ml-2">
                      Send
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="font-semibold mb-2">Comments</h4>
                  <div className="bg-gray-50 h-48 rounded-lg p-2 overflow-y-auto">
                    {watchingComments.map((comment) => (
                      <div key={comment.id} className="mb-2">
                        <p className="text-sm font-medium">
                          {comment.user} <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </p>
                        <p className="text-sm">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Notes</h4>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-24 border rounded p-2"
              placeholder="Take notes here..."
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rate This Workshop</h4>
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-24 border rounded p-2"
              placeholder="Share your feedback..."
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Workshops;