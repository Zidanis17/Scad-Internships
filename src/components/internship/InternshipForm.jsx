import React, { useState } from 'react';
import Input from './Input';
import Button from './Button'; // Assuming you have a Button component

const InternshipForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    jobTitle: initialData.jobTitle || '',
    companyName: initialData.companyName || '',
    duration: initialData.duration || '',
    isPaid: initialData.isPaid || false,
    salary: initialData.salary || '',
    skills: initialData.skills || [],
    description: initialData.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const skillsArray = typeof formData.skills === 'string' 
      ? formData.skills.split(',').map(skill => skill.trim())
      : formData.skills;
    
    onSubmit({ ...formData, skills: skillsArray });
  };

  return (
    <div className="space-y-4">
      <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
      <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
      <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} />
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Paid</label>
        <select 
          name="isPaid" 
          value={formData.isPaid} 
          onChange={(e) => setFormData({ ...formData, isPaid: e.target.value === 'true' })} 
          className="border rounded p-2 w-full"
        >
          <option value="false">Unpaid</option>
          <option value="true">Paid</option>
        </select>
      </div>
      {formData.isPaid && <Input label="Salary" name="salary" value={formData.salary} onChange={handleChange} />}
      <Input 
        label="Skills (comma-separated)" 
        name="skills" 
        value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills} 
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })} 
      />
      <textarea 
        name="description" 
        value={formData.description} 
        onChange={handleChange} 
        className="border rounded p-2 w-full" 
        placeholder="Job Description"
      ></textarea>
      <Button variant="primary" onClick={handleSubmit}>Save</Button>
    </div>
  );
};

export default InternshipForm;