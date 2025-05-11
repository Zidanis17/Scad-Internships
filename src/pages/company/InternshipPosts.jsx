import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import InternshipForm from '../../components/internship/InternshipForm';
import Table from '../../components/common/Table';

// Dummy data for internship posts
const dummyInternshipPosts = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    duration: '3 months',
    durationMonths: 3,
    isPaid: true,
    salary: '8000 EGP/month',
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    applicationsCount: 12,
    status: 'Active',
    deadline: '2025-06-15',
    postedAt: '2025-05-07',
    description: 'We are looking for a motivated Software Engineering Intern to join our development team. The intern will work on real-world projects under the guidance of senior developers.',
    industry: 'Information Technology'
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    duration: '4 months',
    durationMonths: 4,
    isPaid: true,
    salary: '7500 EGP/month',
    skillsRequired: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    applicationsCount: 8,
    status: 'Active',
    deadline: '2025-06-20',
    postedAt: '2025-05-05',
    description: 'Join our design team to create user-centered designs for web and mobile applications. The intern will participate in the entire design process from concept to implementation.',
    industry: 'Information Technology'
  },
  {
    id: 3,
    title: 'Data Analysis Intern',
    duration: '2 months',
    durationMonths: 2,
    isPaid: false,
    skillsRequired: ['Excel', 'SQL', 'Data Visualization'],
    applicationsCount: 5,
    status: 'Active',
    deadline: '2025-06-10',
    postedAt: '2025-05-03',
    description: 'We are seeking a Data Analysis Intern to help our team gather insights from various datasets. The intern will work with our business intelligence team to create reports and visualizations.',
    industry: 'Information Technology'
  },
  {
    id: 4,
    title: 'Marketing Intern',
    duration: '3 months',
    durationMonths: 3,
    isPaid: true,
    salary: '6000 EGP/month',
    skillsRequired: ['Social Media', 'Content Creation', 'SEO'],
    applicationsCount: 3,
    status: 'Draft',
    deadline: '2025-06-25',
    postedAt: '2025-05-02',
    description: 'Looking for a creative Marketing Intern to assist with digital marketing campaigns. The intern will gain experience in social media management, content creation, and SEO optimization.',
    industry: 'Marketing'
  },
  {
    id: 5,
    title: 'Machine Learning Intern',
    duration: '6 months',
    durationMonths: 6,
    isPaid: true,
    salary: '9000 EGP/month',
    skillsRequired: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
    applicationsCount: 6,
    status: 'Active',
    deadline: '2025-07-01',
    postedAt: '2025-04-15',
    description: 'Join our AI team to work on cutting-edge machine learning projects. The intern will assist in developing and improving ML models for various business applications.',
    industry: 'Artificial Intelligence'
  }
];

const InternshipPosts = () => {
  const [internshipPosts, setInternshipPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDuration, setFilterDuration] = useState('all');
  const [filterPaid, setFilterPaid] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  
  // Modal states
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInternshipPosts(dummyInternshipPosts);
      setLoading(false);
    }, 500);
  }, []);

  // Extract unique industries for filter dropdown
  const industries = [...new Set(dummyInternshipPosts.map(post => post.industry))];

  // Filter change handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDurationFilter = (e) => {
    setFilterDuration(e.target.value);
  };

  const handlePaidFilter = (e) => {
    setFilterPaid(e.target.value);
  };

  const handleIndustryFilter = (e) => {
    setFilterIndustry(e.target.value);
  };

  // Action handlers
  const handleCreatePost = () => {
    setFormMode('create');
    setSelectedPost(null);
    setIsFormModalOpen(true);
  };

  const handleEditPost = (post) => {
    setFormMode('edit');
    setSelectedPost(post);
    setIsFormModalOpen(true);
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setIsViewModalOpen(true);
  };

  const handleDeletePost = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = () => {
    // Simulate API call to delete post
    const updatedPosts = internshipPosts.filter(post => post.id !== selectedPost.id);
    setInternshipPosts(updatedPosts);
    setIsDeleteModalOpen(false);
    setSelectedPost(null);
  };
  
