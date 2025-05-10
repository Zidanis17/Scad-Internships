import React from 'react';
import ApplicationCard from './ApplicationCard';

const ApplicationList = ({ applications }) => {
  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationList;