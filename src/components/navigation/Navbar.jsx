import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { userRole, logout } = useContext(AuthContext);
  
  // Check if we're on the login page
  const isLoginPage = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register-company';
  
  // Close mobile menu and dropdowns when navigating
  useEffect(() => {
    setIsOpen(false);
    setProfileDropdownOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Function to handle dropdown toggle
  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };
  
  const handleSignOut = () => {
    logout();
  }
  // Define navigation links and organize them into groups when needed
  const getNavLinks = () => {
    // If we're on the login page, return empty array (no nav links)
    if (isLoginPage) return [];
    
    switch (userRole) {
      case 'student':
        return [
          {
            name: 'Main',
            type: 'links',
            items: [
              { name: 'Dashboard', path: '/student/dashboard' },
              { name: 'Internships', path: '/student/internships' },
            ]
          },
          {
            name: 'My Work',
            type: 'links',
            items: [
              { name: 'My Applications', path: '/student/applications' },
              { name: 'My Reports', path: '/student/reports' },
            ]
          }
        ];
      case 'proStudent':
        return [
          {
            name: 'Main',
            type: 'links',
            items: [
              { name: 'Dashboard', path: '/proStudent/dashboard' },
              { name: 'Internships', path: '/proStudent/internships' },
            ]
          },
          {
            name: 'My Work',
            type: 'links',
            items: [
              { name: 'My Applications', path: '/proStudent/applications' },
              { name: 'My Reports', path: '/proStudent/reports' },
            ]
          },
          {
            name: 'Career',
            type: 'links',
            items: [
              { name: 'Assessments', path: '/proStudent/assessments' },
              { name: 'Workshops', path: '/proStudent/workshops' },
              { name: 'Career Guidance', path: '/proStudent/career-guidance' },
            ]
          }
        ];
      case 'company':
        return [
          {
            name: 'Main',
            type: 'links',
            items: [
              { name: 'Dashboard', path: '/company/dashboard' },
            ]
          },
          {
            name: 'Internships',
            type: 'links',
            items: [
              { name: 'My Internships', path: '/company/internship-posts' },
              { name: 'All Internships', path: '/company/internships' },
            ]
          },
          {
            name: 'People',
            type: 'links',
            items: [
              { name: 'Applications', path: '/company/applications' },
              { name: 'Current Interns', path: '/company/interns' },
            ]
          }
        ];
      case 'faculty':
        return [
          {
            name: 'Main',
            type: 'links',
            items: [
              { name: 'Dashboard', path: '/faculty/dashboard' },
              { name: 'Report Reviews', path: '/faculty/report-reviews' },
              { name: 'Statistics', path: '/faculty/faculty-statistics' }
            ]
          }
        ];
      case 'scadOffice':
        return [
          {
            name: 'Main',
            type: 'links',
            items: [
              { name: 'Dashboard', path: '/scad/dashboard' },
              { name: 'Internship Cycles', path: '/scad/internship-cycles' },
            ]
          },
          {
            name: 'Companies',
            type: 'links',
            items: [
              { name: 'Company Applications', path: '/scad/company-applications' },
              { name: 'Internships', path: '/scad/internships' },
            ]
          },
          {
            name: 'Students',
            type: 'links',
            items: [
              { name: 'Student Management', path: '/scad/student-management'},
              { name: 'Report Reviews', path: '/faculty/report-reviews' },
            ]
          },
          {
            name: 'Career',
            type: 'links',
            items: [
              { name: 'Career Guidance', path: '/scad/career-guidance' },
              { name: 'Workshops', path: '/scad/workshops'},
              { name: 'Statistics', path: '/scad/statistics' },
            ]
          }
        ];
      default:
        return [];
    }
  };
  
  const navLinkGroups = getNavLinks();

  // Check if current path matches any link in a group
  const isGroupActive = (group) => {
    return group.items.some(item => location.pathname === item.path);
  };
  
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
              <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-2">
                {navLinkGroups.map((group, groupIndex) => (
                  <div key={`group-${groupIndex}`} className="relative inline-block text-left">
                    {/* Group dropdown button */}
                    <button
                      onClick={() => toggleDropdown(`group-${groupIndex}`)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                        isGroupActive(group)
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-300'
                      }`}
                    >
                      {group.name}
                      <svg 
                        className={`ml-1 h-4 w-4 transition-transform ${activeDropdown === `group-${groupIndex}` ? 'transform rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Dropdown content */}
                    {activeDropdown === `group-${groupIndex}` && (
                      <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          {group.items.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              className={`block px-4 py-2 text-sm ${
                                location.pathname === link.path
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                              }`}
                              role="menuitem"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right side menu items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            
            
            {/* Settings / Login - always show */}
            <div className="ml-3 relative">
              <div>
                <button 
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setActiveDropdown(null); // Close any open dropdown when opening profile
                  }}
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
                            <Link to="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                            <Link to="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }
                      if (userRole === 'company') {
                        return (
                          <>
                            <Link to="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
                            <Link to="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }
                      if (userRole === 'faculty') {
                        return (
                          <>
                            <Link to="/faculty/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Your Profile
                            </Link>
                            <Link to="/" onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Sign out
                            </Link>
                          </>
                        );
                      }
                    } else {
                      return (
                        <Link to="/login"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
          {navLinkGroups.length > 0 && (
            <div className="flex items-center sm:hidden">
              <button 
                onClick={() => {
                  setIsOpen(!isOpen);
                  setProfileDropdownOpen(false); // Close profile dropdown when opening mobile menu
                }}
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
      {isOpen && navLinkGroups.length > 0 && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinkGroups.map((group, groupIndex) => (
              <div key={`mobile-group-${groupIndex}`} className="py-1">
                {/* Group heading */}
                <div 
                  onClick={() => toggleDropdown(`mobile-group-${groupIndex}`)}
                  className={`flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                    isGroupActive(group) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600'
                  } cursor-pointer`}
                >
                  <span>{group.name}</span>
                  <svg 
                    className={`h-5 w-5 transition-transform ${activeDropdown === `mobile-group-${groupIndex}` ? 'transform rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Group items */}
                {activeDropdown === `mobile-group-${groupIndex}` && (
                  <div className="pl-4 border-l-2 border-gray-200 ml-4 mt-1">
                    {group.items.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          location.pathname === link.path
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
              
              {/* Profile actions on mobile */}
              <div className="mt-3 px-2 space-y-1">
                {(() => {
                  if (userRole === 'student') {
                    return (
                      <>
                        <Link to="/student/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Your Profile
                        </Link>
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Sign out
                        </Link>
                      </>
                    );
                  }
                  if (userRole === 'proStudent') {
                    return (
                      <>
                        <Link to="/proStudent/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Your Profile
                        </Link>
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Sign out
                        </Link>
                      </>
                    );
                  }
                  if (userRole === 'company') {
                    return (
                      <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                        Sign out
                      </Link>
                    );
                  }
                  if (userRole === 'faculty') {
                    return (
                      <>
                        <Link to="/faculty/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Your Profile
                        </Link>
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Sign out
                        </Link>
                      </>
                    );
                  }
                  if (userRole === 'scadOffice') {
                    return (
                      <>
                        <Link to="/scadOffice/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Your Profile
                        </Link>
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                          Sign out
                        </Link>
                      </>
                    );
                  }
                })()}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;