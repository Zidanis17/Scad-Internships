import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Papa from 'papaparse';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../components/common/ToastContext';

// Mock data combining Statistics and ReportReviews
const dummyDashboardData = {
  // From Statistics.jsx
  pendingCompanyApplications: 8,
  totalStudents: 150,
  submittedReports: 45,
  stats: {
    reports: [
      { name: 'Accepted', value: 30 },
      { name: 'Rejected', value: 10 },
      { name: 'Flagged', value: 5 },
    ],
  },
  // From ReportReviews.jsx (limited to 5 reports for preview)
  reports: [
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
      hasEvaluation: true,
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
      hasEvaluation: true,
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
      hasEvaluation: false,
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
      hasEvaluation: true,
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
      hasEvaluation: false,
    },
  ],
  evaluations: [
    {
      reportId: 1,
      studentName: "Ahmed Mohamed",
      studentId: "43-12345",
      companyName: "Tech Solutions Inc.",
      supervisorName: "John Smith",
      startDate: "2025-01-15",
      endDate: "2025-04-15",
      rating: 5,
      strengths: "Ahmed demonstrated exceptional problem-solving skills and quickly adapted to our tech stack.",
      areasForImprovement: "Could benefit from more experience with testing frameworks and CI/CD pipelines.",
      recommendation: true,
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
      recommendation: true,
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
      recommendation: false,
    },
  ],
};

const FacultyDashboard = () => {
  const { userRole } = useContext(AuthContext);
  const { success, error } = useToast();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentReport, setCurrentReport] = useState(null);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);

  // Load data
  useEffect(() => {
    setTimeout(() => {
      setData(dummyDashboardData);
      setIsLoading(false);
    }, 500);
  }, []);

  // Redirect non-faculty users
  if (userRole !== 'faculty') {
    return <Navigate to="/unauthorized" replace />;
  }

  const exportReport = () => {
    if (!data) {
      error('No data available to generate report');
      return;
    }
    const reportData = [
      {
        ReportStatus: 'Accepted',
        Count: data.stats.reports.find((r) => r.name === 'Accepted')?.value || 0,
      },
      {
        ReportStatus: 'Rejected',
        Count: data.stats.reports.find((r) => r.name === 'Rejected')?.value || 0,
      },
      {
        ReportStatus: 'Flagged',
        Count: data.stats.reports.find((r) => r.name === 'Flagged')?.value || 0,
      },
    ];
    const csv = Papa.unparse(reportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'faculty_dashboard_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Report generated successfully');
  };

  const handleViewReport = (reportId) => {
    const report = data.reports.find((r) => r.id === reportId);
    setCurrentReport(report);
    setIsViewModalOpen(true);
  };

  const handleViewEvaluation = (reportId) => {
    const evaluation = data.evaluations.find((e) => e.reportId === reportId);
    if (evaluation) {
      setCurrentEvaluation(evaluation);
      setIsEvaluationModalOpen(true);
    } else {
      error('No evaluation available for this report');
    }
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="mt-2">Overview of internship reports and key statistics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">

        {/* Statistics Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Report Status Summary</h2>
            <Button onClick={exportReport} variant="primary">
              Generate Report
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.stats.reports.map((status) => (
              <div key={status.name} className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">{status.name}</p>
                <p className={`text-xl font-bold ${getStatusClass(status.name.toLowerCase())}`}>
                  {status.value}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/faculty/faculty-statistics"
            className="text-blue-600 hover:text-blue-800 text-sm mt-4 block"
          >
            View Full Statistics
          </Link>
        </div>

        {/* Report Reviews Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Report Reviews</h2>
            <Link
              to="/faculty/report-reviews"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View All Reports
            </Link>
          </div>
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.studentName}</div>
                      <div className="text-sm text-gray-500">{report.studentId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{report.title}</div>
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
                          View
                        </button>
                        {report.hasEvaluation && (
                          <button
                            onClick={() => handleViewEvaluation(report.id)}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded flex items-center text-xs font-medium transition duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Evaluation
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
      </div>

      {/* View Report Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Internship Report Details"
        className="w-full max-w-lg sm:max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
      >
        {currentReport && (
          <div className="space-y-6">
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
            <Link
              to="/scad/report-reviews"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View Full Report Details
            </Link>
          </div>
        )}
      </Modal>

      {/* View Evaluation Modal */}
      <Modal
        isOpen={isEvaluationModalOpen}
        onClose={() => setIsEvaluationModalOpen(false)}
        title="Company Evaluation Details"
        className="w-full max-w-lg sm:max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
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
                    className={`h-5 w-5 ${index < currentEvaluation.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{currentEvaluation.rating}/5</span>
              </div>
            </div>
            <Link
              to="/scad/report-reviews"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View Full Evaluation Details
            </Link>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FacultyDashboard;