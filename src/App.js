import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import InternshipCard from './components/internship/InternshipCard';
import ApplicationForm from './components/application/ApplicationForm';

const App = () => {
  const mockInternship = {
    jobTitle: 'Software Engineer Intern',
    companyName: 'Tech Corp',
    duration: '3 months',
    isPaid: true,
    salary: '$2000/month',
    skills: ['JavaScript', 'React', 'Node.js'],
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar userRole="student" />
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-4">Testing Components</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InternshipCard internship={mockInternship} />
            <ApplicationForm onSubmit={(data) => console.log('Application Submitted:', data)} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;