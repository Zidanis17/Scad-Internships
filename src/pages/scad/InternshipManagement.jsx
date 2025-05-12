import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

// Dummy data
const dummyInternships = [
  {
    id: 'INT-001',
    title: 'Software Engineer Intern',
    company: 'Tech Solutions Inc.',
    industry: 'Technology',
    duration: '3 months',
    paid: true,
    description: 'Develop web applications using React and Node.js.',
  },
  {
    id: 'INT-002',
    title: 'Medical Intern',
    company: 'HealthCare Ltd.',
    industry: 'Healthcare',
    duration: '6 months',
    paid: false,
    description: 'Assist in patient care and medical research.',
  },
];

const InternshipManagement = () => {
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ industry: '', duration: '', paid: '' });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInternships(dummyInternships);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredInternships = internships.filter(
    (internship) =>
      (internship.title.toLowerCase().includes(search.toLowerCase()) ||
        internship.company.toLowerCase().includes(search.toLowerCase())) &&
      (filters.industry === '' || internship.industry === filters.industry) &&
      (filters.duration === '' || internship.duration === filters.duration) &&
      (filters.paid === '' || internship.paid === (filters.paid === 'Paid'))
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Internship Management</h1>
          <p className="mt-2">View and manage available internships</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by job title or company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded-md"
            />
            <select
              value={filters.industry}
              onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
              className="w-full md:w-1/4 p-2 border rounded-md"
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
            </select>
            <select
              value={filters.duration}
              onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
              className="w-full md:w-1/4 p-2 border rounded-md"
            >
              <option value="">All Durations</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>
            <select
              value={filters.paid}
              onChange={(e) => setFilters({ ...filters, paid: e.target.value })}
              className="w-full md:w-1/4 p-2 border rounded-md"
            >
              <option value="">All Payment Types</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {/* Internship List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Internships</h2>
          {filteredInternships.length > 0 ? (
            <div className="space-y-4">
              {filteredInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="p-4 bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => setSelectedInternship(internship)}
                >
                  <p className="font-medium text-gray-900">{internship.title}</p>
                  <p className="text-sm text-gray-600">Company: {internship.company}</p>
                  <p className="text-sm text-gray-600">Industry: {internship.industry}</p>
                  <p className="text-sm text-gray-600">Duration: {internship.duration}</p>
                  <p className="text-sm text-gray-600">Payment: {internship.paid ? 'Paid' : 'Unpaid'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No internships found</p>
          )}
        </div>
      </div>

      {/* Modal for Internship Details */}
      {selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedInternship.title}</h2>
            <p className="text-gray-600">Company: {selectedInternship.company}</p>
            <p className="text-gray-600 mt-2">Industry: {selectedInternship.industry}</p>
            <p className="text-gray-600 mt-2">Duration: {selectedInternship.duration}</p>
            <p className="text-gray-600 mt-2">Payment: {selectedInternship.paid ? 'Paid' : 'Unpaid'}</p>
            <p className="text-gray-600 mt-2">Description: {selectedInternship.description}</p>
            <div className="flex justify-end mt-4">
              <Button variant="secondary" onClick={() => setSelectedInternship(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipManagement;