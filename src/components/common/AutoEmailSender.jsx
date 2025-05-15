import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AutoEmailSender = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  
  // Get company info from route state
  const companyName = location.state?.companyName || 'Your Company';
  const companyEmail = location.state?.companyEmail || '';
  
  useEffect(() => {
    // If no email was provided in state, redirect back to registration
    if (!companyEmail) {
      navigate('/company-registration');
      return;
    }
  }, [companyEmail, navigate]);

  const handleSendEmail = () => {
    // Create mailto link with all the email content pre-filled
    const subject = encodeURIComponent(`${companyName} Registration Accepted - GUC Internship System`);
    const body = encodeURIComponent(`
Dear ${companyName} Team,

We are pleased to inform you that your company has been accepted into the GUC Internship System.

You can now post internship opportunities and connect with our talented students.

Please login to your account to get started.

Best regards,
The GUC Internship Team
    `);
    
    // Open the default mail client with pre-filled content
    window.location.href = `mailto:${companyEmail}?subject=${subject}&body=${body}`;
    
    // Mark as sent
    setEmailSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Acceptance Email</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <p className="font-semibold mb-2">Email will be sent to:</p>
          <p className="text-blue-600 mb-4">{companyEmail}</p>
          
          <p className="font-semibold mb-2">Subject:</p>
          <p className="mb-4">{companyName} Registration Accepted - GUC Internship System</p>
          
          <p className="font-semibold mb-2">Message:</p>
          <div className="text-left bg-white p-4 rounded border border-gray-200 mb-4">
            <p>Dear {companyName} Team,</p>
            <br />
            <p>We are pleased to inform you that your company has been accepted into the GUC Internship System.</p>
            <br />
            <p>You can now post internship opportunities and connect with our talented students.</p>
            <br />
            <p>Please login to your account to get started.</p>
            <br />
            <p>Best regards,<br />The GUC Internship Team</p>
          </div>
        </div>
        
        {emailSent ? (
          <div>
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              <p>Your default email client was opened with the acceptance email.</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Continue to Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleSendEmail}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Open Email Client & Send
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
            >
              Skip & Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoEmailSender;