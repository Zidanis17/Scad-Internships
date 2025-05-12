import React, { useState, useEffect, useContext } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { AuthContext } from '../../context/AuthContext';

// Dummy majors data
const majorOptions = [
  { id: 1, name: 'Computer Science', semesterCount: 8 },
  { id: 2, name: 'Computer Engineering', semesterCount: 10 },
  { id: 3, name: 'Electronics Engineering', semesterCount: 10 },
  { id: 4, name: 'Mechatronics Engineering', semesterCount: 10 },
  { id: 5, name: 'Business Informatics', semesterCount: 8 },
  { id: 6, name: 'Architectural Engineering', semesterCount: 10 },
  { id: 7, name: 'Media Engineering', semesterCount: 8 },
];

// Dummy student profile data
const dummyStudentProfile = {
  personalInfo: {
    name: 'Ahmed Hassan',
    id: '41-12345',
    email: 'student@guc.edu.eg',
    phone: '+20 123 456 7890',
    birthDate: '2000-05-15',
    gpa: 3.7,
    major: 1, // Computer Science
    semester: 8,
  },
  jobInterests: [
    'Software Development',
    'Web Development',
    'Data Science',
    'Machine Learning'
  ],
  skills: [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React', level: 'Intermediate' },
    { name: 'Python', level: 'Advanced' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'SQL', level: 'Intermediate' },
    { name: 'Node.js', level: 'Beginner' }
  ],
  previousExperiences: [
    {
      id: 1,
      title: 'Web Development Intern',
      company: 'Cairo Tech',
      duration: '2 months',
      startDate: '2024-06-01',
      endDate: '2024-08-01',
      responsibilities: 'Developed and maintained company website, implemented new features, fixed bugs, and optimized performance.',
      isPaid: true,
      salary: '5000 EGP/month'
    }
  ],
  collegeActivities: [
    {
      id: 1,
      name: 'Google Developer Student Club',
      role: 'Technical Team Member',
      duration: '1 year',
      startDate: '2023-09-01',
      endDate: '2024-05-01',
      description: 'Organized workshops, hackathons, and technical sessions for students.'
    }
  ],
  documents: [
    {
      id: 1,
      name: 'CV',
      fileName: 'ahmed_hassan_cv.pdf',
      uploadDate: '2025-04-20'
    },
    {
      id: 2,
      name: 'Cover Letter',
      fileName: 'ahmed_hassan_cover_letter.pdf',
      uploadDate: '2025-04-20'
    }
  ],
  assessments: [
    {
      id: 1,
      name: 'JavaScript Proficiency',
      score: 85,
      date: '2025-03-15',
      isPublic: true
    },
    {
      id: 2,
      name: 'React Developer Assessment',
      score: 92,
      date: '2025-04-01',
      isPublic: true
    }
  ],
  workshopsAttended: [
    {
      id: 1,
      name: 'Advanced React Patterns',
      date: '2025-02-10',
      certificate: 'react_patterns_cert.pdf'
    },
    {
      id: 2,
      name: 'Technical Interview Preparation',
      date: '2025-03-20',
      certificate: 'interview_prep_cert.pdf'
    }
  ]
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState({});
  const [currentExperience, setCurrentExperience] = useState(null);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [jobInterest, setJobInterest] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [viewingCompanies, setViewingCompanies] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });
  const { userRole, login } = useContext(AuthContext);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setProfile(dummyStudentProfile);
      setIsLoading(false);
      // Set dummy companies that viewed profile (PRO feature)
      setViewingCompanies([
        { name: 'Google Egypt', viewDate: '2025-05-01' },
        { name: 'Vodafone', viewDate: '2025-05-05' },
        { name: 'Microsoft', viewDate: '2025-05-08' }
      ]);
    }, 500);
  }, []);

  useEffect(() => {
    if (profile) {
      const totalDuration = profile.previousExperiences.reduce((total, exp) => {
        const months = parseInt(exp.duration.split(' ')[0], 10) || 0;
        return total + months;
      }, 0);
      const isProStudent = totalDuration >= 3;
      setIsPro(isProStudent);
      if (isProStudent && userRole === 'student') {
        login('proStudent');
      }
    }
  }, [profile, userRole, login]);

  useEffect(() => {
    if (profile && profile.personalInfo.major) {
      const selectedMajor = majorOptions.find(m => m.id === profile.personalInfo.major);
      if (selectedMajor) {
        const semestersList = Array.from(
          { length: selectedMajor.semesterCount },
          (_, i) => i + 1
        );
        setSemesters(semestersList);
      }
    }
  }, [profile]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Handlers for personal info
  const handlePersonalInfoChange = (field, value) => {
    setProfile({
      ...profile,
      personalInfo: { ...profile.personalInfo, [field]: value }
    });
  };

  const handleToggleEditMode = (section) => {
    setEditMode({ ...editMode, [section]: !editMode[section] });
  };

  const handleSaveSection = (section) => {
    handleToggleEditMode(section);
  };

  const handleMajorChange = (majorId) => {
    const majorIdNum = parseInt(majorId, 10);
    handlePersonalInfoChange('major', majorIdNum);
    const selectedMajor = majorOptions.find(m => m.id === majorIdNum);
    if (selectedMajor) {
      const semestersList = Array.from(
        { length: selectedMajor.semesterCount },
        (_, i) => i + 1
      );
      setSemesters(semestersList);
      if (profile.personalInfo.semester > selectedMajor.semesterCount) {
        handlePersonalInfoChange('semester', 1);
      }
    }
  };

  // Handlers for experiences
  const handleAddExperience = () => {
    setCurrentExperience(null);
    setIsExperienceModalOpen(true);
  };

  const handleEditExperience = (experience) => {
    setCurrentExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const handleDeleteExperience = (id) => {
    setProfile({
      ...profile,
      previousExperiences: profile.previousExperiences.filter(exp => exp.id !== id)
    });
  };

  const handleSaveExperience = (experience) => {
    if (currentExperience) {
      setProfile({
        ...profile,
        previousExperiences: profile.previousExperiences.map(exp =>
          exp.id === currentExperience.id ? { ...experience, id: exp.id } : exp
        )
      });
    } else {
      const newExperience = {
        ...experience,
        id: Math.max(0, ...profile.previousExperiences.map(exp => exp.id)) + 1
      };
      setProfile({
        ...profile,
        previousExperiences: [...profile.previousExperiences, newExperience]
      });
    }
    setIsExperienceModalOpen(false);
  };

  // Handlers for activities
  const handleAddActivity = () => {
    setCurrentActivity(null);
    setIsActivityModalOpen(true);
  };

  const handleEditActivity = (activity) => {
    setCurrentActivity(activity);
    setIsActivityModalOpen(true);
  };

  const handleDeleteActivity = (id) => {
    setProfile({
      ...profile,
      collegeActivities: profile.collegeActivities.filter(act => act.id !== id)
    });
  };

  const handleSaveActivity = (activity) => {
    if (currentActivity) {
      setProfile({
        ...profile,
        collegeActivities: profile.collegeActivities.map(act =>
          act.id === currentActivity.id ? { ...activity, id: act.id } : act
        )
      });
    } else {
      const newActivity = {
        ...activity,
        id: Math.max(0, ...profile.collegeActivities.map(act => act.id)) + 1
      };
      setProfile({
        ...profile,
        collegeActivities: [...profile.collegeActivities, newActivity]
      });
    }
    setIsActivityModalOpen(false);
  };

  // Handlers for skills
  const handleSkillChange = (field, value) => {
    setNewSkill({ ...newSkill, [field]: value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.name.trim() === '') return;
    setProfile({
      ...profile,
      skills: [...profile.skills, newSkill]
    });
    setNewSkill({ name: '', level: 'Beginner' });
  };

  const handleDeleteSkill = (skillName) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill.name !== skillName)
    });
  };

  // Handlers for job interests
  const handleAddJobInterest = (e) => {
    e.preventDefault();
    if (jobInterest.trim() === '') return;
    setProfile({
      ...profile,
      jobInterests: [...profile.jobInterests, jobInterest]
    });
    setJobInterest('');
  };

  const handleDeleteJobInterest = (interest) => {
    setProfile({
      ...profile,
      jobInterests: profile.jobInterests.filter(item => item !== interest)
    });
  };

  // Handlers for documents
  const handleAddDocument = () => {
    setCurrentDocument(null);
    setIsDocumentModalOpen(true);
  };

  const handleSaveDocument = (document) => {
    const today = new Date().toISOString().split('T')[0];
    const newDocument = {
      ...document,
      id: Math.max(0, ...profile.documents.map(doc => doc.id)) + 1,
      uploadDate: today
    };
    setProfile({
      ...profile,
      documents: [...profile.documents, newDocument]
    });
    setIsDocumentModalOpen(false);
  };

  const handleDeleteDocument = (id) => {
    setProfile({
      ...profile,
      documents: profile.documents.filter(doc => doc.id !== id)
    });
  };

  // Handlers for assessments (PRO feature)
  const handleToggleAssessmentVisibility = (id) => {
    setProfile({
      ...profile,
      assessments: profile.assessments.map(assessment =>
        assessment.id === id ? { ...assessment, isPublic: !assessment.isPublic } : assessment
      )
    });
  };

  // Modal rendering functions
  const renderExperienceModal = () => (
    <Modal
      isOpen={isExperienceModalOpen}
      onClose={() => setIsExperienceModalOpen(false)}
      title={currentExperience ? "Edit Experience" : "Add Experience"}
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const experience = {
          title: formData.get('title'),
          company: formData.get('company'),
          duration: formData.get('duration'),
          startDate: formData.get('startDate'),
          endDate: formData.get('endDate'),
          responsibilities: formData.get('responsibilities'),
          isPaid: formData.get('isPaid') === 'true',
          salary: formData.get('salary')
        };
        handleSaveExperience(experience);
      }}>
        <div className="space-y-4">
          <Input label="Job Title" name="title" defaultValue={currentExperience?.title || ''} required />
          <Input label="Company" name="company" defaultValue={currentExperience?.company || ''} required />
          <Input label="Duration (e.g., 2 months)" name="duration" defaultValue={currentExperience?.duration || ''} required />
          <Input label="Start Date" name="startDate" type="date" defaultValue={currentExperience?.startDate || ''} required />
          <Input label="End Date" name="endDate" type="date" defaultValue={currentExperience?.endDate || ''} required />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Responsibilities</label>
            <textarea
              name="responsibilities"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="4"
              defaultValue={currentExperience?.responsibilities || ''}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Paid Internship</label>
            <div className="flex items-center">
              <input type="radio" name="isPaid" value="true" defaultChecked={currentExperience?.isPaid} className="mr-2" /> Yes
              <input type="radio" name="isPaid" value="false" defaultChecked={!currentExperience?.isPaid} className="ml-4 mr-2" /> No
            </div>
          </div>
          <Input label="Salary (if paid)" name="salary" defaultValue={currentExperience?.salary || ''} />
          <div className="flex justify-end">
            <Button type="button" onClick={() => setIsExperienceModalOpen(false)} variant="secondary" className="mr-2">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Modal>
  );

  const renderActivityModal = () => (
    <Modal
      isOpen={isActivityModalOpen}
      onClose={() => setIsActivityModalOpen(false)}
      title={currentActivity ? "Edit College Activity" : "Add College Activity"}
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const activity = {
          name: formData.get('name'),
          role: formData.get('role'),
          duration: formData.get('duration'),
          startDate: formData.get('startDate'),
          endDate: formData.get('endDate'),
          description: formData.get('description')
        };
        handleSaveActivity(activity);
      }}>
        <div className="space-y-4">
          <Input label="Activity Name" name="name" defaultValue={currentActivity?.name || ''} required />
          <Input label="Your Role" name="role" defaultValue={currentActivity?.role || ''} required />
          <Input label="Duration (e.g., 1 year)" name="duration" defaultValue={currentActivity?.duration || ''} required />
          <Input label="Start Date" name="startDate" type="date" defaultValue={currentActivity?.startDate || ''} required />
          <Input label="End Date" name="endDate" type="date" defaultValue={currentActivity?.endDate || ''} required />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              rows="4"
              defaultValue={currentActivity?.description || ''}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={() => setIsActivityModalOpen(false)} variant="secondary" className="mr-2">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </Modal>
  );

  const renderDocumentModal = () => (
    <Modal
      isOpen={isDocumentModalOpen}
      onClose={() => setIsDocumentModalOpen(false)}
      title="Upload Document"
    >
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const document = {
          name: formData.get('name'),
          fileName: formData.get('file').name || 'document.pdf'
        };
        handleSaveDocument(document);
      }}>
        <div className="space-y-4">
          <Input label="Document Name" name="name" defaultValue={currentDocument?.name || ''} required />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload File</label>
            <input type="file" name="file" className="w-full" accept=".pdf,.doc,.docx" required />
          </div>
          <div className="flex justify-end">
            <Button type="button" onClick={() => setIsDocumentModalOpen(false)} variant="secondary" className="mr-2">Cancel</Button>
            <Button type="submit">Upload</Button>
          </div>
        </div>
      </form>
    </Modal>
  );

  return (
    <div className="container mx-auto py-6 px-4">
      {isPro && (
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <svg className="h-10 w-10 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <h2 className="text-xl font-bold">PRO Student Status</h2>
              <p>You've completed the required 3 months of internship experience!</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap">
            {['personal', 'skills', 'experience', 'activities', 'documents'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-4 font-medium text-md ${
                  activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/s$/, 's & Interests')}
              </button>
            ))}
            {isPro && ['pro', 'assessments', 'workshops'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-4 font-medium text-md ${
                  activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <Button onClick={() => handleToggleEditMode('personal')}>
                  {editMode.personal ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              {editMode.personal ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" value={profile.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} />
                  <Input label="Student ID" value={profile.personalInfo.id} disabled />
                  <Input label="Email" value={profile.personalInfo.email} disabled />
                  <Input label="Phone Number" value={profile.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} />
                  <Input label="Birth Date" type="date" value={profile.personalInfo.birthDate} onChange={(e) => handlePersonalInfoChange('birthDate', e.target.value)} />
                  <Input label="GPA" type="number" min="0" max="4" step="0.1" value={profile.personalInfo.gpa} onChange={(e) => handlePersonalInfoChange('gpa', parseFloat(e.target.value))} />
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Major</label>
                    <select
                      className="shadow border rounded w-full py-2 px-3 text-gray-700"
                      value={profile.personalInfo.major}
                      onChange={(e) => handleMajorChange(e.target.value)}
                    >
                      {majorOptions.map(major => (
                        <option key={major.id} value={major.id}>{major.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Semester</label>
                    <select
                      className="shadow border rounded w-full py-2 px-3 text-gray-700"
                      value={profile.personalInfo.semester}
                      onChange={(e) => handlePersonalInfoChange('semester', parseInt(e.target.value, 10))}
                    >
                      {semesters.map(sem => (
                        <option key={sem} value={sem}>Semester {sem}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button onClick={() => handleSaveSection('personal')}>Save</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(profile.personalInfo).map(([key, value]) => (
                    <div key={key} className="mb-4">
                      <p className="text-sm font-medium text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</p>
                      <p className="mt-1">{key === 'major' ? majorOptions.find(m => m.id === value)?.name : value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Skills & Interests</h2>
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2">Job Interests</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.jobInterests.map((interest, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                      {interest}
                      <button onClick={() => handleDeleteJobInterest(interest)} className="ml-2 text-red-500 hover:text-red-700">×</button>
                    </span>
                  ))}
                </div>
                <form onSubmit={handleAddJobInterest} className="flex gap-2">
                  <Input value={jobInterest} onChange={(e) => setJobInterest(e.target.value)} placeholder="Add job interest" className="flex-1" />
                  <Button type="submit">Add</Button>
                </form>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Skills</h3>
                <div className="space-y-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <span>{skill.name} - {skill.level}</span>
                      <Button onClick={() => handleDeleteSkill(skill.name)} variant="danger">Delete</Button>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAddSkill} className="space-y-2">
                  <div className="flex gap-2">
                    <Input value={newSkill.name} onChange={(e) => handleSkillChange('name', e.target.value)} placeholder="Skill name" className="flex-1" />
                    <select
                      value={newSkill.level}
                      onChange={(e) => handleSkillChange('level', e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <Button type="submit">Add Skill</Button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Previous Experiences</h2>
              <div className="space-y-4">
                {profile.previousExperiences.map((exp) => (
                  <div key={exp.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">{exp.title} at {exp.company}</h3>
                    <p className="text-sm text-gray-600">{exp.duration} ({exp.startDate} to {exp.endDate})</p>
                    <p className="mt-2">{exp.responsibilities}</p>
                    {exp.isPaid && <p className="mt-1 text-sm text-green-600">Paid: {exp.salary}</p>}
                    <div className="mt-2 flex gap-2">
                      <Button onClick={() => handleEditExperience(exp)} variant="secondary">Edit</Button>
                      <Button onClick={() => handleDeleteExperience(exp.id)} variant="danger">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={handleAddExperience}>Add Experience</Button>
              </div>
              {renderExperienceModal()}
            </div>
          )}

          {activeTab === 'activities' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">College Activities</h2>
              <div className="space-y-4">
                {profile.collegeActivities.map((act) => (
                  <div key={act.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">{act.name} - {act.role}</h3>
                    <p className="text-sm text-gray-600">{act.duration} ({act.startDate} to {act.endDate})</p>
                    <p className="mt-2">{act.description}</p>
                    <div className="mt-2 flex gap-2">
                      <Button onClick={() => handleEditActivity(act)} variant="secondary">Edit</Button>
                      <Button onClick={() => handleDeleteActivity(act.id)} variant="danger">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={handleAddActivity}>Add Activity</Button>
              </div>
              {renderActivityModal()}
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Documents</h2>
              <div className="space-y-4">
                {profile.documents.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-600">Uploaded on {doc.uploadDate}</p>
                    </div>
                    <Button onClick={() => handleDeleteDocument(doc.id)} variant="danger">Delete</Button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={handleAddDocument}>Upload Document</Button>
              </div>
              {renderDocumentModal()}
            </div>
          )}

          {activeTab === 'pro' && isPro && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">PRO Features</h2>
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2">Companies That Viewed Your Profile</h3>
                <div className="space-y-2">
                  {viewingCompanies.map((company, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p>{company.name} - Viewed on {company.viewDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assessments' && isPro && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Assessments</h2>
              <div className="space-y-4">
                {profile.assessments.map((assessment) => (
                  <div key={assessment.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">{assessment.name}</h3>
                    <p>Score: {assessment.score}</p>
                    <p>Date: {assessment.date}</p>
                    <div className="mt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={assessment.isPublic}
                          onChange={() => handleToggleAssessmentVisibility(assessment.id)}
                          className="mr-2"
                        />
                        Make Public on Profile
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workshops' && isPro && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Workshops Attended</h2>
              <div className="space-y-4">
                {profile.workshopsAttended.map((workshop) => (
                  <div key={workshop.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium">{workshop.name}</h3>
                    <p>Date: {workshop.date}</p>
                    <p>Certificate: {workshop.certificate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;