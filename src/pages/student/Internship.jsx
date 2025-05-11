import React, { useState, useEffect } from 'react';
import InternshipList from '../../components/internship/InternshipList';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

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
    description: 'Work on developing and maintaining web applications using React and Node.js.',
    skillsRequired: ['JavaScript', 'React', 'Node.js'],
    deadline: '2025-06-15',
    postedAt: '2025-05-01'
  },
  {
    id: 2,
    title: 'Data Analysis Intern',
    company: 'DataInsights Corp.',
    industry: 'Data Analytics',
    duration: '4 months',
    isPaid: true,
    salary: '10000 EGP/month',
    description: 'Analyze large datasets to provide actionable insights.',
    skillsRequired: ['Python', 'SQL', 'Excel'],
    deadline: '2025-06-20',
    postedAt: '2025-05-03'
  },
  {
    id: 3,
    title: 'UX Research Intern',
    company: 'Digital UX Lab',
    industry: 'UX/UI Design',
    duration: '3 months',
    isPaid: false,
    salary: null,
    description: 'Conduct user research and usability testing.',
    skillsRequired: ['User Research', 'Figma'],
    deadline: '2025-06-25',
    postedAt: '2025-05-05'
  }
];

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ industry: '', duration: '', isPaid: '' });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching internships
    setInternships(dummyInternships);
  }, []);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = filters.industry ? internship.industry === filters.industry : true;
    const matchesDuration = filters.duration ? internship.duration === filters.duration : true;
    const matchesPaid = filters.isPaid !== '' ? internship.isPaid.toString() === filters.isPaid : true;
    return matchesSearch && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleSelectInternship = (internship) => {
    setSelectedInternship(internship);
    setIsDetailsModalOpen(true);
  };

  const handleApply = () => {
    setIsDetailsModalOpen(false);
    setIsApplicationModalOpen(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Application submitted:', {
      internshipId: selectedInternship.id,
      coverLetter: formData.get('coverLetter'),
      cv: formData.get('cv')
    });
    setIsApplicationModalOpen(false);
    alert('Application submitted successfully!');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Available Internships</h1>
      <div className="mb-6 flex flex-wrap gap-4">
        <Input
          placeholder="Search by title or company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3"
        />
        <select
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">All Industries</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="UX/UI Design">UX/UI Design</option>
        </select>
        <select
          value={filters.duration}
          onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">All Durations</option>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
        </select>
        <select
          value={filters.isPaid}
          onChange={(e) => setFilters({ ...filters, isPaid: e.target.value })}
          className="border rounded px-2 py-1"
        >
          <option value="">Paid/Unpaid</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>

      <InternshipList internships={filteredInternships} onSelect={handleSelectInternship} />

      {selectedInternship && (
        <Modal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title={selectedInternship.title}
        >
          <div>
            <p><strong>Company:</strong> {selectedInternship.company}</p>
            <p><strong>Industry:</strong> {selectedInternship.industry}</p>
            <p><strong>Duration:</strong> {selectedInternship.duration}</p>
            <p><strong>Paid:</strong> {selectedInternship.isPaid ? `Yes, ${selectedInternship.salary}` : 'No'}</p>
            <p><strong>Description:</strong> {selectedInternship.description}</p>
            <p><strong>Skills Required:</strong> {selectedInternship.skillsRequired.join(', ')}</p>
            <p><strong>Deadline:</strong> {selectedInternship.deadline}</p>
            <div className="mt-4">
              <Button onClick={handleApply}>Apply Now</Button>
            </div>
          </div>
        </Modal>
      )}

      {isApplicationModalOpen && (
        <Modal
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          title={`Apply for ${selectedInternship?.title}`}
        >
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Cover Letter</label>
              <input type="file" name="coverLetter" accept=".pdf,.doc,.docx" className="w-full" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">CV</label>
              <input type="file" name="cv" accept=".pdf,.doc,.docx" className="w-full" required />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Internships;