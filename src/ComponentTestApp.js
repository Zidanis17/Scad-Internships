// src/ComponentTestApp.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Common Components
import Button from './components/common/Button';
import Input from './components/common/Input';
import Modal from './components/common/Modal';
import Table from './components/common/Table';

// Internship Components
import InternshipCard from './components/internship/InternshipCard';
import InternshipForm from './components/internship/InternshipForm';
import InternshipList from './components/internship/InternshipList';

// Application Components
import ApplicationCard from './components/application/ApplicationCard';
import ApplicationForm from './components/application/ApplicationForm';
import ApplicationList from './components/application/ApplicationList';

// Report Components
import ReportCard from './components/report/ReportCard';
import ReportForm from './components/report/ReportForm';
import ReportList from './components/report/ReportList';

// Evaluation Components
import EvaluationForm from './components/evaluation/EvaluationForm';
import EvaluationList from './components/evaluation/EvaluationList';

// Statistics Components
import Charts from './components/statistics/Charts';

// Navigation Components
import Navbar from './components/navigation/Navbar';

// Auth Context Provider
import { AuthContext } from './context/AuthContext';

// Mock Data
const mockInternship = {
  id: 'internship-1',
  title: 'Software Engineer Intern',
  company: 'Tech Company',
  description: 'A great internship opportunity for students interested in software development.',
  requirements: 'React, JavaScript, Node.js',
  location: 'Cairo, Egypt',
  startDate: '2025-06-01',
  endDate: '2025-08-31',
  paid: true,
  salary: 5000,
  applicationDeadline: '2025-05-15',
};

const mockApplication = {
  id: 'application-1',
  internshipId: 'internship-1',
  studentId: 'student-1',
  status: 'pending',
  appliedDate: '2025-04-20',
  resume: 'resume-url',
  coverLetter: 'I am interested in this internship opportunity...',
};

const mockReport = {
  id: 'report-1',
  internshipId: 'internship-1',
  studentId: 'student-1',
  title: 'Weekly Progress Report',
  content: 'This week I worked on implementing the user authentication system...',
  submissionDate: '2025-06-15',
  status: 'submitted',
  feedback: '',
};

const mockEvaluation = {
  id: 'evaluation-1',
  internshipId: 'internship-1',
  studentId: 'student-1',
  companyId: 'company-1',
  rating: 4,
  comments: 'The student demonstrated excellent problem-solving skills.',
  submissionDate: '2025-08-31',
};

const mockUser = {
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'student',
};

const mockAuthContext = {
  user: mockUser,
  isAuthenticated: true,
  login: () => console.log('Login called'),
  logout: () => console.log('Logout called'),
};

// Table data
const mockTableData = [
  { id: 1, name: 'Internship 1', company: 'Company A', status: 'Open' },
  { id: 2, name: 'Internship 2', company: 'Company B', status: 'Closed' },
  { id: 3, name: 'Internship 3', company: 'Company C', status: 'Open' },
];

const mockTableColumns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Company', accessor: 'company' },
  { header: 'Status', accessor: 'status' },
];

// Chart data
const mockChartData = [
  { month: 'Jan', applications: 65 },
  { month: 'Feb', applications: 59 },
  { month: 'Mar', applications: 80 },
  { month: 'Apr', applications: 81 },
  { month: 'May', applications: 56 },
];

