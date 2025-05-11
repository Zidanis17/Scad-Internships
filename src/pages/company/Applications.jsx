import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';

// Dummy data for applications
const dummyApplicationsData = [
  {
    id: 1,
    studentName: 'Ahmed Hassan',
    studentId: 'STU-5432',
    major: 'Computer Science',
    semester: 7,
    position: 'Software Engineering Intern',
    internshipId: 1,
    appliedDate: '2025-05-10',
    status: 'Pending',
    skills: ['JavaScript', 'React', 'Node.js'],
    gpa: 3.8,
    coverLetter: 'I am excited to apply for this position as I have relevant experience...',
    documents: [
      { id: 1, name: 'CV.pdf', type: 'pdf', size: '1.2 MB' },
      { id: 2, name: 'Project Portfolio.pdf', type: 'pdf', size: '3.5 MB' }
    ],
    contactEmail: 'ahmed.hassan@student.guc.edu.eg',
    contactPhone: '+20 123-456-7890'
  },
  {
    id: 2,
    studentName: 'Sara Mohamed',
    studentId: 'STU-5433',
    major: 'Business Informatics',
    semester: 6,
    position: 'UI/UX Design Intern',
    internshipId: 2,
    appliedDate: '2025-05-09',
    status: 'Finalized',
    skills: ['Figma', 'Adobe XD', 'UI/UX', 'CSS'],
    gpa: 3.5,
    coverLetter: 'My passion for UI/UX design and my strong design portfolio makes me...',
    documents: [
      { id: 3, name: 'CV.pdf', type: 'pdf', size: '0.9 MB' },
      { id: 4, name: 'Design Portfolio.pdf', type: 'pdf', size: '5.2 MB' }
    ],
    contactEmail: 'sara.mohamed@student.guc.edu.eg',
    contactPhone: '+20 123-456-7891'
  },
  {
    id: 3,
    studentName: 'Yousef Ali',
    studentId: 'STU-5434',
    major: 'Computer Engineering',
    semester: 8,
    position: 'Software Engineering Intern',
    internshipId: 1,
    appliedDate: '2025-05-08',
    status: 'Finalized',
    skills: ['Java', 'Spring Boot', 'Docker', 'APIs'],
    gpa: 3.9,
    coverLetter: 'With my strong backend development skills and experience with...',
    documents: [
      { id: 5, name: 'CV.pdf', type: 'pdf', size: '1.1 MB' },
      { id: 6, name: 'GitHub Projects.pdf', type: 'pdf', size: '2.3 MB' }
    ],
    contactEmail: 'yousef.ali@student.guc.edu.eg',
    contactPhone: '+20 123-456-7892'
  },
  {
    id: 4,
    studentName: 'Nour Ahmed',
    studentId: 'STU-5435',
    major: 'Computer Science',
    semester: 7,
    position: 'Data Analysis Intern',
    internshipId: 3,
    appliedDate: '2025-05-07',
    status: 'Accepted',
    skills: ['Python', 'SQL', 'Excel', 'Data Visualization'],
    gpa: 3.7,
    coverLetter: 'I am passionate about data analytics and have completed several projects...',
    documents: [
      { id: 7, name: 'CV.pdf', type: 'pdf', size: '1.0 MB' },
      { id: 8, name: 'Data Projects.pdf', type: 'pdf', size: '4.1 MB' }
    ],
    contactEmail: 'nour.ahmed@student.guc.edu.eg',
    contactPhone: '+20 123-456-7893'
  },
  {
    id: 5,
    studentName: 'Laila Khaled',
    studentId: 'STU-5436',
    major: 'Media Engineering',
    semester: 6,
    position: 'UI/UX Design Intern',
    internshipId: 2,
    appliedDate: '2025-05-06',
    status: 'Rejected',
    skills: ['Photoshop', 'Illustrator', 'UI Design'],
    gpa: 3.2,
    coverLetter: 'I believe my creative skills and attention to detail would make me...',
    documents: [
      { id: 9, name: 'CV.pdf', type: 'pdf', size: '1.3 MB' },
      { id: 10, name: 'Portfolio.pdf', type: 'pdf', size: '6.8 MB' }
    ],
    contactEmail: 'laila.khaled@student.guc.edu.eg',
    contactPhone: '+20 123-456-7894'
  },
  {
    id: 6,
    studentName: 'Omar Ibrahim',
    studentId: 'STU-5437',
    major: 'Computer Science',
    semester: 8,
    position: 'Data Analysis Intern',
    internshipId: 3,
    appliedDate: '2025-05-05',
    status: 'Pending',
    skills: ['R', 'Python', 'Machine Learning', 'Statistics'],
    gpa: 3.6,
    coverLetter: 'With my strong statistical background and programming skills...',
    documents: [
      { id: 11, name: 'CV.pdf', type: 'pdf', size: '1.1 MB' },
      { id: 12, name: 'ML Projects.pdf', type: 'pdf', size: '3.7 MB' }
    ],
    contactEmail: 'omar.ibrahim@student.guc.edu.eg',
    contactPhone: '+20 123-456-7895'
  }
];

