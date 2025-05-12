import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

// Dummy workshop data
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
    registered: true
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
    registered: false
  }
];

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setWorkshops(dummyWorkshops);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workshop.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegister = (workshop) => {
    setWorkshops(workshops.map(w => w.id === workshop.id ? { ...w, registered: true } : w));
    setIsModalOpen(false);
  };

  const handleJoinLive = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsLiveModalOpen(true);
    setChatMessages([
      { id: 1, user: 'Alice', message: 'Excited for this workshop!', timestamp: '10:01 AM' },
      { id: 2, user: 'Bob', message: 'Me too!', timestamp: '10:02 AM' }
    ]);
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
    if (rating === 0) {
      return;
    }
    // Simulate feedback submission
    setIsLiveModalOpen(false);
    setRating(0);
    setFeedback('');
  };

  const handleDownloadCertificate = (workshop) => {
    // Simulate certificate download
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Career Workshops</h1>
          <p className="mt-2">Explore and register for upcoming career workshops</p>
        </div>
      </div>

      {/* Main Content */}
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
                <div className="mt-4">
                  {workshop.registered ? (
                    <>
                      {workshop.isLive && (
                        <Button
                          onClick={() => handleJoinLive(workshop)}
                          className="bg-blue-600 text-white hover:bg-blue-700 w-full"
                        >
                          Join Live
                        </Button>
                      )}
                      {!workshop.isLive && (
                        <Button
                          onClick={() => handleDownloadCertificate(workshop)}
                          className="bg-green-600 text-white hover:bg-green-700 w-full"
                        >
                          Download Certificate
                        </Button>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setSelectedWorkshop(workshop);
                        setIsModalOpen(true);
                      }}
                      className="bg-blue-600 text-white hover:bg-blue-700 w-full"
                    >
                      Register
                    </Button>
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

      {/* Register Modal */}
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

      {/* Live Workshop Modal */}
      <Modal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        title={selectedWorkshop?.name}
        size="large"
      >
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Simulated Live Video Stream</p>
              </div>
              <div className="flex justify-between mt-2">
                <Button variant="secondary">Play</Button>
                <Button variant="secondary">Pause</Button>
                <Button variant="secondary">Stop</Button>
              </div>
            </div>
            <div className="w-1/3">
              <h4 className="font-semibold mb-2">Chat</h4>
              <div className="bg-gray-50 h-48 rounded-lg p-2 overflow-y-auto">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="mb-2">
                    <p className="text-sm font-medium">{msg.user} <span className="text-xs text-gray-500">{msg.timestamp}</span></p>
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
