import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import EvaluationForm from '../../components/evaluation/EvaluationForm';

// Dummy data for interns with sample evaluation data
const companyName = "Tech Solutions Inc.";

const dummyInterns = [
  {
    id: 1,
    name: 'Omar Ibrahim',
    major: 'Computer Science',
    position: 'Software Engineering Intern',
    startDate: '2025-04-01',
    endDate: '2025-07-01',
    progress: 50,
    skills: ['JavaScript', 'React', 'Node.js'],
    supervisor: 'Ahmed Mahmoud',
    status: 'current',
    evaluated: false,
    contactEmail: 'omar.ibrahim@student.guc.edu.eg',
    phone: '+20 123-456-7890',
    applications: [
      {
        id: 101,
        position: 'Software Engineering Intern',
        applyDate: '2025-03-15',
        status: 'Accepted'
      }
    ]
  },
  {
    id: 2,
    name: 'Nour Ahmed',
    major: 'Business Informatics',
    position: 'Data Analysis Intern',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    progress: 75,
    skills: ['SQL', 'Excel', 'Python', 'Data Visualization'],
    supervisor: 'Hossam Ali',
    status: 'current',
    evaluated: false,
    contactEmail: 'nour.ahmed@student.guc.edu.eg',
    phone: '+20 123-456-7891',
    applications: [
      {
        id: 102,
        position: 'Data Analysis Intern',
        applyDate: '2025-03-01',
        status: 'Accepted'
      }
    ]
  },
  {
    id: 3,
    name: 'Mariam Ali',
    major: 'Computer Engineering',
    position: 'UI/UX Design Intern',
    startDate: '2025-02-01',
    endDate: '2025-05-01',
    progress: 100,
    skills: ['Figma', 'Adobe XD', 'UI/UX Design', 'Prototyping'],
    supervisor: 'Laila Hassan',
    status: 'completed',
    evaluated: false,
    contactEmail: 'mariam.ali@student.guc.edu.eg',
    phone: '+20 123-456-7892',
    applications: [
      {
        id: 103,
        position: 'UI/UX Design Intern',
        applyDate: '2025-01-15',
        status: 'Accepted'
      }
    ]
  },
  {
    id: 4,
    name: 'Yousef Mahmoud',
    major: 'Computer Science',
    position: 'Mobile Development Intern',
    startDate: '2025-01-15',
    endDate: '2025-04-15',
    progress: 100,
    skills: ['Flutter', 'Dart', 'Firebase', 'Git'],
    supervisor: 'Mohamed Nasser',
    status: 'completed',
    evaluated: true,
    evaluation: {
      rating: 4,
      strengths: 'Excellent mobile development skills',
      areasForImprovement: 'Could improve documentation habits',
      comments: 'A reliable and skilled intern',
      recommended: true
    },
    contactEmail: 'yousef.mahmoud@student.guc.edu.eg',
    phone: '+20 123-456-7893',
    applications: [
      {
        id: 104,
        position: 'Mobile Development Intern',
        applyDate: '2025-01-01',
        status: 'Accepted'
      }
    ]
  }
];

