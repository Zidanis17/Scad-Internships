import React, { useState, useEffect } from 'react';
import ReportCard from './ReportCard';
import Input from '../common/Input';
import Button from '../common/Button';

const ReportList = ({ reports: initialReports, userRole, onViewReport, onEditReport }) => {
  const [reports, setReports] = useState(initialReports || []);
  const [filteredReports, setFilteredReports] = useState(initialReports || []);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    major: 'all',
    sortBy: 'date'
  });

  // List of all possible majors for filtering (from the reports)
  const majors = [...new Set(reports.map(report => report.major))];

  useEffect(() => {
    // Apply filters whenever filters or reports change
    const filtered = reports.filter(report => {
      // Search filter (case insensitive)
      const searchMatch = report.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                          report.companyName.toLowerCase().includes(filters.search.toLowerCase());
      
      // Status filter
      const statusMatch = filters.status === 'all' || report.status === filters.status;
      
      // Major filter
      const majorMatch = filters.major === 'all' || report.major === filters.major;
      
      return searchMatch && statusMatch && majorMatch;
    });

    // Sort the filtered reports
    const sorted = [...filtered].sort((a, b) => {
      if (filters.sortBy === 'date') {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      } else if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (filters.sortBy === 'company') {
        return a.companyName.localeCompare(b.companyName);
      }
      return 0;
    });

    setFilteredReports(sorted);
  }, [filters, reports]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Filter Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Search"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by title or company..."
          />
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border rounded p-2 w-full"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          
          {(userRole === 'faculty' || userRole === 'scadOffice') && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Major</label>
              <select
                name="major"
                value={filters.major}
                onChange={handleFilterChange}
                className="border rounded p-2 w-full"
              >
                <option value="all">All Majors</option>
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="border rounded p-2 w-full"
            >
              <option value="date">Submission Date</option>
              <option value="title">Title</option>
              <option value="company">Company Name</option>
            </select>
          </div>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No reports found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              userRole={userRole}
              onView={onViewReport}
              onEdit={onEditReport}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;