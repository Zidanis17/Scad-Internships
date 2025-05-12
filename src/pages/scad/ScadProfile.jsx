import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';

// Dummy data for SCAD officer profile
const dummyProfileData = {
  officerId: 'SCAD-001',
  name: 'Sarah Mahmoud',
  email: 'sarah.mahmoud@guc.edu.eg',
  phone: '+20 987 654 3210',
  role: 'SCAD Officer',
  department: 'Student Career and Alumni Development',
  permissions: [
    'Pro Student Profiles',
    'Career Guidance',
    'Company Applications',
    'Internship Cycles',
    'Statistics'
  ],
  profileCompletion: 90
};

const ScadProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile(dummyProfileData);
      setIsLoading(false);
    }, 500);
  }, []);

  const openEditModal = () => {
    setFormData({
      ...profile,
      permissions: profile?.permissions?.join(', ') || ''
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.department) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const permissionsArray = formData.permissions
      ? formData.permissions.split(',').map(p => p.trim()).filter(p => p)
      : [];
    const updatedProfile = {
      ...formData,
      permissions: permissionsArray,
      profileCompletion: Math.min((formData.profileCompletion || 0) + 5, 100)
    };
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
    alert('Profile updated successfully!');
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
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2">Manage your SCAD officer profile</p>
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
              onClick={openEditModal}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Officer ID</p>
              <p className="text-gray-900">{profile.officerId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-gray-900">{profile.name}</p>
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
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-gray-900">{profile.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="text-gray-900">{profile.department}</p>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Permissions</h2>
            <Button
              onClick={openEditModal}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </Button>
          </div>
          {profile.permissions && profile.permissions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.permissions.map((permission, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                >
                  {permission}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No permissions assigned</p>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <Input
            label="Officer ID"
            name="officerId"
            value={formData.officerId || ''}
            onChange={handleInputChange}
            disabled
          />
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
            label="Role"
            name="role"
            value={formData.role || ''}
            onChange={handleInputChange}
            disabled
          />
          <Input
            label="Department"
            name="department"
            value={formData.department || ''}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Permissions (comma-separated)"
            name="permissions"
            value={formData.permissions || ''}
            onChange={handleInputChange}
            placeholder="e.g., Pro Student Profiles, Career Guidance"
          />
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
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

export default ScadProfile;
