import React from 'react';
import Button from '../common/Button';

const ReportCard = ({ report, onView, onEdit, onPrintPDF, userRole }) => {
  // Status color mapping
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    flagged: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
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
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColors[report.status]}`}>
          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
        </span>
      </div>

      <div className="mt-4 flex-grow">
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

      <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => onView(report.id)}
        >
          View Report
        </Button>
        
        {/* Only show edit button if report is not accepted and user is a student */}
        {(userRole === 'student' || userRole === 'proStudent') && 
          report.status !== 'accepted' && (
            <Button 
              variant="secondary"
              size="sm" 
              onClick={() => onEdit(report.id)}
            >
              Edit Report
            </Button>
        )}
        
        <Button 
          variant="outline"
          size="sm" 
          onClick={() => onPrintPDF(report.id)}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;