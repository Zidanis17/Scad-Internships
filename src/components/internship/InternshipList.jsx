import React from 'react';
import InternshipCard from './InternshipCard';

const InternshipList = ({ internships, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {internships.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default InternshipList;