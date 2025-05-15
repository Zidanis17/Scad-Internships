import React, { useState, useEffect } from 'react';
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
    purpose: 'Career Path Planning'
  },
  {
    id: 2,
    date: '2025-05-15',
    time: '2:00 PM',
    status: 'pending',
    purpose: 'Resume Review'
  }
];

const CareerGuidance = () => {
  const { error } = useToast();
  const [appointments, setAppointments] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    purpose: ''
  });
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments(dummyAppointments);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleRequestAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.date || !newAppointment.time || !newAppointment.purpose) {
      return;
    }
    setAppointments([...appointments, {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'pending'
    }]);
    setIsRequestModalOpen(false);
    setNewAppointment({ date: '', time: '', purpose: '' });
  };

  const handleAcceptAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'confirmed' } : app
    ));
  };

  const handleRejectAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const handleJoinCall = (appointment) => {
    setIsCallModalOpen(true);
    // Simulate incoming call notification
    setTimeout(() => {
      error('The other person has left the call.');
    }, 1000);
  };

  const handleLeaveCall = () => {
    setIsCallModalOpen(false);
    setIsVideoOn(true);
    setIsMuted(false);
    setIsScreenSharing(false);
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
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{app.date}</td>
                      <td className="py-3 px-4 text-gray-600">{app.time}</td>
                      <td className="py-3 px-4 text-gray-600">{app.purpose}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          app.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
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

      {/* Video Call Modal */}
      <Modal
        isOpen={isCallModalOpen}
        onClose={handleLeaveCall}
        title="Career Guidance Call"
        size="large"
      >
        <div className="space-y-4">
          <div className="bg-black h-64 rounded-lg flex items-center justify-center overflow-hidden">
            <iframe 
              className="w-full h-full object-contain" 
              width="640" 
              height="360" 
              src="https://www.youtube.com/embed/OA4JhdNf-DA?controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1" 
              title="Computer Science with Theatricality - Illinois Computer Science Teaching Workshop 2021" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={isVideoOn ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}
            >
              {isVideoOn ? 'Disable Video' : 'Enable Video'}
            </Button>
            <Button
              onClick={() => setIsMuted(!isMuted)}
              className={isMuted ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
            <Button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}
            >
              {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
            </Button>
            <Button onClick={handleLeaveCall} className="bg-red-600 text-white hover:bg-red-700">
              Leave Call
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CareerGuidance;