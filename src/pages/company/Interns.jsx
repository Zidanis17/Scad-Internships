import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import EvaluationForm from '../../components/evaluation/EvaluationForm';

// Dummy data for interns
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
  const [loading, setLoading] = useState(true);

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
    // Update intern status to completed
    const updatedInterns = interns.map(intern => {
      if (intern.id === internId) {
        return { ...intern, status: 'completed', progress: 100 };
      }
      return intern;
    });
    
    setInterns(updatedInterns);
    
    // Find the updated intern to select for evaluation
    const completedIntern = updatedInterns.find(intern => intern.id === internId);
    setSelectedIntern(completedIntern);
    setShowEvaluationModal(true);
  };

  const handleOpenEvaluation = (intern) => {
    setSelectedIntern(intern);
    setShowEvaluationModal(true);
  };

  const handleCloseEvaluation = () => {
    setShowEvaluationModal(false);
    setSelectedIntern(null);
  };

  const handleSubmitEvaluation = (evaluation) => {
    // Update intern evaluation status
    const updatedInterns = interns.map(intern => {
      if (intern.id === selectedIntern.id) {
        return { ...intern, evaluated: true };
      }
      return intern;
    });
    
    setInterns(updatedInterns);
    setShowEvaluationModal(false);
    setSelectedIntern(null);
    
    // In a real app, you'd save the evaluation to the backend here
    console.log('Evaluation submitted:', evaluation);
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
          <Link to={`/company/interns/${intern.id}`}>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
              View Details
            </Button>
          </Link>
          
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
              className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              onClick={() => handleOpenEvaluation(intern)}
            >
              View Evaluation
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Manage Interns</h1>
          <p className="mt-2">View and manage your company's current and past interns</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Search and Filter */}
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

        {/* Interns List */}
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

      {/* Evaluation Modal */}
      {showEvaluationModal && selectedIntern && (
        <Modal 
          isOpen={showEvaluationModal} 
          onClose={handleCloseEvaluation}
          title={selectedIntern.evaluated ? "Intern Evaluation" : "Evaluate Intern"}
        >
          <EvaluationForm 
            intern={selectedIntern}
            onSubmit={handleSubmitEvaluation}
            readOnly={selectedIntern.evaluated}
          />
        </Modal>
      )}
    </div>
  );
};

export default Interns;