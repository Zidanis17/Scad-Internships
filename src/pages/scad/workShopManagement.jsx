import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import { useToast } from '../../components/common/ToastContext';

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
    registeredUsers: 15
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
    registeredUsers: 8
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
    registeredUsers: 0
  }
];

const WorkshopManagement = () => {
  const [workshops, setWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    time: '',
    speaker: '',
    isLive: false,
    requiresRegistration: false,
    videoId: ''
  });
  const toast = useToast();

  useEffect(() => {
    // Simulate fetching data from API
    setTimeout(() => {
      setWorkshops(dummyWorkshops);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCreateWorkshop = () => {
    setCurrentWorkshop(null);
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      time: '',
      speaker: '',
      isLive: false,
      requiresRegistration: false,
      videoId: ''
    });
    setIsModalOpen(true);
  };

  const handleEditWorkshop = (workshop) => {
    setCurrentWorkshop(workshop);
    setFormData({
      name: workshop.name,
      description: workshop.description,
      startDate: workshop.startDate,
      endDate: workshop.endDate,
      time: workshop.time,
      speaker: workshop.speaker,
      isLive: workshop.isLive,
      requiresRegistration: workshop.requiresRegistration,
      videoId: workshop.videoId
    });
    setIsModalOpen(true);
  };

  const handleDeleteWorkshop = (workshop) => {
    setCurrentWorkshop(workshop);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!currentWorkshop) return;
    
    // Filter out the workshop to delete
    const updatedWorkshops = workshops.filter(w => w.id !== currentWorkshop.id);
    setWorkshops(updatedWorkshops);
    setIsDeleteModalOpen(false);
    toast.success(`Workshop "${currentWorkshop.name}" has been deleted`);
  };

  const saveWorkshop = () => {
    // Validate required fields
    if (!formData.name || !formData.startDate || !formData.speaker) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (currentWorkshop) {
      // Update existing workshop
      const updatedWorkshops = workshops.map(w => 
        w.id === currentWorkshop.id ? { ...w, ...formData } : w
      );
      setWorkshops(updatedWorkshops);
      toast.success(`Workshop "${formData.name}" has been updated`);
    } else {
      // Create new workshop
      const newWorkshop = {
        id: Date.now(), // Simple ID generation
        ...formData,
        registeredUsers: 0
      };
      setWorkshops([...workshops, newWorkshop]);
      toast.success(`Workshop "${formData.name}" has been created`);
    }
    
    setIsModalOpen(false);
  };

  const filteredWorkshops = workshops.filter(workshop =>
    workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workshop.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { title: 'Name', dataKey: 'name' },
    { title: 'Date', render: (row) => row.startDate },
    { title: 'Time', dataKey: 'time' },
    { title: 'Speaker', dataKey: 'speaker' },
    { 
      title: 'Registration',
      render: (row) => row.requiresRegistration ? `Required (${row.registeredUsers})` : 'Not Required'
    },
    { 
      title: 'Status',
      render: (row) => row.isLive ? 'Live' : 'Recorded'
    },
    {
      title: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button size="small" onClick={() => handleEditWorkshop(row)}>Edit</Button>
          <Button size="small" variant="danger" onClick={() => handleDeleteWorkshop(row)}>Delete</Button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Workshop Management</h1>
          <p className="mt-2">Create, edit, and manage career workshops</p>
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
            <Button onClick={handleCreateWorkshop}>
              Create New Workshop
            </Button>
          </div>
        </div>

        {filteredWorkshops.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table columns={columns} data={filteredWorkshops} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No workshops found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new workshop</p>
          </div>
        )}
      </div>

      {/* Create/Edit Workshop Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentWorkshop ? `Edit Workshop: ${currentWorkshop.name}` : 'Create New Workshop'}
      >
        <div className="space-y-4">
          <Input
            label="Workshop Name *"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter workshop name"
          />
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter workshop description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date *"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          
          <Input
            label="Time *"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            placeholder="e.g. 10:00 AM - 12:00 PM"
          />
          
          <Input
            label="Speaker *"
            name="speaker"
            value={formData.speaker}
            onChange={handleInputChange}
            placeholder="Enter speaker name"
          />
          
          
          
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isLive"
                name="isLive"
                checked={formData.isLive}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="isLive" className="text-gray-700">Live Workshop</label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requiresRegistration"
                name="requiresRegistration"
                checked={formData.requiresRegistration}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="requiresRegistration" className="text-gray-700">Requires Registration</label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveWorkshop}>
              {currentWorkshop ? 'Update Workshop' : 'Create Workshop'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete the workshop "{currentWorkshop?.name}"? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Workshop
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkshopManagement;