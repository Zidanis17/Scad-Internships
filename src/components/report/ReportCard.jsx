import React from 'react';
import Button from '../common/Button';

const ReportCard = ({ report, onView, onEdit, userRole }) => {
  // Status color mapping
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    flagged: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{report.title}</h3>
          <p className="text-gray-600 text-sm">
            {report.companyName} | {report.jobTitle}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Submitted: {new Date(report.submissionDate).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-700 line-clamp-2">
          {report.introduction}
        </p>
      </div>

      {report.comments && report.status !== 'accepted' && (
        <div className="mt-3 p-2 bg-gray-50 border-l-4 border-gray-300 text-sm">
          <p className="font-semibold">Feedback:</p>
          <p className="text-gray-700">{report.comments}</p>
        </div>
      )}

      <div className="mt-4 flex space-x-2">
        <Button variant="primary" onClick={() => onView(report.id)}>
          View Report
        </Button>
        
        {/* Only show edit button if report is not accepted and user is a student */}
        {(userRole === 'student' || userRole === 'proStudent') && 
          report.status !== 'accepted' && (
            <Button variant="secondary" onClick={() => onEdit(report.id)}>
              Edit Report
            </Button>
        )}
        
        {/* Only show download button */}
        <Button variant="outline" onClick={() => window.open(`/api/reports/${report.id}/pdf`, '_blank')}>
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;