import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    switch (userRole) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard' },
          { name: 'Internships', path: '/student/internships' },
          { name: 'My Applications', path: '/student/applications' },
          { name: 'My Reports', path: '/student/reports' },
        ];
      case 'proStudent':
        return [
          { name: 'Dashboard', path: '/proStudent/dashboard' },
          { name: 'Internships', path: '/proStudent/internships' },
          { name: 'My Applications', path: '/proStudent/applications' },
          { name: 'My Reports', path: '/proStudent/reports' },
          { name: 'Assessments', path: '/proStudent/assessments' },
          { name: 'Workshops', path: '/proStudent/workshops' },
          { name: 'Career Guidance', path: '/proStudent/career-guidance' },
        ];
      case 'company':
        return [
          { name: 'Dashboard', path: '/company/dashboard' },
          { name: 'My Internships', path: '/company/internship-posts' },
          { name: 'Applications', path: '/company/applications' },
          { name: 'Current Interns', path: '/company/interns' },
        ];
      case 'faculty':
        return [
          { name: 'Dashboard', path: '/faculty/dashboard' },
          { name: 'Report Reviews', path: '/faculty/report-reviews' },
        ];
      case 'scadOffice':
        return [
          { name: 'Dashboard', path: '/scad/dashboard' },
          { name: 'Company Applications', path: '/scad/company-applications' },
          { name: 'Internship Cycles', path: '/scad/internship-cycles' },
          { name: 'Statistics', path: '/scad/statistics' },
        ];
      default:
        return [];
    }
  };
  
  const navLinks = getNavLinks();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  className="h-8 w-auto mr-2" 
                  src="/logo.png" 
                  alt="GUC Logo" 
                />
                <span className="font-bold text-blue-600 text-lg">GUC Internship System</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side menu items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                    {userRole === 'student' || userRole === 'proStudent' ? 'S' : 
                     userRole === 'company' ? 'C' : 
                     userRole === 'faculty' ? 'F' : 'A'}
                  </div>
                </button>
              </div>
              
              {/* Profile dropdown panel */}
              {profileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                  {userRole === 'student' || userRole === 'proStudent' ? 'S' : 
                   userRole === 'company' ? 'C' : 
                   userRole === 'faculty' ? 'F' : 'A'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {userRole === 'student' || userRole === 'proStudent' ? 'Student Name' : 
                   userRole === 'company' ? 'Company Name' : 
                   userRole === 'faculty' ? 'Faculty Name' : 'Admin Name'}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {userRole === 'student' ? 'Student ID: 12345' : 
                   userRole === 'proStudent' ? 'Pro Student ID: 12345' : 
                   userRole === 'company' ? 'Company' : 
                   userRole === 'faculty' ? 'Faculty' : 'SCAD Office'}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                Your Profile
              </Link>
              <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                Settings
              </Link>
              <Link to="/logout" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                Sign out
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;