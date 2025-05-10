import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ReportForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    introduction: initialData.introduction || '',
    body: initialData.body || '',
    helpfulCourses: initialData.helpfulCourses || [],
    isFinalized: initialData.isFinalized || false
  });

  const [availableCourses, setAvailableCourses] = useState([
    { id: 1, name: 'Software Engineering' },
    { id: 2, name: 'Database Systems' },
    { id: 3, name: 'Data Structures' },
    { id: 4, name: 'Web Development' },
    { id: 5, name: 'Mobile Development' },
    { id: 6, name: 'Computer Networks' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseChange = (courseId) => {
    const currentCourses = [...formData.helpfulCourses];
    const courseIndex = currentCourses.indexOf(courseId);
    
    if (courseIndex === -1) {
      currentCourses.push(courseId);
    } else {
      currentCourses.splice(courseIndex, 1);
    }
    
    setFormData({ ...formData, helpfulCourses: currentCourses });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <Input 
        label="Report Title" 
        name="title" 
        value={formData.title} 
        onChange={handleChange} 
        required 
      />
      
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Introduction</label>
        <textarea 
          name="introduction" 
          value={formData.introduction} 
          onChange={handleChange} 
          className="border rounded p-2 w-full h-32" 
          placeholder="Write an introduction for your internship report"
          required
        ></textarea>
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Report Body</label>
        <textarea 
          name="body" 
          value={formData.body} 
          onChange={handleChange} 
          className="border rounded p-2 w-full h-64" 
          placeholder="Describe your internship experience in detail"
          required
        ></textarea>
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Helpful Courses</label>
        <div className="grid grid-cols-2 gap-2">
          {availableCourses.map(course => (
            <div key={course.id} className="flex items-center">
              <input
                type="checkbox"
                id={`course-${course.id}`}
                checked={formData.helpfulCourses.includes(course.id)}
                onChange={() => handleCourseChange(course.id)}
                className="mr-2"
              />
              <label htmlFor={`course-${course.id}`}>{course.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="finalize"
          checked={formData.isFinalized}
          onChange={(e) => setFormData({ ...formData, isFinalized: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="finalize" className="text-gray-700">Finalize this report for submission</label>
      </div>
      
      <div className="flex space-x-4">
        <Button variant="primary" onClick={handleSubmit}>
          {formData.isFinalized ? 'Submit Final Report' : 'Save Draft'}
        </Button>
        <Button variant="secondary" onClick={() => window.print()}>
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default ReportForm;