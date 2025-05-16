import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';

// Mapping roles to dashboard path prefixes - same as in Login.jsx
const roleToPathPrefix = {
  student: 'student',
  proStudent: 'proStudent',
  company: 'company',
  faculty: 'faculty',
  scadOffice: 'scad',
};

const NotFound = () => {
  const { userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!userRole) return '/';
    const pathPrefix = roleToPathPrefix[userRole];
    return pathPrefix ? `/${pathPrefix}/dashboard` : '/';
  };

  // Handle redirect to dashboard
  const handleRedirect = () => {
    navigate(getDashboardPath());
  };

  // Automatic countdown and redirect
  useEffect(() => {
    if (countdown <= 0) {
      handleRedirect();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8 bg-white shadow-lg rounded-lg p-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/logo.png" alt="GUC Logo" />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">404</h1>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Page Not Found</h2>
          <p className="mt-4 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="h-1 w-full bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        <p className="text-gray-600">
          Redirecting to your dashboard in <span className="font-bold">{countdown}</span> seconds...
        </p>

        
        <div className="flex flex-col space-y-4">
        {userRole &&(
          <Button onClick={handleRedirect} className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Go to Dashboard Now
          </Button>
        )}
          <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
            Return to Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 