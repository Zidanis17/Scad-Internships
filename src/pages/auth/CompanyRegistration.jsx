import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

// Company size options
const companySizes = [
  { value: 'small', label: 'Small (50 employees or less)' },
  { value: 'medium', label: 'Medium (51-100 employees)' },
  { value: 'large', label: 'Large (101-500 employees)' },
  { value: 'corporate', label: 'Corporate (more than 500 employees)' },
];

// Replace these with your EmailJS credentials
const EMAILJS_USER_ID = 'xgaCI-VQn7vcGdf6t';
const EMAILJS_SERVICE_ID = 'service_mg5s3up';
const EMAILJS_TEMPLATE_ID = 'template_smfi2yr';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    logo: null,
    email: '',
    documents: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (!formData.name || !formData.industry || !formData.size || !formData.email || !formData.documents) {
      setError('All fields are required');
      return;
    }

    // Set up email details
    const templateParams = {
      to_email: formData.email,
      company_name: formData.name,
    };

    // Send the email automatically with EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then((response) => {
        console.log('Email shipped successfully:', response.status, response.text);
        // Take them straight to login after sending
        navigate('/');
      })
      .catch((err) => {
        console.error('Email failed to ship:', err);
        setError('Something went wrong sending the email. Try again.');
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <img className="mx-auto h-8 w-auto" src="/logo.png" alt="GUC Logo" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Company Registration</h2>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Company Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full"
            />
            <select
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Company Size</option>
              {companySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                Company Logo
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Official Company Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
            <div>
              <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
                Legitimacy Documents (e.g., tax documents)
              </label>
              <input
                type="file"
                name="documents"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Register
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyRegistration;