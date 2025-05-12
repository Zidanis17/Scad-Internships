import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

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
    },
  },
];

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStudents(dummyStudents);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredStudents = students.filter(
    (student) => statusFilter === '' || student.internshipStatus === statusFilter
  );

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
                  className="p-4 bg-gray-50 rounded-md cursor-pointer"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedStudent.name}</h2>
            <p className="text-gray-600">Major: {selectedStudent.major}</p>
            <p className="text-gray-600 mt-2">
              Internship Status: {selectedStudent.internshipStatus}
            </p>
            <p className="text-gray-600 mt-2">Email: {selectedStudent.profile.email}</p>
            <p className="text-gray-600 mt-2">Phone: {selectedStudent.profile.phone}</p>
            <p className="text-gray-600 mt-2">Resume: {selectedStudent.profile.resume}</p>
            <p className="text-gray-600 mt-2">Portfolio: {selectedStudent.profile.portfolio}</p>
            <div className="flex justify-end mt-4">
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
