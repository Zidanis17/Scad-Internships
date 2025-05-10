import React from 'react';

// Application Components
const ApplicationCard = ({ application }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    finalized: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="font-semibold">{application.studentName}</p>
      <p>{application.internshipTitle}</p>
      <span className={`inline-block px-2 py-1 text-sm rounded ${statusColors[application.status] || 'bg-gray-100 text-gray-800'}`}>
        {application.status}
      </span>
    </div>
  );
};

export default ApplicationCard;