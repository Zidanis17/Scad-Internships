import React, { useState, useEffect } from 'react';
import ReportCard from '../../components/report/ReportCard';
import ReportForm from '../../components/report/ReportForm';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useToast } from '../../components/common/ToastContext';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [appealMessage, setAppealMessage] = useState('');
  const [isPrintMode, setIsPrintMode] = useState(false);
  const { success } = useToast();

  const mockReports = [
    {
      id: 1,
      title: "My Software Engineering Internship Experience",
      companyName: "Tech Solutions Inc.",
      jobTitle: "Software Engineering Intern",
      submissionDate: "2025-04-15",
      status: "accepted",
      introduction: "During my internship at Tech Solutions Inc., I had the opportunity to work with cutting-edge technologies and contribute to real-world projects.",
      body: "This internship provided me with valuable experience in agile development methodologies and collaborative teamwork. I worked on developing new features for their client-facing application using React and Node.js. The team was supportive and provided regular feedback that helped me improve my skills.",
      helpfulCourses: [1, 4],
      isFinalized: true
    },
    {
      id: 2,
      title: "Data Analysis at DataInsights Corp",
      companyName: "DataInsights Corp.",
      jobTitle: "Data Analysis Intern",
      submissionDate: "2025-05-01",
      status: "pending",
      introduction: "My internship at DataInsights Corp involved analyzing large datasets and creating visualization dashboards for clients.",
      body: "Throughout this internship, I applied statistical methods to analyze customer behavior data and created interactive dashboards using Tableau. I learned how to process large datasets efficiently and communicate findings to non-technical stakeholders.",
      helpfulCourses: [2, 3],
      isFinalized: true
    },
    {
      id: 3,
      title: "UX/UI Design Internship Report",
      companyName: "Creative Studios",
      jobTitle: "UX Research Intern",
      submissionDate: "2025-05-05",
      status: "flagged",
      comments: "Please provide more specific examples of your contributions to the projects mentioned in section 2.",
      introduction: "At Creative Studios, I conducted user research and contributed to the design process for several mobile applications.",
      body: "This report describes my experience conducting user interviews, creating wireframes, and collaborating with developers to implement designs. I learned the importance of user-centered design and iterative development processes.",
      helpfulCourses: [4, 5],
      isFinalized: true
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let results = reports;
    
    if (searchTerm) {
      results = results.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      results = results.filter(report => report.status === statusFilter);
    }
    
    setFilteredReports(results);
  }, [searchTerm, statusFilter, reports]);

  const handleCreateReport = () => {
    setCurrentReport(null);
    setIsModalOpen(true);
  };

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setCurrentReport(report);
    setIsViewModalOpen(true);
  };

  const handleEditReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setCurrentReport(report);
    setIsModalOpen(true);
  };

  const handleSubmitReport = (formData) => {
    if (currentReport) {
      const updatedReports = reports.map(report => 
        report.id === currentReport.id ? { ...report, ...formData } : report
      );
      setReports(updatedReports);
    } else {
      const newReport = {
        id: reports.length + 1,
        ...formData,
        companyName: formData.companyName || "Company Name",
        jobTitle: formData.jobTitle || "Job Title",
        submissionDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      setReports([...reports, newReport]);
    }
    setIsModalOpen(false);
  };

  const handleAppealSubmit = () => {
    if (!appealMessage.trim()) return;
    
    const updatedReports = reports.map(report => 
      report.id === currentReport.id ? 
      { ...report, appealMessage, appealDate: new Date().toISOString().split('T')[0] } : 
      report
    );
    setReports(updatedReports);
    setIsAppealModalOpen(false);
    setAppealMessage('');
    
    success("Appeal submitted successfully");
  };

  const handleAppeal = () => {
    setIsViewModalOpen(false);
    setIsAppealModalOpen(true);
  };

  const handlePrintPDF = (reportId) => {
    const reportToPrint = reports.find(r => r.id === reportId);
    setCurrentReport(reportToPrint);
    setIsPrintMode(true);
    
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrintMode(false);
      }, 500);
    }, 100);
  };

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

  const formatStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">My Internship Reports</h1>
          <p className="mt-2">Create and manage your internship reports</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <div className="w-full sm:w-64">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Reports
                </label>
                <Input
                  id="search"
                  placeholder="Title, company, position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="w-full sm:w-48">
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
            </div>
            <Button variant="primary" onClick={handleCreateReport} className="mt-7 sm:mt-0">
              Create New Report
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading reports...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold mb-1 text-gray-800">{report.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(report.status)}`}>
                      {formatStatusText(report.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {report.companyName} | {report.jobTitle}
                  </p>
                  
                  <p className="text-xs text-gray-500 mb-4">
                    Submitted: {new Date(report.submissionDate).toLocaleDateString()}
                  </p>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {report.introduction}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button 
                      variant="primary" 
                      size="md"
                      onClick={() => handleViewReport(report.id)}
                      className="py-2 px-2 text-sm"
                    >
                      View Report
                    </Button>
                    
                    {report.status === 'pending' ? (
                      <Button 
                        variant="secondary"
                        size="md" 
                        onClick={() => handleEditReport(report.id)}
                        className="py-2 px-2 text-sm"
                      >
                        Edit Report
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        size="md" 
                        onClick={() => handlePrintPDF(report.id)}
                        className="py-2 px-2 text-sm"
                      >
                        Download PDF
                      </Button>
                    )}
                    
                    {report.status === 'pending' && (
                      <Button 
                        variant="outline"
                        size="md" 
                        onClick={() => handlePrintPDF(report.id)}
                        className="py-2 px-2 text-sm col-span-2"
                      >
                        Download PDF
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? "Try adjusting your search filters" 
                : "You haven't created any internship reports yet"}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button variant="primary" onClick={handleCreateReport}>
                Create Your First Report
              </Button>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentReport ? "Edit Report" : "Create New Report"}
      >
        <ReportForm
          onSubmit={handleSubmitReport}
          initialData={currentReport || {}}
        />
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Report Details"
        footer={
          <div className="flex justify-between">
            <div>
              {currentReport && (currentReport.status === 'flagged' || currentReport.status === 'rejected') && (
                <Button variant="primary" onClick={handleAppeal}>
                  Appeal Report Status
                </Button>
              )}
            </div>
            <Button variant="secondary" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        {currentReport && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">{currentReport.title}</h3>
              <p className="text-gray-600">
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

            {currentReport.appealMessage && (
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="font-semibold text-blue-800">Appeal Submitted</p>
                <p className="text-sm text-gray-700">{currentReport.appealMessage}</p>
                <p className="text-xs text-gray-500 mt-1">Date: {currentReport.appealDate}</p>
              </div>
            )}

            {currentReport.comments && currentReport.status !== 'accepted' && (
              <div className="bg-gray-50 border-l-4 border-gray-300 p-3">
                <p className="font-semibold">Reviewer Feedback:</p>
                <p className="text-gray-700">{currentReport.comments}</p>
              </div>
            )}

            <div>
              <h4 className="font-semibold">Introduction</h4>
              <p className="text-gray-700">{currentReport.introduction}</p>
            </div>

            <div>
              <h4 className="font-semibold">Report Body</h4>
              <p className="text-gray-700">{currentReport.body}</p>
            </div>

            <div>
              <h4 className="font-semibold">Helpful Courses</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {currentReport.helpfulCourses.includes(1) && <li>Software Engineering</li>}
                {currentReport.helpfulCourses.includes(2) && <li>Database Systems</li>}
                {currentReport.helpfulCourses.includes(3) && <li>Data Structures</li>}
                {currentReport.helpfulCourses.includes(4) && <li>Web Development</li>}
                {currentReport.helpfulCourses.includes(5) && <li>Mobile Development</li>}
                {currentReport.helpfulCourses.includes(6) && <li>Computer Networks</li>}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isAppealModalOpen}
        onClose={() => setIsAppealModalOpen(false)}
        title="Appeal Report Status"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Please provide additional information or clarification about why you believe this report should be reconsidered:
          </p>
          <textarea
            className="w-full h-32 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={appealMessage}
            onChange={(e) => setAppealMessage(e.target.value)}
            placeholder="Explain why you're appealing this decision..."
          ></textarea>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsAppealModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAppealSubmit}>
              Submit Appeal
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      {isPrintMode && currentReport && (
        <div className="print-content">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{currentReport.title}</h1>
            <p className="text-xl mb-2">
              {currentReport.companyName} | {currentReport.jobTitle}
            </p>
            <p className="text-gray-600 mb-6">
              Submitted: {new Date(currentReport.submissionDate).toLocaleDateString()}
            </p>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
              <p className="text-lg">{currentReport.introduction}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Report Details</h2>
              <p className="text-lg">{currentReport.body}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-2">Helpful Courses</h2>
              <ul className="list-disc pl-8">
                {currentReport.helpfulCourses.includes(1) && <li className="text-lg">Software Engineering</li>}
                {currentReport.helpfulCourses.includes(2) && <li className="text-lg">Database Systems</li>}
                {currentReport.helpfulCourses.includes(3) && <li className="text-lg">Data Structures</li>}
                {currentReport.helpfulCourses.includes(4) && <li className="text-lg">Web Development</li>}
                {currentReport.helpfulCourses.includes(5) && <li className="text-lg">Mobile Development</li>}
                {currentReport.helpfulCourses.includes(6) && <li className="text-lg">Computer Networks</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;