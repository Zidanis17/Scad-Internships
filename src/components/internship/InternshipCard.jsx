import React from 'react';
import Button from '../common/Button';

const InternshipCard = ({ internship, onSelect }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold text-gray-800">{internship.jobTitle}</h3>
      <p className="text-gray-600 mt-1">{internship.companyName}</p>
      <ul className="mt-3 space-y-1 text-sm text-gray-700">
        <li>Duration: {internship.duration}</li>
        <li>{internship.isPaid ? `Paid: ${internship.salary}` : 'Unpaid'}</li>
        <li>Skills: {internship.skills.join(', ')}</li>
      </ul>
      <Button variant="primary" className="mt-4 w-full" onClick={() => onSelect(internship)}>View Details</Button>
    </div>
  );
};

export default InternshipCard;