const Interns = () => {
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInterns(dummyInterns);
      setFilteredInterns(dummyInterns);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Filter interns based on search term and status
    let filtered = interns;
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(intern => 
        intern.name.toLowerCase().includes(term) || 
        intern.position.toLowerCase().includes(term)
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(intern => intern.status === statusFilter);
    }
    
    setFilteredInterns(filtered);
  }, [searchTerm, statusFilter, interns]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleCompleteInternship = (internId) => {
    setInterns(prevInterns => {
      const updatedInterns = prevInterns.map(intern => 
        intern.id === internId 
          ? { ...intern, status: 'completed', progress: 100 } 
          : intern
      );
      const completedIntern = updatedInterns.find(intern => intern.id === internId);
      setSelectedIntern(completedIntern);
      setShowEvaluationModal(true);
      return updatedInterns;
    });
  };

  const handleOpenEvaluation = (intern) => {
    setSelectedIntern(intern);
    setShowEvaluationModal(true);
  };

  const handleCloseEvaluation = () => {
    setShowEvaluationModal(false);
    setSelectedIntern(null);
  };

  const handleViewDetails = (intern) => {
    setSelectedIntern(intern);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedIntern(null);
  };

  const handleSubmitEvaluation = (evaluation) => {
    setInterns(prevInterns => 
      prevInterns.map(intern => 
        intern.id === selectedIntern.id 
          ? { ...intern, evaluated: true, evaluation: evaluation } 
          : intern
      )
    );
    setShowEvaluationModal(false);
    setSelectedIntern(null);
  };

  // New functions for deleting evaluations
  const handleOpenDeleteConfirm = () => {
    setShowDeleteConfirmModal(true);
    setShowEvaluationModal(false); // Close the evaluation modal
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirmModal(false);
    if (selectedIntern) {
      setShowEvaluationModal(true); // Reopen the evaluation modal if needed
    }
  };

  const handleDeleteEvaluation = () => {
    if (!selectedIntern) return;

    setInterns(prevInterns => 
      prevInterns.map(intern => 
        intern.id === selectedIntern.id 
          ? { ...intern, evaluated: false, evaluation: null } 
          : intern
      )
    );
    
    setShowDeleteConfirmModal(false);
    setSelectedIntern(null);
  };

  const renderInternCard = (intern) => {
    const completionDate = new Date(intern.endDate);
    const now = new Date();
    const daysLeft = Math.ceil((completionDate - now) / (1000 * 60 * 60 * 24));
    
    return (
      <div key={intern.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{intern.name}</h2>
            <p className="text-gray-600">{intern.position}</p>
            <p className="text-sm text-gray-500">{intern.major}</p>
          </div>
          <div className="flex flex-col items-end">
            <span 
              className={`px-3 py-1 rounded-full text-sm ${
                intern.status === 'current' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {intern.status === 'current' ? 'Current Intern' : 'Internship Complete'}
            </span>
            {intern.evaluated && (
              <span className="mt-2 px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Evaluated
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700">Internship Details</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Start Date:</span> {intern.startDate}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">End Date:</span> {intern.endDate}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Supervisor:</span> {intern.supervisor}
            </p>
            {intern.status === 'current' && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Days Remaining:</span> {daysLeft > 0 ? daysLeft : 'Ending today'}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Contact Information</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {intern.contactEmail}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {intern.phone}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium text-gray-700">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {intern.skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {intern.status === 'current' && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-700">Internship Progress</h3>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{intern.progress}% Complete</span>
              <span>{daysLeft > 0 ? `${daysLeft} days remaining` : 'Ending today'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${intern.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Button 
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => handleViewDetails(intern)}
          >
            View Details
          </Button>
          
          {intern.status === 'current' && (
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleCompleteInternship(intern.id)}
            >
              Mark as Complete
            </Button>
          )}
          
          {intern.status === 'completed' && !intern.evaluated && (
            <Button 
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => handleOpenEvaluation(intern)}
            >
              Evaluate Intern
            </Button>
          )}
          
          {intern.status === 'completed' && intern.evaluated && (
            <Button 
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => handleOpenEvaluation(intern)}
            >
              View Evaluation
            </Button>
          )}
        </div>
      </div>
    );
  };

  const renderDetailsContent = () => {
    if (!selectedIntern) return null;
    
    const startDate = new Date(selectedIntern.startDate);
    const endDate = new Date(selectedIntern.endDate);
    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const durationInWeeks = Math.ceil(durationInDays / 7);
    
    return (
      <div className="space-y-6 max-w-full overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between pb-6 border-b border-gray-200">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-800">{selectedIntern.name}</h3>
            <p className="text-lg text-indigo-600">{selectedIntern.position}</p>
            <p className="text-gray-600">{selectedIntern.major}</p>
          </div>
          <div>
            <span 
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                selectedIntern.status === 'current' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {selectedIntern.status === 'current' ? 'Current Intern' : 'Internship Complete'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Internship Details</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Duration:</span>
                <span className="md:text-right">{durationInWeeks} weeks ({durationInDays} days)</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Start Date:</span>
                <span className="md:text-right">{selectedIntern.startDate}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">End Date:</span>
                <span className="md:text-right">{selectedIntern.endDate}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Supervisor:</span>
                <span className="md:text-right">{selectedIntern.supervisor}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Progress:</span>
                <span className="md:text-right">{selectedIntern.progress}% Complete</span>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Contact Information</h4>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="md:text-right break-all">{selectedIntern.contactEmail}</span>
              </p>
              <p className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="md:text-right">{selectedIntern.phone}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {selectedIntern.skills.map((skill, index) => (
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
          <h4 className="text-lg font-medium text-gray-700 mb-3">Application History</h4>
          <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Position</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Applied On</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedIntern.applications.map(app => (
                  <tr key={app.id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-800">{app.position}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{app.applyDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        app.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          {selectedIntern.status === 'current' && (
            <Button 
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                handleCloseDetails();
                handleCompleteInternship(selectedIntern.id);
              }}
            >
              Mark as Complete
            </Button>
          )}
          
          {selectedIntern.status === 'completed' && !selectedIntern.evaluated && (
            <Button 
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => {
                handleCloseDetails();
                handleOpenEvaluation(selectedIntern);
              }}
            >
              Evaluate Intern
            </Button>
          )}
          
          {selectedIntern.status === 'completed' && selectedIntern.evaluated && (
            <Button 
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => {
                handleCloseDetails();
                handleOpenEvaluation(selectedIntern);
              }}
            >
              View Evaluation
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Modified EvaluationForm view to include Delete button
   const renderEvaluationContent = () => {
    if (!selectedIntern) return null;

    // Set up a global handler for the delete button in the evaluation form
    window.onDeleteEvaluation = handleOpenDeleteConfirm;

    return (
      <div>
        <EvaluationForm 
          onSubmit={handleSubmitEvaluation}
          initialData={selectedIntern.evaluation || {companyName: companyName}}
          evaluationType='Student'
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Manage Interns</h1>
          <p className="mt-2">View and manage your company's current and past interns</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Interns
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Search by name or position..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Interns</option>
                <option value="current">Current Interns</option>
                <option value="completed">Completed Internships</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading interns...</p>
          </div>
        ) : filteredInterns.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {statusFilter === 'all' ? 'All Interns' : 
                statusFilter === 'current' ? 'Current Interns' : 'Completed Internships'}
              <span className="ml-2 text-gray-500 text-base font-normal">
                ({filteredInterns.length})
              </span>
            </h2>
            {filteredInterns.map(renderInternCard)}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <p className="text-gray-500">No interns found matching your search criteria.</p>
          </div>
        )}
      </div>

      {showEvaluationModal && selectedIntern && (
        <Modal 
          isOpen={showEvaluationModal} 
          onClose={handleCloseEvaluation}
          title={selectedIntern.evaluated ? "Intern Evaluation" : "Evaluate Intern"}
        >
          {renderEvaluationContent()}
        </Modal>
      )}

      {showDetailsModal && selectedIntern && (
        <Modal
          isOpen={showDetailsModal}
          onClose={handleCloseDetails}
          title="Intern Details"
          size="xl"
        >
          {renderDetailsContent()}
        </Modal>
      )}

      {/* Confirmation Modal for Deleting Evaluations */}
      {showDeleteConfirmModal && selectedIntern && (
        <Modal
          isOpen={showDeleteConfirmModal}
          onClose={handleCloseDeleteConfirm}
          title="Confirm Delete Evaluation"
          size="md"
        >
          <div className="p-4">
            <div className="mb-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Delete Evaluation</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete the evaluation for {selectedIntern.name}? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={handleCloseDeleteConfirm}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 gap-3"
                onClick={handleDeleteEvaluation}
              >
                Delete Evaluation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Interns;