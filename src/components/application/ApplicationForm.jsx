import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const ApplicationForm = ({ onSubmit }) => {
  const [internshipTitle, setInternshipTitle] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = () => {
    onSubmit({ internshipTitle, files });
  };

  return (
    <div className="space-y-4">
      <Input label="Internship Title" value={internshipTitle} onChange={(e) => setInternshipTitle(e.target.value)} />
      <div>
        <label>Upload Documents</label>
        <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} className="border rounded p-2 w-full" />
      </div>
      <Button variant="primary" onClick={handleSubmit}>Apply</Button>
    </div>
  );
};

export default ApplicationForm;