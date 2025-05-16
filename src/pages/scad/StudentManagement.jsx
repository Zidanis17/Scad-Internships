import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/ToastContext';
import { jsPDF } from 'jspdf';

// Dummy data
const dummyStudents = [
  {
    id: 'STU-001',
    name: 'Ahmed Hassan',
    major: 'Computer Science',
    internshipStatus: 'Active',
    profile: {
      email: 'ahmed.hassan@example.com',
      phone: '123-456-7890',
      resume: 'resume.pdf',
      portfolio: 'portfolio.pdf',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      education: 'BSc Computer Science, Cairo University',
      experience: '1 year internship at Tech Solutions Inc.'
    },
  },
  {
    id: 'STU-002',
    name: 'Fatima Ali',
    major: 'Media Engineering',
    internshipStatus: 'None',
    profile: {
      email: 'fatima.ali@example.com',
      phone: '987-654-3210',
      resume: 'resume.pdf',
      portfolio: 'portfolio.pdf',
      skills: ['UI/UX Design', 'Adobe Creative Suite', 'Video Editing'],
      education: 'BA Media Engineering, Alexandria University',
      experience: 'Freelance Graphic Designer'
    },
  },
];

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      setStudents(dummyStudents);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredStudents = students.filter(
    (student) => statusFilter === '' || student.internshipStatus === statusFilter
  );

  // Function to generate and download a resume PDF
  const downloadResume = (student) => {
    const doc = new jsPDF();
    
    // Add styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(student.name, 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Email: ${student.profile.email}`, 20, 35);
    doc.text(`Phone: ${student.profile.phone}`, 20, 45);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Education", 20, 60);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(student.profile.education, 20, 70);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Skills", 20, 85);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    student.profile.skills.forEach((skill, index) => {
      doc.text(`• ${skill}`, 20, 95 + (index * 10));
    });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    const experienceY = 95 + (student.profile.skills.length * 10) + 10;
    doc.text("Experience", 20, experienceY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(student.profile.experience, 20, experienceY + 10);
    
    // Save PDF
    doc.save(`${student.name.replace(/\s+/g, '_')}_Resume.pdf`);
    toast.success(`Resume for ${student.name} downloaded successfully!`);
  };

  // Function to generate and download a portfolio PDF
  const downloadPortfolio = (student) => {
    const doc = new jsPDF();
    
    // Add styling for portfolio
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(`${student.name} - Portfolio`, 20, 20);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Major: ${student.major}`, 20, 35);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("About Me", 20, 50);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`I am a ${student.major} student with interests in ${student.profile.skills.join(', ')}.`, 20, 60);
    doc.text("This portfolio showcases my projects and achievements.", 20, 70);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Projects", 20, 90);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    
    // Generate some dummy projects based on the student's major
    let projects = [];
    if (student.major === "Computer Science") {
      projects = [
        "Personal Website - Built with React and Node.js",
        "E-commerce Platform - Full-stack application using MERN stack",
        "Mobile Weather App - Cross-platform app built with React Native"
      ];
    } else if (student.major === "Media Engineering") {
      projects = [
        "Brand Identity Design - Created logo and visual identity for local business",
        "Short Film - Directed and edited a 10-minute documentary",
        "Social Media Campaign - Designed graphics for awareness campaign"
      ];
    }
    
    projects.forEach((project, index) => {
      doc.text(`• ${project}`, 20, 100 + (index * 10));
    });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    const contactY = 100 + (projects.length * 10) + 15;
    doc.text("Contact Information", 20, contactY);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Email: ${student.profile.email}`, 20, contactY + 10);
    doc.text(`Phone: ${student.profile.phone}`, 20, contactY + 20);
    
    // Save PDF
    doc.save(`${student.name.replace(/\s+/g, '_')}_Portfolio.pdf`);
    toast.success(`Portfolio for ${student.name} downloaded successfully!`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="mt-2">View and manage student profiles</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-1/4 p-2 border rounded-md"
          >
            <option value="">Internship Status</option>
            <option value="Active">Active</option>
            <option value="None">None</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Students</h2>
          {filteredStudents.length > 0 ? (
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedStudent(student)}
                >
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">Major: {student.major}</p>
                  <p className="text-sm text-gray-600">
                    Internship Status: {student.internshipStatus}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No students found</p>
          )}
        </div>
      </div>

      {/* Modal for Student Profile */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedStudent.name}</h2>
            <p className="text-gray-600">Major: {selectedStudent.major}</p>
            <p className="text-gray-600 mt-2">
              Internship Status: {selectedStudent.internshipStatus}
            </p>
            <p className="text-gray-600 mt-2">Email: {selectedStudent.profile.email}</p>
            <p className="text-gray-600 mt-2">Phone: {selectedStudent.profile.phone}</p>
            
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Resume: {selectedStudent.profile.resume}</p>
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadResume(selectedStudent);
                  }}
                >
                  Download Resume
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Portfolio: {selectedStudent.profile.portfolio}</p>
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadPortfolio(selectedStudent);
                  }}
                >
                  Download Portfolio
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;