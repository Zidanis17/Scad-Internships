import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { userRole } = useContext(AuthContext);
  
  // Check if we're on the login page
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
  }, [location]);
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    // If we're on the login page, return empty array (no nav links)
    if (isLoginPage) return [];
    
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
                <img 
                  className="h-8 w-auto mr-2" 
                  src="/logo.png" 
                  alt="GUC Logo" 
                />
                <span className="font-bold text-blue-600 text-lg">GUC Internship System</span>
            </div>
            
            {/* Desktop navigation - only show if not on login page */}
            {!isLoginPage && (
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
            )}
          </div>
          
          {/* Right side menu items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Notifications - only show if logged in and not on login page */}
            {userRole && !isLoginPage && (
              <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            )}
            
            {/* Settings / Login - always show */}
            <div className="ml-3 relative">
              <div>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Open settings menu</span>
                  {userRole ? (
                    <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold">
                      {userRole === 'student' || userRole === 'proStudent' ? 'S' : 
                       userRole === 'company' ? 'C' : 
                       userRole === 'faculty' ? 'F' : 'A'}
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
              
              {/* Settings dropdown panel */}
              {profileDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                  {(() => {
                    if (userRole) {
                      if (userRole === 'student') {
                        return (
                          <>
                            <Link to="/student/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Your Profile
                            </Link>
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }
                      if (userRole === 'proStudent') {
                        return (
                          <>
                            <Link to="/proStudent/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Your Profile
                            </Link>
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }
                      if (userRole === 'company') {
                        return (
                          <>
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }

                      if (userRole === 'scadOffice') {
                        return (
                          <>
                            <Link to="/scadOffice/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Your Profile
                            </Link>
                            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }
                    } else {
                      return (
                        <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Login
                        </Link>
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button - only show hamburger if we have nav links */}
          {navLinks.length > 0 && (
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
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && navLinks.length > 0 && (
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
          {userRole && (
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

            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;