// Dummy internship posts data
const dummyInternshipPosts = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    duration: '3 months',
    isPaid: true,
    salary: '8000 EGP/month'
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    duration: '4 months',
    isPaid: true,
    salary: '7500 EGP/month'
  },
  {
    id: 3,
    title: 'Data Analysis Intern',
    duration: '2 months',
    isPaid: false
  }
];

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [internshipPosts, setInternshipPosts] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [internshipFilter, setInternshipFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('appliedDate');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    // Simulate API calls with dummy data
    setApplications(dummyApplicationsData);
    setFilteredApplications(dummyApplicationsData);
    setInternshipPosts(dummyInternshipPosts);

    // Check if a specific post ID was passed in the URL
    const postId = searchParams.get('post');
    if (postId) {
      setInternshipFilter(parseInt(postId));
    }
  }, [searchParams]);

  useEffect(() => {
    // Apply filters and search when any filtering criteria changes
    let result = applications;

    // Apply internship filter
    if (internshipFilter !== 'all') {
      result = result.filter(app => app.internshipId === parseInt(internshipFilter));
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(app => app.status === statusFilter);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.studentName.toLowerCase().includes(term) || 
        app.studentId.toLowerCase().includes(term) ||
        app.major.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      let comparison = 0;
      if (a[sortField] > b[sortField]) {
        comparison = 1;
      } else if (a[sortField] < b[sortField]) {
        comparison = -1;
      }
      return sortDirection === 'desc' ? comparison * -1 : comparison;
    });

    setFilteredApplications(result);
  }, [applications, statusFilter, internshipFilter, searchTerm, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (applicationId, newStatus) => {
    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setApplications(updatedApplications);
    
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalized':
        return 'bg-blue-100 text-blue-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const resetFilters = () => {
    setStatusFilter('all');
    setInternshipFilter('all');
    setSearchTerm('');
    setSortField('appliedDate');
    setSortDirection('desc');
  };

  // Adjust columns to match your Table component's expected format
  const columns = [
    { title: 'Student', dataKey: 'studentName' },
    { title: 'Major', dataKey: 'major' },
    { 
      title: 'Position', 
      dataKey: 'position',
      render: (row) => {
        const internship = internshipPosts.find(post => post.id === row.internshipId);
        return (
          <div>
            <div className="font-medium">{row.position}</div>
            <div className="text-xs text-gray-500">
              {internship ? `${internship.duration} | ${internship.isPaid ? `Paid: ${internship.salary}` : 'Unpaid'}` : ''}
            </div>
          </div>
        );
      }
    },
    { title: 'Applied Date', dataKey: 'appliedDate' },
    { 
      title: 'Status', 
      dataKey: 'status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(row.status)}`}>
          {row.status}
        </span>
      )
    },
    {
      title: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Button 
            variant="primary"
            onClick={() => {
              setSelectedApplication(row);
              setIsModalOpen(true);
            }}
          >
            View Details
          </Button>
        </div>
      )
    }
  ];

  const renderApplicationDetails = () => {
    if (!selectedApplication) return null;
    
    const internship = internshipPosts.find(post => post.id === selectedApplication.internshipId);
    
    return (
      <div className="space-y-6 max-w-full max-h-[80vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between pb-6 border-b border-gray-200">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">{selectedApplication.studentName}</h3>
            <p className="text-lg text-indigo-600">{selectedApplication.position}</p>
            <p className="text-gray-600">{selectedApplication.major} | Semester {selectedApplication.semester} | GPA: {selectedApplication.gpa}</p>
            <p className="text-gray-500 text-sm">Student ID: {selectedApplication.studentId}</p>
          </div>
          <div className="space-y-2">
            <span 
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeClass(selectedApplication.status)}`}
            >
              {selectedApplication.status}
            </span>
            <p className="text-sm text-gray-500 text-right">Applied on: {selectedApplication.appliedDate}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Internship Details</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Position:</span>
                <span className="md:text-right">{selectedApplication.position}</span>
              </p>
              {internship && (
                <>
                  <p className="flex flex-col md:flex-row md:justify-between">
                    <span className="font-medium text-gray-600">Duration:</span>
                    <span className="md:text-right">{internship.duration}</span>
                  </p>
                  <p className="flex flex-col md:flex-row md:justify-between">
                    <span className="font-medium text-gray-600">Compensation:</span>
                    <span className="md:text-right">{internship.isPaid ? internship.salary : 'Unpaid'}</span>
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Contact Information</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="md:text-right break-all">{selectedApplication.contactEmail}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="md:text-right">{selectedApplication.contactPhone}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {selectedApplication.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Cover Letter</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">{selectedApplication.coverLetter}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Documents</h4>
          <div className="space-y-2">
            {selectedApplication.documents.map(doc => (
              <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center flex-1 min-w-0">
                  <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 truncate">{doc.name}</span>
                </div>
                <div className="flex items-center flex-shrink-0 ml-4">
                  <span className="text-xs text-gray-500 mr-3">{doc.size}</span>
                  <Button 
                    variant="primary" 
                    size="small"
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status update buttons */}
        {selectedApplication.status !== 'Accepted' && selectedApplication.status !== 'Rejected' && (
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-700 mb-3">Update Application Status</h4>
            <div className="flex flex-wrap gap-2">
              {selectedApplication.status !== 'Finalized' && (
                <Button 
                  variant="primary"
                  onClick={() => handleStatusChange(selectedApplication.id, 'Finalized')}
                >
                  Mark as Finalized
                </Button>
              )}
              <Button 
                variant="primary" 
                className="bg-green-500 hover:bg-green-600"
                onClick={() => handleStatusChange(selectedApplication.id, 'Accepted')}
              >
                Accept Application
              </Button>
              <Button 
                variant="danger"
                onClick={() => handleStatusChange(selectedApplication.id, 'Rejected')}
              >
                Reject Application
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="mt-2">Review and manage student applications for your internship positions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search by student name or ID..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="internship" className="block text-sm font-medium text-gray-700 mb-1">Internship Position</label>
              <select
                id="internship"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={internshipFilter}
                onChange={(e) => setInternshipFilter(e.target.value)}
              >
                <option value="all">All Positions</option>
                {internshipPosts.map(post => (
                  <option key={post.id} value={post.id}>{post.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Finalized">Finalized</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="secondary"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Applications ({filteredApplications.length})</h2>
            </div>
          </div>
          {filteredApplications.length > 0 ? (
            <Table
              columns={columns}
              data={filteredApplications}
            />
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {isModalOpen && selectedApplication && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Application Details"
          size="lg"
          footer={
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          }
        >
          {renderApplicationDetails()}
        </Modal>
      )}
    </div>
  );
};

export default Applications;