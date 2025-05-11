import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import InternshipList from '../../components/internship/InternshipList';
import InternshipForm from '../../components/internship/InternshipForm';

// Dummy internship data
const dummyInternships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Tech Solutions Inc.',
    industry: 'Information Technology',
    duration: '3 months',
    isPaid: true,
    salary: '8000 EGP/month',
    location: 'Cairo, Egypt',
    skills: ['JavaScript', 'React', 'Node.js'],
    description: 'Looking for a passionate software engineering intern to join our development team for the summer. You will work on real-world projects and gain hands-on experience with our tech stack.',
    deadline: '2025-06-15',
    createdAt: '2025-05-01',
    applications: 12
  },
  {
    id: 2,
    title: 'Marketing Intern',
    company: 'Global Marketing Agency',
    industry: 'Marketing',
    duration: '2 months',
    isPaid: true,
    salary: '6000 EGP/month',
    location: 'Alexandria, Egypt',
    skills: ['Social Media Marketing', 'Content Creation', 'Analytics'],
    description: 'Join our marketing team to help create and execute digital marketing campaigns. You will learn about market research, campaign planning, and performance analysis.',
    deadline: '2025-06-10',
    createdAt: '2025-05-02',
    applications: 8
  },
  {
    id: 3,
    title: 'Data Analysis Intern',
    company: 'DataInsights Corp.',
    industry: 'Data Analytics',
    duration: '4 months',
    isPaid: true,
    salary: '10000 EGP/month',
    location: 'Cairo, Egypt',
    skills: ['Python', 'SQL', 'Data Visualization', 'Statistics'],
    description: 'We are seeking a detail-oriented data analysis intern to help our team process and analyze large datasets. You will work on real business problems and present insights to stakeholders.',
    deadline: '2025-06-20',
    createdAt: '2025-05-03',
    applications: 15
  },
  {
    id: 4,
    title: 'Graphic Design Intern',
    company: 'Creative Studios',
    industry: 'Design',
    duration: '3 months',
    isPaid: false,
    salary: '',
    location: 'Cairo, Egypt',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'UI/UX Design'],
    description: 'Join our creative team to work on branding, digital media, and print design projects. This is an excellent opportunity to build your portfolio with real client work.',
    deadline: '2025-06-25',
    createdAt: '2025-05-04',
    applications: 20
  },
  {
    id: 5,
    title: 'Finance Intern',
    company: 'Investment Bank Egypt',
    industry: 'Finance',
    duration: '6 months',
    isPaid: true,
    salary: '12000 EGP/month',
    location: 'Cairo, Egypt',
    skills: ['Financial Analysis', 'Excel', 'Financial Modeling'],
    description: 'We are looking for a finance intern to assist our investment banking team. You will help with financial analysis, research, and preparing client presentations.',
    deadline: '2025-06-30',
    createdAt: '2025-05-05',
    applications: 18
  }
];

const InternshipPosts = () => {
  const [internships, setInternships] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);

  useEffect(() => {
    // Simulate API call with dummy data
    setInternships(dummyInternships);
  }, []);

  const handleCreate = () => {
    setCurrentInternship(null);
    setIsModalOpen(true);
  };

  const handleEdit = (internship) => {
    setCurrentInternship(internship);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setInternships(internships.filter((internship) => internship.id !== id));
  };

  const handleFormSubmit = (data) => {
    if (currentInternship) {
      // Update existing internship
      const updatedInternship = { ...currentInternship, ...data };
      setInternships(
        internships.map((internship) =>
          internship.id === updatedInternship.id ? updatedInternship : internship
        )
      );
    } else {
      // Create new internship
      const newInternship = {
        id: Math.max(...internships.map(i => i.id), 0) + 1,
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
        applications: 0
      };
      setInternships([...internships, newInternship]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Internship Posts</h1>
          <Button
            onClick={handleCreate}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Create New Post
          </Button>
        </div>
        <InternshipList
          internships={internships}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <InternshipForm
              internship={currentInternship}
              onSubmit={handleFormSubmit}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default InternshipPosts;