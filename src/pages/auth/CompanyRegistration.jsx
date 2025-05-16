import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastContext';

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
const EMAILJS_TEMPLATE_ID = 'template_iefoeys';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Company name is required');
      return false;
    }
    if (!formData.industry) {
      setError('Industry is required');
      return false;
    }
    if (!formData.size) {
      setError('Company size is required');
      return false;
    }
    if (!formData.email) {
      setError('Company email is required');
      return false;
    }
    if (!formData.documents) {
      setError('Verification documents are required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const submitApplication = () => {
    setIsSubmitting(true);
    setShowConfirmationModal(false);

    // Set up email details for application submission
    const templateParams = {
      name: "SCAD OFFICE",
      email: formData.email,
      company_name: formData.name,
      industry: formData.industry,
      company_size: formData.size,
      message: `A new company registration has been submitted by ${formData.name} in the ${formData.industry} industry.`
    };

    // Send the email notification for submission
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then((response) => {
        console.log('Application submitted successfully:', response.status, response.text);
        
        // Simulate application processing - in a real app this would be handled by backend
        simulateApplicationProcessing();
      })
      .catch((err) => {
        console.error('Email failed to send:', err);
        setIsSubmitting(false);
        toast.error('Failed to submit application. Please try again.');
      });
  };

  // This function simulates backend processing of the application
  // In a real app, this would be handled by an actual backend service
  const simulateApplicationProcessing = () => {
    // For demo purposes, we'll randomly decide if the application is accepted or rejected
    // In a real app, this would be decided by admin review
    setTimeout(() => {
      const isApproved = Math.random() > 0.5; // 50% chance of approval for demo
      
      if (isApproved) {
        sendApprovalEmail();
      } else {
        sendRejectionEmail();
      }
    }, 3000); // Simulate 3 second processing time
  };

  const sendApprovalEmail = () => {
    // Set up email details for approval notification
    const approvalParams = {
      name: formData.name,
      email: formData.email,
      subject: "Your Company Registration Has Been Approved",
      message: `Congratulations! Your company ${formData.name} has been verified and approved. You can now log in to your account.`
    };

    // Send the approval email
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, approvalParams, EMAILJS_USER_ID)
      .then((response) => {
        console.log('Approval email sent successfully:', response.status, response.text);
        setIsSubmitting(false);
        setApplicationStatus('approved');
        toast.success('Your application has been approved! Check your email for details.');
      })
      .catch((err) => {
        console.error('Approval email failed to send:', err);
        setIsSubmitting(false);
        toast.error('Something went wrong. Please contact support.');
      });
  };

  const sendRejectionEmail = () => {
    // Set up email details for rejection notification
    const rejectionParams = {
      name: formData.name,
      email: formData.email,
      subject: "Regarding Your Company Registration",
      message: `We regret to inform you that your company registration for ${formData.name} could not be approved at this time. Please contact support for more information.`
    };

    // Send the rejection email
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, rejectionParams, EMAILJS_USER_ID)
      .then((response) => {
        console.log('Rejection email sent successfully:', response.status, response.text);
        setIsSubmitting(false);
        setApplicationStatus('rejected');
        toast.error('Your application was not approved. Check your email for details.');
      })
      .catch((err) => {
        console.error('Rejection email failed to send:', err);
        setIsSubmitting(false);
        toast.error('Something went wrong. Please contact support.');
      });
  };

  const redirectToLogin = () => {
    // Navigate to login page
    navigate('/');
  };

  // Modal content for application result
  const renderApplicationStatusModal = () => {
    if (!applicationStatus) return null;

    return (
      <Modal
        isOpen={!!applicationStatus}
        onClose={() => redirectToLogin()}
        title={applicationStatus === 'approved' ? 'Application Approved' : 'Application Not Approved'}
      >
        <div className="text-center p-4">
          {applicationStatus === 'approved' ? (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Registration Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your company registration has been approved. You will receive a confirmation email with further instructions.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Registration Not Approved</h3>
              <p className="text-gray-600 mb-4">
                Unfortunately, your company registration could not be approved at this time. 
                Please check your email for more details or contact our support team.
              </p>
            </>
          )}
          <Button 
            onClick={redirectToLogin} 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </div>
      </Modal>
    );
  };

  // Confirmation modal content
  const confirmationModal = (
    <Modal
      isOpen={showConfirmationModal}
      onClose={() => setShowConfirmationModal(false)}
      title="Confirm Registration"
    >
      <div className="p-4">
        <p className="mb-4">Please confirm the following information:</p>
        <div className="mb-4">
          <p><strong>Company Name:</strong> {formData.name}</p>
          <p><strong>Industry:</strong> {formData.industry}</p>
          <p><strong>Size:</strong> {
            companySizes.find(size => size.value === formData.size)?.label || formData.size
          }</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Logo:</strong> {formData.logo ? formData.logo.name : 'Not provided'}</p>
          <p><strong>Documents:</strong> {formData.documents ? formData.documents.name : 'Not provided'}</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          By submitting this application, you agree to our terms and conditions.
          You will receive an email notification regarding the status of your application.
        </p>
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={submitApplication}
            variant="primary"
          >
            Submit Application
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Progress indicator modal
  const processingModal = (
    <Modal
      isOpen={isSubmitting && !applicationStatus}
      onClose={() => {}}
      title="Processing Your Application"
    >
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="mb-2">Please wait while we process your application...</p>
        <p className="text-sm text-gray-600">This may take a few moments.</p>
      </div>
    </Modal>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <img className="mx-auto h-8 w-auto" src="/logo.png" alt="GUC Logo" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Company Registration</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Register your company to access our services
          </p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Company Name"
              type="text"
              name="name"
              placeholder="Enter your company name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full"
            />
            <Input
              label="Industry"
              type="text"
              name="industry"
              placeholder="e.g. Technology, Healthcare, Finance"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="mb-4">
              <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">
                Company Size
              </label>
              <select
                id="size"
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
            </div>
            <div className="mb-4">
              <label htmlFor="logo" className="block text-gray-700 text-sm font-bold mb-2">
                Company Logo
              </label>
              <input
                id="logo"
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-gray-500">Recommended format: PNG, JPG (max 2MB)</p>
            </div>
            <Input
              label="Official Company Email"
              type="email"
              name="email"
              placeholder="company@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="mb-4">
              <label htmlFor="documents" className="block text-gray-700 text-sm font-bold mb-2">
                Verification Documents
              </label>
              <input
                id="documents"
                type="file"
                name="documents"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Please upload official documents to verify your company (e.g., business registration, tax documents).
                PDF format preferred (max 5MB).
              </p>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Register Company'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Login
          </Link>
        </p>
      </div>

      {/* Modals */}
      {confirmationModal}
      {processingModal}
      {renderApplicationStatusModal()}
    </div>
  );
};

export default CompanyRegistration;