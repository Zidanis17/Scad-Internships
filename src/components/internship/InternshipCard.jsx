import React from 'react';
import Button from '../common/Button';

const InternshipCard = ({ internship }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold">{internship.jobTitle}</h3>
      <p className="text-gray-600">{internship.companyName}</p>
      <ul className="mt-2 text-sm text-gray-700">
        <li>Duration: {internship.duration}</li>
        <li>{internship.isPaid ? `Paid: ${internship.salary}` : 'Unpaid'}</li>
        <li>Skills: {internship.skills.join(', ')}</li>
      </ul>
      <Button variant="primary" className="mt-4" onClick={() => alert(`Viewing details for ${internship.jobTitle}`)}>View Details</Button>
    </div>
  );
};

export default InternshipCard;