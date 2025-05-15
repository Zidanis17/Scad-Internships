import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastContext';

const InternshipDashboard = () => {
  // States for reports
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
  
  // States for resources
  const [activeTab, setActiveTab] = useState('reports');
  const [activeResourceTab, setActiveResourceTab] = useState('videos');
  
  const { success } = useToast();

  // Mock data for reports
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

  // Mock data for resources
  const resources = {
    videos: [
      {
        id: 1,
        title: "Qualifying Internships for Your Major",
        description: "Learn about the criteria for internships that qualify for academic credit in Computer Science and related fields.",
        youtubeId: "jNQXAC9IVRw",
        duration: "14:35"
      },
      {
        id: 2,
        title: "How to Secure a Technical Internship",
        description: "Tips and strategies for landing competitive internships in the tech industry.",
        youtubeId: "dQw4w9WgXcQ",
        duration: "22:18"
      }
    ],
    documents: [
      {
        id: 1,
        title: "Internship Report Guidelines",
        description: "Comprehensive guide on how to write effective internship reports that meet department requirements.",
        fileType: "PDF",
        fileSize: "1.2 MB"
      },
      {
        id: 2,
        title: "Sample Internship Report",
        description: "An example of a well-written internship report that received excellent feedback.",
        fileType: "PDF",
        fileSize: "2.5 MB"
      },
      {
        id: 3,
        title: "Internship Evaluation Form",
        description: "The form your internship supervisor will need to complete for your final evaluation.",
        fileType: "DOCX",
        fileSize: "345 KB"
      }
    ],
    links: [
      {
        id: 1,
        title: "Department Internship Portal",
        description: "Official department webpage with internship opportunities and resources.",
        url: "https://example.com/department-internships"
      },
      {
        id: 2,
        title: "Career Services - Internship Resources",
        description: "University-wide resources for finding and applying to internships.",
        url: "https://example.com/career-services/internships"
      },
      {
        id: 3,
        title: "Internship Credit Requirements",
        description: "Official requirements for receiving academic credit for your internship experience.",
        url: "https://example.com/internship-credits"
      }
    ]
  };

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

  // Report functionality handlers
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
    success("Report saved successfully!");
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

  // Component for the video player
  const VideoPlayer = ({ youtubeId, title }) => (
    <div className="aspect-w-16 aspect-h-9 mb-4">
      <iframe 
        className="w-full h-full rounded-lg shadow-md"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  // Component for resource cards
  const ResourceCard = ({ resource, type }) => {
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = '/dummy.pdf';
      link.download = 'dummy.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        {type === 'videos' && (
          <VideoPlayer youtubeId={resource.youtubeId} title={resource.title} />
        )}
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-4">{resource.description}</p>
        
        <div className="flex justify-between items-center">
          {type === 'videos' && (
            <span className="text-sm text-gray-500">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              {resource.duration}
            </span>
          )}
          
          {type === 'documents' && (
            <span className="text-sm text-gray-500">
              <span className="inline-block mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </span>
              {resource.fileType} · {resource.fileSize}
            </span>
          )}
          
          {type === 'links' && (
            <span className="text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline-block mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              External Link
            </span>
          )}
          
          {type === 'documents' && (
            <Button variant="secondary" size="medium" onClick={handleDownload}>
              Download
            </Button>
          )}
          
          {type === 'links' && (
            <Button 
              variant="secondary" 
              size="medium"
              onClick={() => window.open(resource.url, '_blank')}
            >
              Visit
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Form component for creating/editing reports
  const ReportForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
      title: initialData.title || '',
      companyName: initialData.companyName || '',
      jobTitle: initialData.jobTitle || '',
      introduction: initialData.introduction || '',
      body: initialData.body || '',
      helpfulCourses: initialData.helpfulCourses || []
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      const courseId = parseInt(value);
      
      if (checked) {
        setFormData(prev => ({
          ...prev,
          helpfulCourses: [...prev.helpfulCourses, courseId]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          helpfulCourses: prev.helpfulCourses.filter(id => id !== courseId)
        }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Report Title*
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name*
            </label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="introduction" className="block text-sm font-medium text-gray-700 mb-1">
            Introduction*
          </label>
          <textarea
            id="introduction"
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
            Report Body*
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Helpful Courses
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 1, name: "Software Engineering" },
              { id: 2, name: "Database Systems" },
              { id: 3, name: "Data Structures" },
              { id: 4, name: "Web Development" },
              { id: 5, name: "Mobile Development" },
              { id: 6, name: "Computer Networks" }
            ].map((course) => (
              <div key={course.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`course${course.id}`}
                  name="helpfulCourses"
                  value={course.id}
                  checked={formData.helpfulCourses.includes(course.id)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`course${course.id}`} className="ml-2 text-gray-700">
                  {course.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {initialData.id ? 'Update Report' : 'Create Report'}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Internship Dashboard</h1>
          <p className="mt-2">Manage your internship reports and access helpful resources</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Main Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                activeTab === 'reports'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('reports')}
            >
              My Reports
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                activeTab === 'resources'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <>
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
          </>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <>
            {/* Featured Video */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured: Qualifying Internships for Your Major</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  className="w-full h-96 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/jNQXAC9IVRw"
                  title="Qualifying Internships for Your Major"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-lg text-gray-700">
                This comprehensive guide explains the criteria for internships that qualify for academic credit in Computer Science 
                and related majors. Learn about the types of companies, roles, and responsibilities that meet department requirements.
              </p>
              <div className="mt-6 flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>14:35</span>
                <span className="mx-3">•</span>
                <span>Department of Computer Science</span>
              </div>
            </div>

            {/* Resource Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="flex border-b border-gray-200">
                <button
                  className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                    activeResourceTab === 'videos'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveResourceTab('videos')}
                >
                  Videos
                </button>
                <button
                  className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                    activeResourceTab === 'documents'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveResourceTab('documents')}
                >
                  Documents
                </button>
                <button
                  className={`py-4 px-6 text-sm font-medium focus:outline-none ${
                    activeResourceTab === 'links'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveResourceTab('links')}
                >
                  Helpful Links
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {resources[activeResourceTab].map(resource => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      type={activeResourceTab} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about internship requirements or resources, please contact the department's 
                internship coordinator or visit office hours.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800">Internship Coordinator</h3>
                  <p className="text-gray-600">Dr. Jane Smith</p>
                  <p className="text-gray-600">Email: jsmith@university.edu</p>
                  <p className="text-gray-600">Office: Tech Building 305</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800">Office Hours</h3>
                  <p className="text-gray-600">Monday: 10:00 AM - 12:00 PM</p>
                  <p className="text-gray-600">Wednesday: 2:00 PM - 4:00 PM</p>
                  <p className="text-gray-600">Or by appointment</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals for Reports Functionality */}
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

      {/* Print Styles and Content */}
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

export default InternshipDashboard;