const handleSubmitPost = (postData) => {
  const { jobTitle, skills, ...rest } = postData;
  const title = jobTitle;
  const skillsRequired = skills;
  const durationMonths = parseInt(postData.duration?.split(' ')[0]) || 0;
  
  if (formMode === 'create') {
    const newPost = {
      id: internshipPosts.length + 1,
      title,
      skillsRequired,
      ...rest,
      durationMonths,
      postedAt: new Date().toISOString().split('T')[0],
      applicationsCount: 0,
      status: postData.status || 'Active'
    };
    setInternshipPosts([...internshipPosts, newPost]);
  } else {
    const updatedPosts = internshipPosts.map(post => {
      if (post.id === selectedPost.id) {
        return { ...post, title, skillsRequired, ...rest, durationMonths };
      }
      return post;
    });
    setInternshipPosts(updatedPosts);
  }
  setIsFormModalOpen(false);
  setSelectedPost(null);
};
  // Filter and search posts
  const filteredPosts = internshipPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    const matchesDuration = filterDuration === 'all' || 
                          (filterDuration === 'short' && post.durationMonths <= 3) ||
                          (filterDuration === 'medium' && post.durationMonths > 3 && post.durationMonths <= 5) ||
                          (filterDuration === 'long' && post.durationMonths > 5);
    
    const matchesPaid = filterPaid === 'all' || 
                      (filterPaid === 'paid' && post.isPaid) ||
                      (filterPaid === 'unpaid' && !post.isPaid);
    
    const matchesIndustry = filterIndustry === 'all' || post.industry === filterIndustry;
    
    return matchesSearch && matchesStatus && matchesDuration && matchesPaid && matchesIndustry;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Define table columns
  const columns = [
    {
      title: 'Internship',
      render: (row) => (
        <div className="flex flex-col space-y-1">
          <div 
            className="font-medium text-indigo-700 hover:text-indigo-900 cursor-pointer"
            onClick={() => handleViewPost(row)}
          >
            {row.title}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              Posted: {formatDate(row.postedAt)}
            </span>
            <span className="text-xs text-gray-500">
              • Industry: {row.industry}
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Details',
      render: (row) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-800">Duration:</span>
            <span className="ml-2 text-sm">{row.duration}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-800">Compensation:</span>
            <span className="ml-2 text-sm">
              {row.isPaid ? (
                <span className="text-green-600">{row.salary}</span>
              ) : (
                <span className="text-gray-600">Unpaid</span>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-800">Deadline:</span>
            <span className="ml-2 text-sm">{formatDate(row.deadline)}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      render: (row) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 
          row.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      title: 'Applications',
      render: (row) => (
        <Link to={`/company/applications?post=${row.id}`}>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-indigo-200">
            {row.applicationsCount} {row.applicationsCount === 1 ? 'Application' : 'Applications'}
          </span>
        </Link>
      )
    },
{
  title: 'Actions',
  render: (row) => (
    <div className="flex space-x-2">
      <Button 
        className="bg-indigo-600 text-white hover:bg-indigo-700 text-xs py-1 px-2"
        onClick={() => handleViewPost(row)}
      >
        View
      </Button>
      <Button 
        className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1"
        onClick={() => handleEditPost(row)}
      >
        Edit
      </Button>
      <Button 
        className="bg-red-600 text-white hover:bg-red-700 text-xs py-1 px-2"
        onClick={() => handleDeletePost(row)}
      >
        Delete
      </Button>
    </div>
  )
}
  ];

  // Render skills list
  const renderSkills = (skills) => {
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-indigo-700 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Internship Posts</h1>
          <p className="mt-2">Manage your internship opportunities</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search by title or description"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filterStatus}
                onChange={handleStatusFilter}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <select
                id="duration"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filterDuration}
                onChange={handleDurationFilter}
              >
                <option value="all">All Durations</option>
                <option value="short">Short (≤ 3 months)</option>
                <option value="medium">Medium (4-5 months)</option>
                <option value="long">Long (6+ months)</option>
              </select>
            </div>
            <div>
              <label htmlFor="paid" className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
              <select
                id="paid"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filterPaid}
                onChange={handlePaidFilter}
              >
                <option value="all">All Types</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select
                id="industry"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filterIndustry}
                onChange={handleIndustryFilter}
              >
                <option value="all">All Industries</option>
                {industries.map((industry, index) => (
                  <option key={index} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Internship Posts ({filteredPosts.length})
          </h2>
          <Button 
            className="bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={handleCreatePost}
          >
            Create New Internship Post
          </Button>
        </div>

        {/* Posts Table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-200 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table columns={columns} data={filteredPosts} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-lg text-gray-600 mb-4">No internship posts found</p>
            <p className="text-gray-500 mb-6">
              {internshipPosts.length > 0 
                ? "Try adjusting your filters or search criteria." 
                : "Create your first internship post to start receiving applications."}
            </p>
            <Button 
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={handleCreatePost}
            >
              Create New Internship Post
            </Button>
          </div>
        )}
       </div>

     {/* Create/Edit Internship Post Modal */}
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title={formMode === 'create' ? 'Create New Internship Post' : 'Edit Internship Post'}
          size="lg"
        >
        <InternshipForm
          initialData={selectedPost ? {
            ...selectedPost,
            jobTitle: selectedPost.title,
            skills: selectedPost.skillsRequired,
          } : {}}
          onSubmit={handleSubmitPost}
          mode={formMode}
        />
        </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="p-4">
          <p className="mb-6 text-gray-700">
            Are you sure you want to delete the internship post "{selectedPost?.title}"?
            {selectedPost?.applicationsCount > 0 && (
              <span className="block mt-2 text-red-600 font-medium">
                Warning: This post has {selectedPost.applicationsCount} active applications.
              </span>
            )}
          </p>
          <div className="flex justify-end space-x-3">
            <Button 
              className="bg-gray-300 text-gray-700 hover:bg-gray-400" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-red-600 text-white hover:bg-red-700" 
              onClick={confirmDeletePost}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Internship Post Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedPost?.title || 'Internship Details'}
        size="lg"
      >
        {selectedPost && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Internship Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                    <span className="ml-2 text-sm">{selectedPost.duration}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      selectedPost.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      selectedPost.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedPost.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Compensation:</span>
                    <span className="ml-2 text-sm">
                      {selectedPost.isPaid ? `Paid (${selectedPost.salary})` : 'Unpaid'}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Industry:</span>
                    <span className="ml-2 text-sm">{selectedPost.industry}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Application Deadline:</span>
                    <span className="ml-2 text-sm">{formatDate(selectedPost.deadline)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Posted On:</span>
                    <span className="ml-2 text-sm">{formatDate(selectedPost.postedAt)}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Applications:</span>
                    <Link to={`/company/applications?post=${selectedPost.id}`}>
                      <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-indigo-200">
                        {selectedPost.applicationsCount} {selectedPost.applicationsCount === 1 ? 'Application' : 'Applications'}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">{selectedPost.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Skills Required</h3>
                {renderSkills(selectedPost.skillsRequired)}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditPost(selectedPost);
                }}
              >
                Edit Internship
              </Button>
              <Button 
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InternshipPosts;