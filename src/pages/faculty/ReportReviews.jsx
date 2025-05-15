import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import {useToast} from '../../components/common/ToastContext';

const ReportReviews = () => {
  const { userRole } = useContext(AuthContext);
  const { success } = useToast();
  const isFaculty = userRole === 'faculty';
  const isSCAD = userRole === 'scad';
  const printContentRef = useRef(null);

  // State for reports list
  const [reports, setReports] = useState([]);
  const [intendedStatus, setIntendedStatus] = useState('');
  // State for filtered reports
  const [filteredReports, setFilteredReports] = useState([]);
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for status filter
  const [statusFilter, setStatusFilter] = useState('all');
  // State for major filter
  const [majorFilter, setMajorFilter] = useState('all');
  // State for current report
  const [currentReport, setCurrentReport] = useState(null);
  // State for view modal
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // State for clarification modal
  const [isClarificationModalOpen, setIsClarificationModalOpen] = useState(false);
  // State for clarification message
  const [clarificationMessage, setClarificationMessage] = useState('');
  // State for evaluation view modal
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  // State for current evaluation
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for reports
  const mockReports = [
    {
      id: 1,
      title: "My Software Engineering Internship Experience",
      studentName: "Ahmed Mohamed",
      studentId: "43-12345",
      major: "Computer Science and Engineering",
      companyName: "Tech Solutions Inc.",
      jobTitle: "Software Engineering Intern",
      submissionDate: "2025-04-15",
      status: "pending",
      introduction: "During my internship at Tech Solutions Inc., I had the opportunity to work with cutting-edge technologies and contribute to real-world projects.",
      body: "This internship provided me with valuable experience in agile development methodologies and collaborative teamwork. I worked on developing new features for their client-facing application using React and Node.js. The team was supportive and provided regular feedback that helped me improve my skills.",
      helpfulCourses: [
        { id: 1, name: 'Software Engineering', code: 'CSEN704' },
        { id: 4, name: 'Web Development', code: 'CSEN937' }
      ],
      hasEvaluation: true,
      clarificationHistory: []
    },
    {
      id: 2,
      title: "Data Analysis at DataInsights Corp",
      studentName: "Sara Ahmed",
      studentId: "43-67890",
      major: "Electronics and Communication Engineering",
      companyName: "DataInsights Corp.",
      jobTitle: "Data Analysis Intern",
      submissionDate: "2025-05-01",
      status: "accepted",
      introduction: "My internship at DataInsights Corp involved analyzing large datasets and creating visualization dashboards for clients.",
      body: "Throughout this internship, I applied statistical methods to analyze customer behavior data and created interactive dashboards using Tableau. I learned how to process large datasets efficiently and communicate findings to non-technical stakeholders.",
      helpfulCourses: [
        { id: 2, name: 'Database Systems', code: 'CSEN604' },
        { id: 7, name: 'Machine Learning', code: 'CSEN707' }
      ],
      hasEvaluation: true,
      clarificationHistory: []
    },
    {
      id: 3,
      title: "UX/UI Design Internship Report",
      studentName: "Omar Khaled",
      studentId: "43-54321",
      major: "Computer Science and Engineering",
      companyName: "Creative Studios",
      jobTitle: "UX Research Intern",
      submissionDate: "2025-05-05",
      status: "flagged",
      clarification: "The report lacks specific details about your contributions to the projects. Please provide concrete examples of your work and how they impacted the overall project outcomes.",
      introduction: "At Creative Studios, I conducted user research and contributed to the design process for several mobile applications.",
      body: "This report describes my experience conducting user interviews, creating wireframes, and collaborating with developers to implement designs. I learned the importance of user-centered design and iterative development processes.",
      helpfulCourses: [
        { id: 4, name: 'Web Development', code: 'CSEN937' },
        { id: 9, name: 'Computer Graphics', code: 'CSEN403' }
      ],
      hasEvaluation: false,
      clarificationHistory: [
        {
          date: "2025-05-07",
          reviewer: "Dr. Ahmed Hamdy",
          message: "The report lacks specific details about your contributions to the projects. Please provide concrete examples of your work and how they impacted the overall project outcomes."
        }
      ]
    },
    {
      id: 4,
      title: "Embedded Systems at SmartTech",
      studentName: "Nour Ibrahim",
      studentId: "43-24680",
      major: "Electronics and Communication Engineering",
      companyName: "SmartTech",
      jobTitle: "Embedded Systems Intern",
      submissionDate: "2025-04-28",
      status: "rejected",
      clarification: "The report does not meet the minimum word count requirement and fails to connect your experience with your academic coursework. Please revise and resubmit.",
      introduction: "I worked on IoT devices at SmartTech.",
      body: "I programmed microcontrollers and tested device functionality. It was a good experience.",
      helpfulCourses: [
        { id: 6, name: 'Computer Networks', code: 'NETW501' }
      ],
      hasEvaluation: true,
      clarificationHistory: [
        {
          date: "2025-05-02",
          reviewer: "Dr. Hisham Soliman",
          message: "The report does not meet the minimum word count requirement and fails to connect your experience with your academic coursework. Please revise and resubmit."
        }
      ]
    },
    {
      id: 5,
      title: "Cloud Infrastructure Optimization Internship",
      studentName: "Laila Mohamed",
      studentId: "43-13579",
      major: "Computer Science and Engineering",
      companyName: "CloudScale Inc.",
      jobTitle: "Cloud Operations Intern",
      submissionDate: "2025-04-20",
      status: "pending",
      introduction: "During my time at CloudScale Inc., I focused on optimizing cloud infrastructure and reducing operational costs.",
      body: "My internship involved monitoring cloud resource usage, identifying inefficiencies, and implementing solutions to reduce costs while maintaining performance. I worked with AWS services including EC2, S3, and Lambda, and learned how to use CloudWatch for effective monitoring. The team taught me best practices for cloud architecture and security compliance.",
      helpfulCourses: [
        { id: 10, name: 'Cloud Computing', code: 'CSEN911' },
        { id: 8, name: 'System Analysis & Design', code: 'CSEN602' }
      ],
      hasEvaluation: false,
      clarificationHistory: []
    }
  ];

  // Mock data for evaluations
  const mockEvaluations = [
    {
      reportId: 1,
      studentName: "Ahmed Mohamed",
      studentId: "43-12345",
      companyName: "Tech Solutions Inc.",
      supervisorName: "John Smith",
      startDate: "2025-01-15",
      endDate: "2025-04-15",
      rating: 5,
      strengths: "Ahmed demonstrated exceptional problem-solving skills and quickly adapted to our tech stack. His contributions to the frontend refactoring project were valuable.",
      areasForImprovement: "Could benefit from more experience with testing frameworks and CI/CD pipelines.",
      recommendation: true
    },
    {
      reportId: 2,
      studentName: "Sara Ahmed",
      studentId: "43-67890",
      companyName: "DataInsights Corp.",
      supervisorName: "Emily Chen",
      startDate: "2025-02-01",
      endDate: "2025-05-01",
      rating: 4,
      strengths: "Sara has strong analytical skills and was able to derive meaningful insights from complex datasets.",
      areasForImprovement: "Would benefit from improving presentation skills when communicating findings to stakeholders.",
      recommendation: true
    },
    {
      reportId: 4,
      studentName: "Nour Ibrahim",
      studentId: "43-24680",
      companyName: "SmartTech",
      supervisorName: "Alex Johnson",
      startDate: "2025-01-28",
      endDate: "2025-04-28",
      rating: 3,
      strengths: "Good technical knowledge of embedded systems and microcontrollers.",
      areasForImprovement: "Needs to improve documentation habits and communication with team members.",
      recommendation: false
    }
  ];

  // List of majors
  const majors = [
    { id: 1, name: "Computer Science and Engineering" },
    { id: 2, name: "Electronics and Communication Engineering" },
    { id: 3, name: "Mechatronics" },
    { id: 4, name: "Management Engineering" },
    { id: 5, name: "Architecture Engineering" }
  ];

  // Fetch reports data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter reports based on search term, status, and major
  useEffect(() => {
    let results = reports;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      results = results.filter(report => report.status === statusFilter);
    }
    
    // Filter by major
    if (majorFilter !== 'all') {
      results = results.filter(report => report.major === majorFilter);
    }
    
    setFilteredReports(results);
  }, [searchTerm, statusFilter, majorFilter, reports]);

  // Handle view report details
  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setCurrentReport(report);
    setIsViewModalOpen(true);
  };

  // Handle view evaluation details
  const handleViewEvaluation = (reportId) => {
    const evaluation = mockEvaluations.find(e => e.reportId === reportId);
    if (evaluation) {
      setCurrentEvaluation(evaluation);
      setIsEvaluationModalOpen(true);
    } else {
      alert("No evaluation available for this report");
    }
  };

  // Handle status change (only for faculty members)
  const handleStatusChange = (newStatus) => {
  if (isFaculty) {
    if (newStatus === currentReport.status) return;

    if (newStatus === 'flagged' || newStatus === 'rejected') {
      setIntendedStatus(newStatus); // Store the intended status
      setIsViewModalOpen(false);
      setClarificationMessage('');
      setIsClarificationModalOpen(true);
    } else {
      // Update report status directly if accepted
      updateReportStatus(newStatus);
    }
  }
};

  // Handle clarification submission
  const handleSubmitClarification = () => {
  if (!clarificationMessage.trim()) {
    alert("Please provide a reason for flagging or rejecting the report");
    return;
  }

  const newStatus = intendedStatus; // Use the intended status

  // Add current date and reviewer info to clarification history
  const newClarification = {
    date: new Date().toISOString().split('T')[0],
    reviewer: isFaculty ? "Dr. Ahmed Hamdy" : "SCAD Office",
    message: clarificationMessage
  };

  // Update the report with clarification
  const updatedReports = reports.map(report => 
    report.id === currentReport.id ? 
    { 
      ...report, 
      status: newStatus,
      clarification: clarificationMessage,
      clarificationHistory: [...report.clarificationHistory, newClarification]
    } : 
    report
  );

  setReports(updatedReports);
  setFilteredReports(updatedReports);
  setIsClarificationModalOpen(false);
  setClarificationMessage('');
  setIntendedStatus(''); // Reset after submission

  // Show success message
  success(`Report has been ${newStatus}. Notification sent to student.`, 5000);
};

  // Update report status
  const updateReportStatus = (newStatus) => {
    const updatedReports = reports.map(report => 
      report.id === currentReport.id ? { ...report, status: newStatus } : report
    );
    
    setReports(updatedReports);
    setFilteredReports(updatedReports);
    setIsViewModalOpen(false);
    
    // Show success message
    success(`Report status updated to ${formatStatusText(newStatus)}. Notification sent to student.`, 5000);
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-orange-100 text-orange-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Format status text for display
  const formatStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Handle print report as PDF
  const handlePrintReport = () => {
    // First, set up the print content
    if (currentReport) {
      // Set up the print content
      const printContentHTML = `
        <h1>${currentReport.title}</h1>
        <p class="subtitle">${currentReport.companyName} | ${currentReport.jobTitle}</p>
        <div class="student-info">
          <p><strong>Student:</strong> ${currentReport.studentName} (${currentReport.studentId})</p>
          <p><strong>Major:</strong> ${currentReport.major}</p>
          <p><strong>Submission Date:</strong> ${new Date(currentReport.submissionDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${formatStatusText(currentReport.status)}</p>
        </div>
        <h2>Introduction</h2>
        <p>${currentReport.introduction}</p>
        <h2>Report Body</h2>
        <p>${currentReport.body}</p>
        <h2>Helpful Courses</h2>
        <ul>
          ${currentReport.helpfulCourses.map(course => `<li>${course.code}: ${course.name}</li>`).join('')}
        </ul>
      `;

      // Create a temporary container for the print content
      const printContainer = document.createElement('div');
      printContainer.className = 'print-content';
      printContainer.innerHTML = printContentHTML;
      
      // Add the print container to the document
      document.body.appendChild(printContainer);
      
      // Trigger the print dialog
      window.print();
      
      // Remove the print container after printing
      setTimeout(() => {
        document.body.removeChild(printContainer);
      }, 100);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Internship Report Reviews</h1>
          <p className="mt-2">
            {isFaculty ? 'Review and assess student internship reports' : 'Monitor and manage student internship reports'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Reports
              </label>
              <Input
                id="search"
                placeholder="Student name, ID, title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="flagged">Flagged</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Major
              </label>
              <div className="relative">
                <select
                  id="major"
                  value={majorFilter}
                  onChange={(e) => setMajorFilter(e.target.value)}
                  className="block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                >
                  <option value="all">All Majors</option>
                  {majors.map(major => (
                    <option key={major.id} value={major.name}>
                      {major.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading reports...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.studentName}</div>
                        <div className="text-sm text-gray-500">{report.studentId}</div>
                        <div className="text-xs text-gray-500">{report.major}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{report.title}</div>
                        <div className="text-xs text-gray-500">{report.jobTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{report.companyName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(report.submissionDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(report.status)}`}>
                          {formatStatusText(report.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewReport(report.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center text-xs font-medium transition duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Report
                          </button>
                          {report.hasEvaluation && (
                            <button
                              onClick={() => handleViewEvaluation(report.id)}
                              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded flex items-center text-xs font-medium transition duration-150"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              View Evaluation
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No reports found</h3>
            <p className="text-gray-500">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>

      {/* View Report Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Internship Report Details"
        footer={
          <div className="flex justify-between w-full gap-2">
            {isFaculty && (
              <div className="flex space-x-2">
                <Button 
                  variant={currentReport?.status === 'accepted' ? 'secondary' : 'primary'}
                  className={currentReport?.status === 'accepted' ? 'bg-green-600 text-white' : ''}
                  onClick={() => handleStatusChange('accepted')}
                >
                  Accept Report
                </Button>
                <Button 
                  variant={currentReport?.status === 'flagged' ? 'secondary' : 'primary'}
                  className={currentReport?.status === 'flagged' ? 'bg-orange-600 text-white' : ''}
                  onClick={() => handleStatusChange('flagged')}
                >
                  Flag Report
                </Button>
                <Button 
                  variant={currentReport?.status === 'rejected' ? 'secondary' : 'primary'}
                  className={currentReport?.status === 'rejected' ? 'bg-red-600 text-white' : ''}
                  onClick={() => handleStatusChange('rejected')}
                >
                  Reject Report
                </Button>
              </div>
            )}
            <div className="flex space-x-2">
        <Button 
          variant="primary"
          size="md" 
          onClick={handlePrintReport}
          className={`py-2 px-4 gap-2 text-sm w-full `}
        >
          Download PDF
        </Button>
              <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        }
      >
        {currentReport && (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2" ref={printContentRef}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{currentReport.title}</h3>
                <p className="mt-1 text-gray-600">
                  {currentReport.companyName} | {currentReport.jobTitle}
                </p>
                <div className="flex items-center mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(currentReport.status)}`}>
                    {formatStatusText(currentReport.status)}
                  </span>
                  <span className="text-gray-500 text-xs ml-2">
                    Submitted: {new Date(currentReport.submissionDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{currentReport.studentName}</p>
                <p className="text-gray-600 text-sm">{currentReport.studentId}</p>
                <p className="text-gray-500 text-sm">{currentReport.major}</p>
              </div>
            </div>

            {currentReport.clarificationHistory && currentReport.clarificationHistory.length > 0 && (
              <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
                <h4 className="font-semibold text-gray-700">Review History</h4>
                {currentReport.clarificationHistory.map((item, index) => (
                  <div key={index} className="mt-2 border-t border-gray-200 pt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{item.reviewer}</span> • {item.date}
                    </p>
                    <p className="text-sm mt-1">{item.message}</p>
                  </div>
                ))}
              </div>
            )}

            <div>
              <h4 className="font-semibold text-lg border-b pb-2">Introduction</h4>
              <p className="mt-2 text-gray-700">{currentReport.introduction}</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg border-b pb-2">Report Body</h4>
              <p className="mt-2 text-gray-700">{currentReport.body}</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg border-b pb-2">Helpful Courses</h4>
              <div className="flex flex-wrap mt-2">
                {currentReport.helpfulCourses.map(course => (
                  <div key={course.id} className="bg-blue-50 text-blue-800 px-2 py-1 rounded text-sm inline-block mr-2 mb-2">
                    {course.code}: {course.name}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </Modal>

       {/* Clarification Modal */}
<Modal
  isOpen={isClarificationModalOpen}
  onClose={() => setIsClarificationModalOpen(false)}
  title={`Provide Feedback for ${intendedStatus === 'flagged' ? 'Flagging' : 'Rejecting'} Report`}
>
  <div className="space-y-4">
    <p className="text-gray-600">
      Please provide detailed feedback to help the student understand why their report is being {intendedStatus === 'flagged' ? 'flagged' : 'rejected'} and what they need to improve:
    </p>
    <textarea
      className="w-full h-32 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={clarificationMessage}
      onChange={(e) => setClarificationMessage(e.target.value)}
      placeholder="Enter detailed feedback for the student..."
    ></textarea>
    <div className="flex justify-end space-x-3">
      <Button variant="secondary" onClick={() => setIsClarificationModalOpen(false)}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        onClick={handleSubmitClarification}
        className={intendedStatus === 'flagged' ? 'bg-orange-600' : 'bg-red-600'}
      >
        Submit Feedback
      </Button>
    </div>
  </div>
</Modal>
      {/* View Evaluation Modal */}
      <Modal
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
        title="Company Evaluation Details"
        footer={
          <Button variant="secondary" onClick={() => setIsEvaluationModalOpen(false)}>
            Close
          </Button>
        }
      >
        {currentEvaluation && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{currentEvaluation.companyName}</h3>
                <p className="mt-1 text-gray-600">
                  Supervisor: {currentEvaluation.supervisorName}
                </p>
                <p className="text-gray-500 text-sm">
                  Internship Period: {new Date(currentEvaluation.startDate).toLocaleDateString()} - {new Date(currentEvaluation.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{currentEvaluation.studentName}</p>
                <p className="text-gray-600 text-sm">{currentEvaluation.studentId}</p>
              </div>
            </div>

            <div className="flex justify-between items-center my-4">
              <h4 className="font-semibold">Overall Rating</h4>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${
                      index < currentEvaluation.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{currentEvaluation.rating}/5</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg border-b pb-2">Strengths</h4>
              <p className="mt-2 text-gray-700">{currentEvaluation.strengths}</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg border-b pb-2">Areas for Improvement</h4>
              <p className="mt-2 text-gray-700">{currentEvaluation.areasForImprovement}</p>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Would Recommend for Future Positions</h4>
              <div className={`font-medium ${
                currentEvaluation.recommendation ? 'text-green-600' : 'text-red-600'
              }`}>
                {currentEvaluation.recommendation ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Hidden print container for PDF download */}
      <div className="print-content" id="print-container"></div>
    </div>
  );
};

export default ReportReviews;
