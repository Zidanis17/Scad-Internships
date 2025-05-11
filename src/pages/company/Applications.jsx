import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicantName: 'John Doe',
      internshipPost: 'Software Engineering Intern',
      status: 'pending',
      cv: 'path/to/cv.pdf',
      coverLetter: 'path/to/coverletter.pdf',
    },
    {
      id: 2,
      applicantName: 'Jane Smith',
      internshipPost: 'Data Science Intern',
      status: 'finalized',
      cv: 'path/to/cv2.pdf',
      coverLetter: 'path/to/coverletter2.pdf',
    },
    {
      id: 3,
      applicantName: 'Emily Davis',
      internshipPost: 'Software Engineering Intern',
      status: 'accepted',
      cv: 'path/to/cv3.pdf',
      coverLetter: 'path/to/coverletter3.pdf',
    },
  ]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [applicationToUpdate, setApplicationToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [filterPost, setFilterPost] = useState('');

  const uniquePosts = [...new Set(applications.map((app) => app.internshipPost))];
  const filteredApplications = filterPost
    ? applications.filter((app) => app.internshipPost === filterPost)
    : applications;

  const columns = [
    { header: 'Applicant Name', accessor: 'applicantName' },
    { header: 'Internship Post', accessor: 'internshipPost' },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div>
          <Button onClick={() => handleViewDetails(row)}>View Details</Button>
          <Button onClick={() => handleUpdateStatus(row)}>Update Status</Button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (application) => {
    setApplicationToUpdate(application);
    setNewStatus(application.status);
    setIsStatusModalOpen(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <div className="mb-4">
          <label htmlFor="filterPost" className="mr-2">Filter by Internship Post:</label>
          <select
            id="filterPost"
            value={filterPost}
            onChange={(e) => setFilterPost(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            {uniquePosts.map((post) => (
              <option key={post} value={post}>
                {post}
              </option>
            ))}
          </select>
        </div>
        <Table data={filteredApplications} columns={columns} />
        {isModalOpen && selectedApplication && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <h2 className="text-2xl font-bold">Applicant Details</h2>
            <p>Name: {selectedApplication.applicantName}</p>
            <p>Internship Post: {selectedApplication.internshipPost}</p>
            <p>Status: {selectedApplication.status}</p>
            <p>CV: <a href={selectedApplication.cv} target="_blank" rel="noopener noreferrer">View CV</a></p>
            <p>Cover Letter: <a href={selectedApplication.coverLetter} target="_blank" rel="noopener noreferrer">View Cover Letter</a></p>
          </Modal>
        )}
        {isStatusModalOpen && applicationToUpdate && (
          <Modal onClose={() => setIsStatusModalOpen(false)}>
            <h2 className="text-2xl font-bold">Update Status</h2>
            <p>Applicant: {applicationToUpdate.applicantName}</p>
            <p>Current Status: {applicationToUpdate.status}</p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="finalized">Finalized</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button
              onClick={() => {
                setApplications(
                  applications.map((app) =>
                    app.id === applicationToUpdate.id ? { ...app, status: newStatus } : app
                  )
                );
                setIsStatusModalOpen(false);
              }}
              className="mt-4"
            >
              Save
            </Button>
            <Button onClick={() => setIsStatusModalOpen(false)} className="mt-2">
              Cancel
            </Button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Applications;