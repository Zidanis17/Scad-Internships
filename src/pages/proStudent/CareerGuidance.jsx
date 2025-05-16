import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastContext';

// Dummy appointment data
const dummyAppointments = [
  {
    id: 1,
    date: '2025-05-12',
    time: '10:00 AM',
    status: 'confirmed',
    purpose: 'Career Path Planning',
    participantId: 'user123',
    participantName: 'John Smith',
    isOnline: true
  },
  {
    id: 2,
    date: '2025-05-15',
    time: '2:00 PM',
    status: 'pending',
    purpose: 'Resume Review',
    participantId: 'user456',
    participantName: 'Emma Johnson',
    isOnline: false
  },
  {
    id: 3,
    date: '2025-05-20',
    time: '11:30 AM',
    status: 'confirmed',
    purpose: 'Internship Report Clarification',
    participantId: 'user789',
    participantName: 'Michael Brown',
    isOnline: true
  }
];

const CareerGuidance = () => {
  const { success, error, info } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    purpose: ''
  });
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  // Reference for auto-scrolling chat
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Simulate API call to get appointments
    setTimeout(() => {
      setAppointments(dummyAppointments);
      setIsLoading(false);
    }, 500);

    // Simulate random incoming call after some time
    const callTimer = setTimeout(() => {
      simulateIncomingCall();
    }, 15000);

    return () => clearTimeout(callTimer);
  }, []);

  // Auto-scroll chat messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const simulateIncomingCall = () => {
    // Only simulate if not already in a call
    if (!isCallActive && !isCallModalOpen && !incomingCall) {
      const randomAppt = dummyAppointments.find(app => app.status === 'confirmed' && app.isOnline);
      if (randomAppt) {
        setIncomingCall(randomAppt);
        info(`Incoming call from ${randomAppt.participantName}`);
      }
    }
  };

  const handleRequestAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.date || !newAppointment.time || !newAppointment.purpose) {
      error('Please fill out all fields');
      return;
    }
    
    // Create a new appointment with generated data
    const newAppointmentWithId = {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'pending',
      participantId: `user${Math.floor(Math.random() * 1000)}`,
      participantName: 'New Student',
      isOnline: Math.random() > 0.5
    };
    
    // Add to appointments list
    setAppointments([...appointments, newAppointmentWithId]);
    setIsRequestModalOpen(false);
    
    // Reset form
    setNewAppointment({ date: '', time: '', purpose: '' });
    
    // Show success message
    success('Appointment requested successfully');

    setTimeout(() =>{
      success('Appointment accepted');
    }, 1000)
  };

  const handleAcceptAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'confirmed' } : app
    ));
    success('Appointment confirmed');
  };

  const handleRejectAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
    info('Appointment declined');
  };

  const handleJoinCall = (appointment) => {
    setActiveAppointment(appointment);
    setIsCallModalOpen(true);
    setIsCallActive(true);
    
    // Reset call settings
    setIsVideoOn(true);
    setIsMuted(false);
    setIsScreenSharing(false);
    setShowChat(false);
    setShowNotes(false);
    setChatMessages([]);
    
    // Add system message
    handleAddSystemMessage(`Connected with ${appointment.participantName}. Your meeting has started.`);
    
    // Simulate the other person joining after a brief delay
    setTimeout(() => {
      handleAddSystemMessage(`${appointment.participantName} has joined the call.`);
    }, 1500);
  };

  const handleAcceptIncomingCall = () => {
    if (incomingCall) {
      handleJoinCall(incomingCall);
      setIncomingCall(null);
    }
  };

  const handleRejectIncomingCall = () => {
    if (incomingCall) {
      info(`Call from ${incomingCall.participantName} declined`);
      setIncomingCall(null);
    }
  };

  const handleLeaveCall = () => {
    // Send notification message
    if (activeAppointment) {
      handleAddSystemMessage(`${activeAppointment.participantName} has left the call.`);
    }
    
    // Clean up
    setTimeout(() => {
      setIsCallModalOpen(false);
      setIsCallActive(false);
      setActiveAppointment(null);
      setIsVideoOn(true);
      setIsMuted(false);
      setIsScreenSharing(false);
      setShowChat(false);
      setShowNotes(false);
    }, 1000);
    
    // Simulate the other person leaving
    error('The other person has left the call.');
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // Simulate notification
    handleAddSystemMessage(`You have ${!isVideoOn ? 'enabled' : 'disabled'} your camera.`);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    // Simulate notification
    handleAddSystemMessage(`You have ${!isMuted ? 'muted' : 'unmuted'} your microphone.`);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // Simulate notification
    handleAddSystemMessage(`You have ${!isScreenSharing ? 'started' : 'stopped'} sharing your screen.`);
  };

  const handleAddSystemMessage = (text) => {
    const newSystemMessage = {
      id: Date.now(),
      sender: 'system',
      text: text,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages(prevMessages => [...prevMessages, newSystemMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    // Create message object
    const message = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Add to chat messages
    setChatMessages(prevMessages => [...prevMessages, message]);
    
    // Clear input
    setNewMessage('');
    
    // Simulate response after delay
    if (activeAppointment) {
      setTimeout(() => {
        const responseMessage = {
          id: Date.now() + 1,
          sender: activeAppointment.participantName,
          text: getRandomResponse(),
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prevMessages => [...prevMessages, responseMessage]);
      }, 1500 + Math.random() * 2000);
    }
  };

  // Get random response for chat simulation
  const getRandomResponse = () => {
    const responses = [
      "That's interesting, could you elaborate?",
      "I see your point.",
      "Thank you for sharing that information.",
      "Let me think about that for a moment.",
      "That's an excellent question.",
      "I'll make a note of that.",
      "Can you share any specific examples?",
      "How do you feel about the progress so far?",
      "Do you have any concerns about the direction we're heading?",
      "I appreciate your perspective on this matter."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
    if (!showChat && showNotes) {
      setShowNotes(false);
    }
  };

  const handleToggleNotes = () => {
    setShowNotes(!showNotes);
    if (!showNotes && showChat) {
      setShowChat(false);
    }
  };

  const handleSaveNotes = () => {
    success('Notes saved successfully');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Career Guidance</h1>
          <p className="mt-2">Request and manage career guidance appointments</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <Button onClick={() => setIsRequestModalOpen(true)} className="bg-blue-600 text-white hover:bg-blue-700">
            Request Appointment
          </Button>
        </div>

        {/* Appointments Section */}
        {appointments.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Appointments</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Date</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Time</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Purpose</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Participant</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Online</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{app.date}</td>
                      <td className="py-3 px-4 text-gray-600">{app.time}</td>
                      <td className="py-3 px-4 text-gray-600">{app.purpose}</td>
                      <td className="py-3 px-4 text-gray-900">{app.participantName}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          app.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block w-3 h-3 rounded-full ${
                          app.isOnline ? 'bg-green-500' : 'bg-gray-300'
                        }`}></span>
                      </td>
                      <td className="py-3 px-4">
                        {app.status === 'pending' ? (
                          <>
                            <Button
                              onClick={() => handleAcceptAppointment(app.id)}
                              className="bg-green-600 text-white hover:bg-green-700 text-sm py-1 px-3 mr-2"
                            >
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleRejectAppointment(app.id)}
                              className="bg-red-600 text-white hover:bg-red-700 text-sm py-1 px-3"
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleJoinCall(app)}
                            className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1 px-3"
                            disabled={!app.isOnline}
                          >
                            Join Call
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No appointments</h3>
            <p className="text-gray-500">Request a new appointment to get started.</p>
          </div>
        )}
      </div>

      {/* Request Appointment Modal */}
      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Request Career Guidance Appointment"
      >
        <form onSubmit={handleRequestAppointment} className="space-y-4">
          <Input
            label="Date"
            type="date"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            required
          />
          <Input
            label="Time"
            type="time"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            required
          />
          <Input
            label="Purpose"
            value={newAppointment.purpose}
            onChange={(e) => setNewAppointment({ ...newAppointment, purpose: e.target.value })}
            placeholder="e.g., Career Path Planning"
            required
          />
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={() => setIsRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Request Appointment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Incoming Call Modal */}
      <Modal
        isOpen={incomingCall !== null}
        onClose={handleRejectIncomingCall}
        title="Incoming Call"
      >
        <div className="p-4 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">
              {incomingCall && `${incomingCall.participantName} is calling...`}
            </h3>
            <p className="text-gray-600 mt-2">
              {incomingCall && `Regarding: ${incomingCall.purpose}`}
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={handleRejectIncomingCall}
              className="bg-red-600 text-white hover:bg-red-700 rounded-full"
            >
              Decline
            </Button>
            <Button 
              onClick={handleAcceptIncomingCall}
              className="bg-green-600 text-white hover:bg-green-700 rounded-full"
            >
              Accept
            </Button>
          </div>
        </div>
      </Modal>

      {/* Video Call Modal */}
      <Modal
        isOpen={isCallModalOpen}
        onClose={handleLeaveCall}
        title={activeAppointment ? `Call with ${activeAppointment.participantName}` : "Career Guidance Call"}
        size="large"
      >
        <div className="space-y-4">
          {/* Video Container */}
          <div className="flex gap-4">
            {/* Main Video */}
            <div className="flex-1">
              <div className="bg-black h-64 rounded-lg flex items-center justify-center overflow-hidden relative">
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="absolute bottom-4 text-white text-xs">Camera Off</span>
                  </div>
                )}
                {isVideoOn && !isScreenSharing && (
                  <iframe 
                    className="w-full h-full object-contain" 
                    src="https://www.youtube.com/embed/OA4JhdNf-DA?controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1" 
                    title="Computer Science with Theatricality" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                )}
                {isScreenSharing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <img 
                      src="https://windows-cdn.softpedia.com/screenshots/Phoenix-Desktop_1.png" 
                      alt="Screen share content" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      Sharing screen
                    </div>
                  </div>
                )}
                
                {/* Self View */}
                {isVideoOn && (
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-gray-900 rounded-md overflow-hidden border-2 border-white shadow-lg">
                    <img 
                      src="https://media.istockphoto.com/id/1339043148/video/focused-handsome-male-freelancer-working-at-desktop-computer-typing-on-wireless-keyboard-and.jpg?s=640x640&k=20&c=eIsA1Pv5GAm39LLF6jegYXcpAuHkwCLLQQ-E5u22upg=" 
                      alt="Self view" 
                      className="w-full h-full object-cover"
                    />
                    {isMuted && (
                      <div className="absolute bottom-1 right-1 bg-red-600 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Chat or Notes Panel */}
            {(showChat || showNotes) && (
              <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md">
                {showChat && (
                  <div className="flex flex-col h-64">
                    <div className="p-2 bg-gray-100 border-b border-gray-200">
                      <h3 className="font-medium text-sm">Chat</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                      {chatMessages.map(msg => (
                        <div key={msg.id} className={`text-sm ${msg.sender === 'system' ? 'text-gray-500 italic text-center text-xs my-1' : msg.sender === 'me' ? 'text-right' : ''}`}>
                          {msg.sender !== 'system' && (
                            <div className="font-medium text-xs">
                              {msg.sender === 'me' ? 'You' : msg.sender}
                              <span className="ml-1 text-gray-400">{msg.timestamp}</span>
                            </div>
                          )}
                          <div className={`inline-block rounded-lg px-2 py-1 ${
                            msg.sender === 'system' 
                              ? '' 
                              : msg.sender === 'me'
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <form onSubmit={handleSendMessage} className="flex">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 text-sm border border-gray-300 rounded-l-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button 
                          type="submit"
                          className="bg-blue-600 text-white rounded-r-md px-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                
                {showNotes && (
                  <div className="flex flex-col h-64">
                    <div className="p-2 bg-gray-100 border-b border-gray-200">
                      <h3 className="font-medium text-sm">Meeting Notes</h3>
                    </div>
                    <div className="flex-1 p-2">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Type your notes here..."
                        className="w-full h-full text-sm border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <Button 
                        onClick={handleSaveNotes}
                        className="w-full bg-blue-600 text-white text-sm"
                      >
                        Save Notes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Call Controls */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={handleToggleVideo}
              className={`${isVideoOn ? 'bg-blue-600' : 'bg-gray-600'} text-white flex items-center gap-1`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isVideoOn ? 
                  "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" : 
                  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"} />
              </svg>
              {isVideoOn ? 'Disable Video' : 'Enable Video'}
            </Button>
            <Button
              onClick={handleToggleMute}
              className={`${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white flex items-center gap-1`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMuted ? 
                  "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" : 
                  "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"} />
                {isMuted && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />}
              </svg>
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button
              onClick={handleToggleScreenShare}
              className={`${isScreenSharing ? 'bg-blue-600' : 'bg-gray-600'} text-white flex items-center gap-1`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            </Button>
            <Button
              onClick={handleToggleChat}
              className={`${showChat ? 'bg-blue-600' : 'bg-gray-600'} text-white flex items-center gap-1`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {showChat ? 'Hide Chat' : 'Open Chat'}
            </Button>
            <Button
              onClick={handleToggleNotes}
              className={`${showNotes ? 'bg-blue-600' : 'bg-gray-600'} text-white flex items-center gap-1`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {showNotes ? 'Hide Notes' : 'Open Notes'}
            </Button>
            <Button
              onClick={handleLeaveCall}
              className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              End Call
            </Button>
          </div>
          
          {/* Call Details and Info */}
          {activeAppointment && (
            <div className="text-sm text-gray-600 text-center mt-2">
              <p>
                Purpose: <span className="font-medium">{activeAppointment.purpose}</span> • 
                Start time: <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </p>
            </div>
          )}
        </div>
      </Modal>
      
      {/* Statistics Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800">Upcoming Appointments</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {appointments.filter(app => app.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h3 className="text-lg font-medium text-green-800">Completed Sessions</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">12</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="text-lg font-medium text-purple-800">Pending Requests</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {appointments.filter(app => app.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Log */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="text-gray-900">New appointment requested by <span className="font-medium">Michael Brown</span></p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="text-gray-900">Call completed with <span className="font-medium">Emma Johnson</span></p>
              <p className="text-sm text-gray-500">Yesterday at 3:45 PM</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-1">
              <p className="text-gray-900">Missed call from <span className="font-medium">John Smith</span></p>
              <p className="text-sm text-gray-500">Yesterday at 11:20 AM</p>
            </div>
          </div>

        </div>
      </div>
      
     
      
      {/* Help Modal - Could be triggered by a help button */}
      <Modal
        isOpen={false} // Set to true when help button is clicked
        onClose={() => {}} // Function to close help modal
        title="Video Call Features Guide"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg">Basic Controls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Enable/disable your camera with the video button</li>
              <li>Mute/unmute your microphone with the audio button</li>
              <li>Share your screen to show documents or presentations</li>
              <li>End the call by clicking the red hang up button</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg">Collaboration Tools</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>Open the chat panel to exchange messages during the call</li>
              <li>Use the notes feature to document important points</li>
              <li>Save notes after the call for future reference</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-lg">Troubleshooting</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
              <li>If video isn't working, try refreshing the page</li>
              <li>Audio issues? Check your device settings</li>
              <li>For technical support, contact IT help desk</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CareerGuidance;