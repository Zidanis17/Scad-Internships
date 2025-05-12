import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

// Dummy data for Pro Student profile
const dummyProfileData = {
  name: 'Ahmed Hassan',
  id: '41-12345',
  email: 'ahmed.hassan@guc.edu.eg',
  major: 'Computer Science',
  semester: 8,
  phone: '+20 123 456 7890',
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  education: [
    {
      id: 1,
      degree: 'B.Sc. in Computer Science',
      institution: 'German University in Cairo',
      startYear: 2021,
      endYear: 2025
    }
  ],
  internships: [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Tech Solutions Inc.',
      duration: '3 months',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      description: 'Developed web applications using React and Node.js.'
    }
  ],
  profileCompletion: 85,
  isPro: true
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSection, setEditSection] = useState('');
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(dummyProfileData);
      setIsLoading(false);
    }, 500);
  }, []);

  const openEditModal = (section, initialData) => {
    setEditSection(section);
    setFormData(initialData);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Update profile based on section
    let updatedProfile = { ...profile };
    switch (editSection) {
      case 'personal':
        updatedProfile = {
          ...updatedProfile,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          major: formData.major,
          semester: formData.semester
        };
        break;
      case 'skills':
        updatedProfile.skills = formData.skills.split(',').map(skill => skill.trim());
        break;
      case 'education':
        updatedProfile.education = updatedProfile.education.map(edu =>
          edu.id === formData.id ? formData : edu
        );
        break;
      case 'internship':
        updatedProfile.internships = updatedProfile.internships.map(intern =>
          intern.id === formData.id ? formData : intern
        );
        break;
      default:
        break;
    }

    // Simulate profile completion increase
    updatedProfile.profileCompletion = Math.min(
      updatedProfile.profileCompletion + 5,
      100
    );

    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  const validateForm = () => {
    if (editSection === 'personal') {
      if (!formData.name || !formData.email || !formData.phone || !formData.major || !formData.semester) {
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        return false;
      }
    } else if (editSection === 'skills') {
      if (!formData.skills || formData.skills.trim() === '') {
        return false;
      }
    } else if (editSection === 'education') {
      if (!formData.degree || !formData.institution || !formData.startYear || !formData.endYear) {
        return false;
      }
    } else if (editSection === 'internship') {
      if (!formData.title || !formData.company || !formData.duration || !formData.startDate || !formData.endDate || !formData.description) {
        return false;
      }
    }
    return true;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Error loading profile</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {profile.isPro && (
              <span className="ml-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                PRO
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
            )}
          </div>
          <p className="mt-2">Manage your personal and professional information</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Completion</h2>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{profile.profileCompletion}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${profile.profileCompletion}%` }}
            ></div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            <Button
              onClick={() =>
                openEditModal('personal', {
                  name: profile.name,
                  email: profile.email,
                  phone: profile.phone,
                  major: profile.major,
                  semester: profile.semester
                })
              }
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-gray-900">{profile.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Student ID</p>
              <p className="text-gray-900">{profile.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{profile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Major</p>
              <p className="text-gray-900">{profile.major}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Semester</p>
              <p className="text-gray-900">{profile.semester}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            <Button
              onClick={() => openEditModal('skills', { skills: profile.skills.join(', ') })}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
          </div>
          {profile.education.map((edu) => (
            <div key={edu.id} className="mb-4 last:mb-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-900 font-medium">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
                <Button
                  onClick={() => openEditModal('education', { ...edu })}
                  className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Internship History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Internship History</h2>
          </div>
          {profile.internships.length > 0 ? (
            profile.internships.map((intern) => (
              <div key={intern.id} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-medium">{intern.title}</p>
                    <p className="text-gray-600">{intern.company}</p>
                    <p className="text-sm text-gray-500">
                      {intern.startDate} - {intern.endDate} ({intern.duration})
                    </p>
                    <p className="text-gray-600 mt-1">{intern.description}</p>
                  </div>
                  <Button
                    onClick={() => openEditModal('internship', { ...intern })}
                    className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No internships added yet.</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${editSection.charAt(0).toUpperCase() + editSection.slice(1)}`}
      >
        <div className="space-y-4">
          {editSection === 'personal' && (
            <>
              <Input
                label="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Major"
                name="major"
                value={formData.major || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Semester"
                name="semester"
                type="number"
                value={formData.semester || ''}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          {editSection === 'skills' && (
            <Input
              label="Skills (comma-separated)"
              name="skills"
              value={formData.skills || ''}
              onChange={handleInputChange}
              placeholder="e.g., JavaScript, React, Node.js"
              required
            />
          )}
          {editSection === 'education' && (
            <>
              <Input
                label="Degree"
                name="degree"
                value={formData.degree || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Institution"
                name="institution"
                value={formData.institution || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Start Year"
                name="startYear"
                type="number"
                value={formData.startYear || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="End Year"
                name="endYear"
                type="number"
                value={formData.endYear || ''}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          {editSection === 'internship' && (
            <>
              <Input
                label="Title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Company"
                name="company"
                value={formData.company || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Duration"
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate || ''}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                required
                multiline
              />
            </>
          )}
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
