import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

// Dummy data
const dummyCompanies = [
  {
    id: 'COMP-001',
    name: 'Tech Solutions Inc.',
    industry: 'Technology',
    status: 'Pending',
    description: 'Leading tech firm offering software internships.',
  },
  {
    id: 'COMP-002',
    name: 'HealthCare Ltd.',
    industry: 'Healthcare',
    status: 'Pending',
    description: 'Healthcare provider with internship programs.',
  },
];

const CompanyApplications = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCompanies(dummyCompanies);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) &&
      (industryFilter === '' || company.industry === industryFilter)
  );

  const handleAction = (companyId, action) => {
    const updatedCompanies = companies.map((company) =>
      company.id === companyId ? { ...company, status: action } : company
    );
    setCompanies(updatedCompanies);
    console.log(`Company ${companyId} ${action}`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Company Applications</h1>
          <p className="mt-2">Review and manage company applications</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 p-2 border rounded-md"
            />
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full md:w-1/4 p-2 border rounded-md"
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
        </div>

        {/* Company List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Applying Companies</h2>
          {filteredCompanies.length > 0 ? (
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="p-4 bg-gray-50 rounded-md flex justify-between items-center"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <p className="font-medium text-gray-900">{company.name}</p>
                    <p className="text-sm text-gray-600">Industry: {company.industry}</p>
                    <p className="text-sm text-gray-600">Status: {company.status}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleAction(company.id, 'Accepted')}
                      disabled={company.status !== 'Pending'}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleAction(company.id, 'Rejected')}
                      disabled={company.status !== 'Pending'}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No companies found</p>
          )}
        </div>
      </div>

      {/* Modal for Company Details */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedCompany.name}</h2>
            <p className="text-gray-600">Industry: {selectedCompany.industry}</p>
            <p className="text-gray-600 mt-2">Status: {selectedCompany.status}</p>
            <p className="text-gray-600 mt-2">Description: {selectedCompany.description}</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => setSelectedCompany(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyApplications;