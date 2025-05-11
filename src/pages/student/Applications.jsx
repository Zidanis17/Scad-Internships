import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

// Dummy data with uploadedDocuments field
const dummyApplications = [
  {
    id: 1,
    internshipTitle: 'Software Engineering Intern',
    companyName: 'Tech Solutions Inc.',
    status: 'accepted',
    applicationDate: '2025-05-01',
    documents: ['CV.pdf', 'Cover Letter.pdf'],
    uploadedDocuments: []
  },
  {
    id: 2,
    internshipTitle: 'Data Analysis Intern',
    companyName: 'DataInsights Corp.',
    status: 'pending',
    applicationDate: '2025-05-05',
    documents: ['CV.pdf'],
    uploadedDocuments: []
  },
  {
    id: 3,
    internshipTitle: 'UX Research Intern',
    companyName: 'Digital UX Lab',
    status: 'rejected',
    applicationDate: '2025-04-20',
    documents: ['CV.pdf', 'Portfolio.pdf'],
    uploadedDocuments: []
  }
];

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Load dummy data on mount
  useEffect(() => {
    setApplications(dummyApplications);
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplicationId(application.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplicationId(null);
    setUploadMessage('');
  };

  // Handle file selection and simulate upload by updating state
  const handleUploadDocuments = (applicationId, files) => {
    if (files.length === 0) {
      setUploadMessage('No files selected');
      setTimeout(() => setUploadMessage(''), 3000);
      return;
    }
    const fileNames = Array.from(files).map(file => file.name);
    setApplications(prevApplications =>
      prevApplications.map(app =>
        app.id === applicationId
          ? { ...app, uploadedDocuments: [...app.uploadedDocuments, ...fileNames] }
          : app
      )
    );
    setUploadMessage('Documents uploaded successfully');
    setTimeout(() => setUploadMessage(''), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="mt-2">Track and manage your internship applications</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Internship</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Company</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Applied On</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{app.internshipTitle}</td>
                      <td className="py-3 px-4 text-gray-600">{app.companyName}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            app.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : app.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{app.applicationDate}</td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => handleViewDetails(app)}
                          className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1 px-3"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">You haven’t applied to any internships yet.</p>
          )}
        </div>

        {/* Modal for Application Details */}
        {selectedApplicationId && (() => {
          const selectedApplication = applications.find(app => app.id === selectedApplicationId);
          if (!selectedApplication) return null;
          return (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${
                isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Application Details</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-4">
                  <p><strong className="text-gray-700">Internship:</strong> {selectedApplication.internshipTitle}</p>
                  <p><strong className="text-gray-700">Company:</strong> {selectedApplication.companyName}</p>
                  <p>
                    <strong className="text-gray-700">Status:</strong>{' '}
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </p>
                  <p><strong className="text-gray-700">Applied On:</strong> {selectedApplication.applicationDate}</p>
                  <div>
                    <strong className="text-gray-700">Initial Documents:</strong>
                    {selectedApplication.documents.length > 0 ? (
                      <ul className="list-disc ml-5 mt-1 text-gray-600">
                        {selectedApplication.documents.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 mt-1">No initial documents.</p>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-700">Additional Documents:</strong>
                    {selectedApplication.uploadedDocuments && selectedApplication.uploadedDocuments.length > 0 ? (
                      <ul className="list-disc ml-5 mt-1 text-gray-600">
                        {selectedApplication.uploadedDocuments.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 mt-1">No additional documents uploaded.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mt-4">Upload Additional Documents</h3>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleUploadDocuments(selectedApplication.id, e.target.files)}
                      className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploadMessage && (
                      <p className={`mt-2 ${uploadMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                        {uploadMessage}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleCloseModal}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Applications;