function ComponentTestApp() {
  const [showModal, setShowModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState('common');

  const renderComponentSection = (title, components) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components}
      </div>
    </div>
  );

  return (
    <AuthContext.Provider value={mockAuthContext}>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Component Test Page</h1>
            
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {['common', 'internship', 'application', 'report', 'evaluation', 'other'].map((section) => (
                  <button
                    key={section}
                    onClick={() => setActiveComponent(section)}
                    className={`px-4 py-2 rounded ${
                      activeComponent === section
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {activeComponent === 'common' && (
              <>
                {renderComponentSection('Common Components', (
                  <>
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold mb-2">Button Component</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => alert('Primary button clicked')}>Primary Button</Button>
                        <Button variant="secondary" onClick={() => alert('Secondary button clicked')}>Secondary Button</Button>
                        <Button variant="danger" onClick={() => alert('Danger button clicked')}>Danger Button</Button>
                        <Button disabled>Disabled Button</Button>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold mb-2">Input Component</h3>
                      <Input 
                        label="Text Input" 
                        placeholder="Enter text" 
                        onChange={(e) => console.log(e.target.value)} 
                      />
                      <Input 
                        label="Email Input" 
                        type="email" 
                        placeholder="Enter email" 
                      />
                      <Input 
                        label="Password Input" 
                        type="password" 
                        placeholder="Enter password" 
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold mb-2">Modal Component</h3>
                      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
                      <Modal 
                        isOpen={showModal} 
                        onClose={() => setShowModal(false)}
                        title="Example Modal"
                      >
                        <p>This is the content of the modal dialog.</p>
                        <div className="mt-4 flex justify-end">
                          <Button onClick={() => setShowModal(false)}>Close</Button>
                        </div>
                      </Modal>
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Table Component</h3>
                      <Table 
                        data={mockTableData}
                        columns={mockTableColumns}
                        onRowClick={(row) => console.log('Row clicked:', row)}
                      />
                    </div>
                  </>
                ))}
              </>
            )}

            {activeComponent === 'internship' && (
              <>
                {renderComponentSection('Internship Components', (
                  <>
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold mb-2">Internship Card</h3>
                      <InternshipCard 
                        internship={mockInternship}
                        onApply={() => console.log('Apply clicked')}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Internship Form</h3>
                      <InternshipForm 
                        initialData={mockInternship}
                        onSubmit={(data) => console.log('Form submitted:', data)}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Internship List</h3>
                      <InternshipList 
                        internships={[mockInternship, {...mockInternship, id: 'internship-2', title: 'Data Science Intern'}]}
                        onInternshipClick={(internship) => console.log('Internship clicked:', internship)}
                      />
                    </div>
                  </>
                ))}
              </>
            )}

            {activeComponent === 'application' && (
              <>
                {renderComponentSection('Application Components', (
                  <>
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold mb-2">Application Card</h3>
                      <ApplicationCard 
                        application={mockApplication}
                        onViewDetails={() => console.log('View details clicked')}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Application Form</h3>
                      <ApplicationForm 
                        internship={mockInternship}
                        onSubmit={(data) => console.log('Form submitted:', data)}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Application List</h3>
                      <ApplicationList 
                        applications={[mockApplication, {...mockApplication, id: 'application-2', status: 'accepted'}]}
                        onApplicationClick={(application) => console.log('Application clicked:', application)}
                      />
                    </div>
                  </>
                ))}
              </>
            )}

            {activeComponent === 'report' && (
              <>
                {renderComponentSection('Report Components', (
                  <>
                    <div className="bg-white p-4 rounded shadow">
                      <h3 className="font-bold mb-2">Report Card</h3>
                      <ReportCard 
                        report={mockReport}
                        onViewDetails={() => console.log('View details clicked')}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Report Form</h3>
                      <ReportForm 
                        internship={mockInternship}
                        onSubmit={(data) => console.log('Form submitted:', data)}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Report List</h3>
                      <ReportList 
                        reports={[mockReport, {...mockReport, id: 'report-2', title: 'Monthly Report'}]}
                        onReportClick={(report) => console.log('Report clicked:', report)}
                      />
                    </div>
                  </>
                ))}
              </>
            )}

            {activeComponent === 'evaluation' && (
              <>
                {renderComponentSection('Evaluation Components', (
                  <>
                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Evaluation Form</h3>
                      <EvaluationForm 
                        internship={mockInternship}
                        student={mockUser}
                        onSubmit={(data) => console.log('Form submitted:', data)}
                      />
                    </div>

                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Evaluation List</h3>
                      <EvaluationList 
                        evaluations={[mockEvaluation, {...mockEvaluation, id: 'evaluation-2', rating: 5}]}
                        onEvaluationClick={(evaluation) => console.log('Evaluation clicked:', evaluation)}
                      />
                    </div>
                  </>
                ))}
              </>
            )}

            {activeComponent === 'other' && (
              <>
                {renderComponentSection('Other Components', (
                  <>
                    <div className="bg-white p-4 rounded shadow col-span-full">
                      <h3 className="font-bold mb-2">Charts Component</h3>
                      <Charts 
                        data={mockChartData}
                        type="bar"
                        xKey="month"
                        yKey="applications"
                        title="Monthly Applications"
                      />
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default ComponentTestApp;