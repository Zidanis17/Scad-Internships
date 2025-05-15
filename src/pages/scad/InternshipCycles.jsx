import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

// Dummy data for internship cycles
const dummyCycles = [
  {
    id: 1,
    name: 'Summer 2025',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    status: 'active',
    applicationsCount: 50
  },
  {
    id: 2,
    name: 'Fall 2025',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    status: 'upcoming',
    applicationsCount: 0
  }
];

const InternshipCycles = () => {
  const [cycles, setCycles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    startDate: '',
    endDate: '',
    status: 'upcoming'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCycles(dummyCycles);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCycles = cycles.filter(
    cycle =>
      cycle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cycle.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (cycle = null) => {
    setFormData(
      cycle
        ? { ...cycle }
        : { id: null, name: '', startDate: '', endDate: '', status: 'upcoming' }
    );
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveCycle = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      return;
    }
    if (formData.id) {
      // Update existing cycle
      setCycles(
        cycles.map(cycle =>
          cycle.id === formData.id ? { ...formData, applicationsCount: cycle.applicationsCount } : cycle
        )
      );
    } else {
      // Create new cycle
      setCycles([...cycles, { ...formData, id: cycles.length + 1, applicationsCount: 0 }]);
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Internship Cycles</h1>
          <p className="mt-2">Manage internship cycles</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
          <Input
            placeholder="Search by cycle name or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/3"
          />
          <Button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Cycle
          </Button>
        </div>

        {filteredCycles.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cycles</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Cycle Name</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Start Date</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">End Date</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Applications</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCycles.map((cycle) => (
                    <tr key={cycle.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{cycle.name}</td>
                      <td className="py-3 px-4 text-gray-600">{cycle.startDate}</td>
                      <td className="py-3 px-4 text-gray-600">{cycle.endDate}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            cycle.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {cycle.status.charAt(0).toUpperCase() + cycle.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{cycle.applicationsCount}</td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => handleOpenModal(cycle)}
                          className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1 px-3"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No cycles found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new cycle</p>
          </div>
        )}
      </div>

      {/* Create/Edit Cycle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Cycle' : 'Create Cycle'}
      >
        <div className="space-y-4">
          <Input
            label="Cycle Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCycle}>
              {formData.id ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InternshipCycles;