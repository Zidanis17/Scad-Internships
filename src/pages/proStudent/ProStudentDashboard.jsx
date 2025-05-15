import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';

// Dummy data for majors and semesters
const majorsList = [
  { id: 1, name: 'Computer Science' },
  { id: 2, name: 'Computer Engineering' },
  { id: 3, name: 'Information Systems' },
  { id: 4, name: 'Software Engineering' },
  { id: 5, name: 'Electrical Engineering' },
  { id: 6, name: 'Mechanical Engineering' },
  { id: 7, name: 'Civil Engineering' },
  { id: 8, name: 'Architecture' },
  { id: 9, name: 'Business Administration' }
];

const semestersList = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, number: i + 1 }));

// Dummy data from Dashboard.jsx
const dummyCompaniesByMajor = {
  1: [ // Computer Science
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      industry: 'Information Technology',
      logo: '/companies/tech-solutions.png',
      rating: 4.8,
      recommendedBy: 27,
      openPositions: 3
    },
    {
      id: 2,
      name: 'DataInsights Corp.',
      industry: 'Data Analytics',
      logo: '/companies/datainsights.png',
      rating: 4.5,
      recommendedBy: 15,
      openPositions: 2
    },
    {
      id: 3,
      name: 'Creative Studios',
      industry: 'Design',
      logo: '/companies/creative-studios.png',
      rating: 4.6,
      recommendedBy: 12,
      openPositions: 1
    }
  ],
  2: [ // Computer Engineering
    {
      id: 4,
      name: 'Hardware Innovations',
      industry: 'Hardware Engineering',
      logo: '/companies/hardware-innovations.png',
      rating: 4.7,
      recommendedBy: 19,
      openPositions: 2
    },
    {
      id: 5,
      name: 'Embedded Systems Co.',
      industry: 'Embedded Systems',
      logo: '/companies/embedded-systems.png',
      rating: 4.3,
      recommendedBy: 14,
      openPositions: 3
    },
    {
      id: 6,
      name: 'Tech Solutions Inc.',
      industry: 'Information Technology',
      logo: '/companies/tech-solutions.png',
      rating: 4.8,
      recommendedBy: 22,
      openPositions: 1
    }
  ],
  3: [ // Information Systems
    {
      id: 7,
      name: 'Business Intelligence Inc.',
      industry: 'Business Intelligence',
      logo: '/companies/business-intelligence.png',
      rating: 4.4,
      recommendedBy: 18,
      openPositions: 4
    },
    {
      id: 8,
      name: 'Systems Integration Ltd.',
      industry: 'IT Integration',
      logo: '/companies/systems-integration.png',
      rating: 4.2,
      recommendedBy: 12,
      openPositions: 2
    },
    {
      id: 2,
      name: 'DataInsights Corp.',
      industry: 'Data Analytics',
      logo: '/companies/datainsights.png',
      rating: 4.5,
      recommendedBy: 15,
      openPositions: 3
    }
  ],
  4: [ // Software Engineering
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      industry: 'Information Technology',
      logo: '/companies/tech-solutions.png',
      rating: 4.8,
      recommendedBy: 30,
      openPositions: 5
    },
    {
      id: 9,
      name: 'App Development Labs',
      industry: 'Mobile Development',
      logo: '/companies/app-development.png',
      rating: 4.6,
      recommendedBy: 25,
      openPositions: 3
    },
    {
      id: 10,
      name: 'Cloud Solutions',
      industry: 'Cloud Computing',
      logo: '/companies/cloud-solutions.png',
      rating: 4.7,
      recommendedBy: 22,
      openPositions: 2
    }
  ],
  5: [ // Electrical Engineering
    {
      id: 11,
      name: 'Power Systems Co.',
      industry: 'Power Engineering',
      logo: '/companies/power-systems.png',
      rating: 4.3,
      recommendedBy: 16,
      openPositions: 2
    },
    {
      id: 12,
      name: 'Electronics Manufacturing',
      industry: 'Electronics',
      logo: '/companies/electronics-manufacturing.png',
      rating: 4.4,
      recommendedBy: 14,
      openPositions: 3
    },
    {
      id: 13,
      name: 'Telecommunications Ltd.',
      industry: 'Telecommunications',
      logo: '/companies/telecommunications.png',
      rating: 4.5,
      recommendedBy: 18,
      openPositions: 1
    }
  ],
  6: [ // Mechanical Engineering
    {
      id: 14,
      name: 'Automotive Innovations',
      industry: 'Automotive',
      logo: '/companies/automotive-innovations.png',
      rating: 4.6,
      recommendedBy: 21,
      openPositions: 3
    },
    {
      id: 15,
      name: 'Manufacturing Systems',
      industry: 'Manufacturing',
      logo: '/companies/manufacturing-systems.png',
      rating: 4.2,
      recommendedBy: 18,
      openPositions: 2
    },
    {
      id: 16,
      name: 'Robotics Solutions',
      industry: 'Robotics',
      logo: '/companies/robotics-solutions.png',
      rating: 4.7,
      recommendedBy: 25,
      openPositions: 4
    }
  ],
  7: [ // Civil Engineering
    {
      id: 17,
      name: 'Construction Partners',
      industry: 'Construction',
      logo: '/companies/construction-partners.png',
      rating: 4.3,
      recommendedBy: 17,
      openPositions: 3
    },
    {
      id: 18,
      name: 'Urban Planning Group',
      industry: 'Urban Planning',
      logo: '/companies/urban-planning.png',
      rating: 4.5,
      recommendedBy: 14,
      openPositions: 2
    },
    {
      id: 19,
      name: 'Infrastructure Solutions',
      industry: 'Infrastructure',
      logo: '/companies/infrastructure-solutions.png',
      rating: 4.4,
      recommendedBy: 20,
      openPositions: 4
    }
  ],
  8: [ // Architecture
    {
      id: 20,
      name: 'Design Studio International',
      industry: 'Architectural Design',
      logo: '/companies/design-studio.png',
      rating: 4.8,
      recommendedBy: 24,
      openPositions: 3
    },
    {
      id: 21,
      name: 'Urban Spaces',
      industry: 'Urban Architecture',
      logo: '/companies/urban-spaces.png',
      rating: 4.6,
      recommendedBy: 19,
      openPositions: 2
    },
    {
      id: 22,
      name: 'Sustainable Buildings',
      industry: 'Sustainable Architecture',
      logo: '/companies/sustainable-buildings.png',
      rating: 4.7,
      recommendedBy: 23,
      openPositions: 4
    }
  ],
  9: [ // Business Administration
    {
      id: 23,
      name: 'Global Consulting Group',
      industry: 'Management Consulting',
      logo: '/companies/global-consulting.png',
      rating: 4.7,
      recommendedBy: 26,
      openPositions: 5
    },
    {
      id: 24,
      name: 'Financial Solutions Inc.',
      industry: 'Finance',
      logo: '/companies/financial-solutions.png',
      rating: 4.5,
      recommendedBy: 22,
      openPositions: 3
    },
    {
      id: 25,
      name: 'Marketing Innovations',
      industry: 'Marketing',
      logo: '/companies/marketing-innovations.png',
      rating: 4.6,
      recommendedBy: 20,
      openPositions: 4
    }
  ]
};

const dummyInternshipsByMajor = {
  1: [ // Computer Science
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Tech Solutions Inc.',
      industry: 'Information Technology',
      duration: '3 months',
      isPaid: true,
      salary: '8000 EGP/month',
      deadline: '2025-06-15',
      postedAt: '3 days ago'
    },
    {
      id: 2,
      title: 'Data Analysis Intern',
      company: 'DataInsights Corp.',
      industry: 'Data Analytics',
      duration: '4 months',
      isPaid: true,
      salary: '10000 EGP/month',
      deadline: '2025-06-20',
      postedAt: '5 days ago'
    },
    {
      id: 3,
      title: 'UX Research Intern',
      company: 'Digital UX Lab',
      industry: 'UX/UI Design',
      duration: '3 months',
      isPaid: true,
      salary: '7500 EGP/month',
      deadline: '2025-06-25',
      postedAt: '1 week ago'
    }
  ],
  2: [ // Computer Engineering
    {
      id: 4,
      title: 'Hardware Design Intern',
      company: 'Hardware Innovations',
      industry: 'Hardware Engineering',
      duration: '3 months',
      isPaid: true,
      salary: '9000 EGP/month',
      deadline: '2025-06-18',
      postedAt: '2 days ago'
    },
    {
      id: 5,
      title: 'Embedded Systems Intern',
      company: 'Embedded Systems Co.',
      industry: 'Embedded Systems',
      duration: '4 months',
      isPaid: true,
      salary: '9500 EGP/month',
      deadline: '2025-06-22',
      postedAt: '4 days ago'
    },
    {
      id: 6,
      title: 'IoT Development Intern',
      company: 'Connected Devices Ltd.',
      industry: 'Internet of Things',
      duration: '3 months',
      isPaid: true,
      salary: '8500 EGP/month',
      deadline: '2025-06-30',
      postedAt: '1 week ago'
    }
  ],
  3: [ // Information Systems
    {
      id: 7,
      title: 'Business Analyst Intern',
      company: 'Business Intelligence Inc.',
      industry: 'Business Intelligence',
      duration: '3 months',
      isPaid: true,
      salary: '8000 EGP/month',
      deadline: '2025-06-17',
      postedAt: '3 days ago'
    },
    {
      id: 8,
      title: 'Systems Analyst Intern',
      company: 'Systems Integration Ltd.',
      industry: 'IT Integration',
      duration: '4 months',
      isPaid: true,
      salary: '8500 EGP/month',
      deadline: '2025-06-23',
      postedAt: '5 days ago'
    },
    {
      id: 9,
      title: 'Data Management Intern',
      company: 'DataInsights Corp.',
      industry: 'Data Analytics',
      duration: '3 months',
      isPaid: true,
      salary: '9000 EGP/month',
      deadline: '2025-06-28',
      postedAt: '1 week ago'
    }
  ],
  4: [ // Software Engineering
    {
      id: 10,
      title: 'Full Stack Developer Intern',
      company: 'Tech Solutions Inc.',
      industry: 'Information Technology',
      duration: '3 months',
      isPaid: true,
      salary: '9500 EGP/month',
      deadline: '2025-06-16',
      postedAt: '2 days ago'
    },
    {
      id: 11,
      title: 'Mobile App Developer Intern',
      company: 'App Development Labs',
      industry: 'Mobile Development',
      duration: '4 months',
      isPaid: true,
      salary: '10000 EGP/month',
      deadline: '2025-06-21',
      postedAt: '4 days ago'
    },
    {
      id: 12,
      title: 'Cloud Developer Intern',
      company: 'Cloud Solutions',
      industry: 'Cloud Computing',
      duration: '3 months',
      isPaid: true,
      salary: '9000 EGP/month',
      deadline: '2025-06-26',
      postedAt: '1 week ago'
    }
  ],
  5: [ // Electrical Engineering
    {
      id: 13,
      title: 'Power Systems Intern',
      company: 'Power Systems Co.',
      industry: 'Power Engineering',
      duration: '3 months',
      isPaid: true,
      salary: '8500 EGP/month',
      deadline: '2025-06-19',
      postedAt: '3 days ago'
    },
    {
      id: 14,
      title: 'Electronics Design Intern',
      company: 'Electronics Manufacturing',
      industry: 'Electronics',
      duration: '4 months',
      isPaid: true,
      salary: '9000 EGP/month',
      deadline: '2025-06-24',
      postedAt: '5 days ago'
    },
    {
      id: 15,
      title: 'Telecommunications Intern',
      company: 'Telecommunications Ltd.',
      industry: 'Telecommunications',
      duration: '3 months',
      isPaid: true,
      salary: '8000 EGP/month',
      deadline: '2025-06-29',
      postedAt: '1 week ago'
    }
  ],
  6: [ // Mechanical Engineering
    {
      id: 16,
      title: 'Automotive Design Intern',
      company: 'Automotive Innovations',
      industry: 'Automotive',
      duration: '3 months',
      isPaid: true,
      salary: '8800 EGP/month',
      deadline: '2025-06-20',
      postedAt: '2 days ago'
    },
    {
      id: 17,
      title: 'Manufacturing Process Intern',
      company: 'Manufacturing Systems',
      industry: 'Manufacturing',
      duration: '4 months',
      isPaid: true,
      salary: '9200 EGP/month',
      deadline: '2025-06-25',
      postedAt: '4 days ago'
    },
    {
      id: 18,
      title: 'Robotics Engineering Intern',
      company: 'Robotics Solutions',
      industry: 'Robotics',
      duration: '3 months',
      isPaid: true,
      salary: '9500 EGP/month',
      deadline: '2025-07-02',
      postedAt: '1 week ago'
    }
  ],
  7: [ // Civil Engineering
    {
      id: 19,
      title: 'Construction Management Intern',
      company: 'Construction Partners',
      industry: 'Construction',
      duration: '3 months',
      isPaid: true,
      salary: '8300 EGP/month',
      deadline: '2025-06-18',
      postedAt: '3 days ago'
    },
    {
      id: 20,
      title: 'Urban Planning Intern',
      company: 'Urban Planning Group',
      industry: 'Urban Planning',
      duration: '4 months',
      isPaid: true,
      salary: '8700 EGP/month',
      deadline: '2025-06-23',
      postedAt: '5 days ago'
    },
    {
      id: 21,
      title: 'Infrastructure Engineering Intern',
      company: 'Infrastructure Solutions',
      industry: 'Infrastructure',
      duration: '3 months',
      isPaid: true,
      salary: '9100 EGP/month',
      deadline: '2025-06-28',
      postedAt: '1 week ago'
    }
  ],
  8: [ // Architecture
    {
      id: 22,
      title: 'Architectural Design Intern',
      company: 'Design Studio International',
      industry: 'Architectural Design',
      duration: '3 months',
      isPaid: true,
      salary: '8600 EGP/month',
      deadline: '2025-06-15',
      postedAt: '2 days ago'
    },
    {
      id: 23,
      title: 'Urban Architecture Intern',
      company: 'Urban Spaces',
      industry: 'Urban Architecture',
      duration: '4 months',
      isPaid: true,
      salary: '9000 EGP/month',
      deadline: '2025-06-22',
      postedAt: '4 days ago'
    },
    {
      id: 24,
      title: 'Sustainable Design Intern',
      company: 'Sustainable Buildings',
      industry: 'Sustainable Architecture',
      duration: '3 months',
      isPaid: true,
      salary: '8800 EGP/month',
      deadline: '2025-06-27',
      postedAt: '1 week ago'
    }
  ],
  9: [ // Business Administration
    {
      id: 25,
      title: 'Management Consulting Intern',
      company: 'Global Consulting Group',
      industry: 'Management Consulting',
      duration: '3 months',
      isPaid: true,
      salary: '9200 EGP/month',
      deadline: '2025-06-17',
      postedAt: '3 days ago'
    },
    {
      id: 26,
      title: 'Financial Analysis Intern',
      company: 'Financial Solutions Inc.',
      industry: 'Finance',
      duration: '4 months',
      isPaid: true,
      salary: '9500 EGP/month',
      deadline: '2025-06-24',
      postedAt: '5 days ago'
    },
    {
      id: 27,
      title: 'Marketing Strategy Intern',
      company: 'Marketing Innovations',
      industry: 'Marketing',
      duration: '3 months',
      isPaid: true,
      salary: '8900 EGP/month',
      deadline: '2025-06-29',
      postedAt: '1 week ago'
    }
  ]
};

// Dummy data for viewed companies by major (for pro students)
const dummyViewedCompaniesByMajor = {
  1: [ // Computer Science
    { id: 1, name: 'Tech Solutions Inc.', industry: 'Information Technology', logo: '/companies/tech-solutions.png', rating: 4.8, recommendedBy: 27, openPositions: 3, viewedProfile: '2025-05-01' },
    { id: 2, name: 'DataInsights Corp.', industry: 'Data Analytics', logo: '/companies/datainsights.png', rating: 4.5, recommendedBy: 15, openPositions: 2, viewedProfile: '2025-05-05' },
    { id: 3, name: 'Creative Studios', industry: 'Design', logo: '/companies/creative-studios.png', rating: 4.6, recommendedBy: 12, openPositions: 1, viewedProfile: '2025-05-10' },
    { id: 10, name: 'Cloud Solutions', industry: 'Cloud Computing', logo: '/companies/cloud-solutions.png', rating: 4.7, recommendedBy: 22, openPositions: 2, viewedProfile: '2025-05-08' }
  ],
  2: [ // Computer Engineering
    { id: 4, name: 'Hardware Innovations', industry: 'Hardware Engineering', logo: '/companies/hardware-innovations.png', rating: 4.7, recommendedBy: 19, openPositions: 2, viewedProfile: '2025-05-03' },
    { id: 5, name: 'Embedded Systems Co.', industry: 'Embedded Systems', logo: '/companies/embedded-systems.png', rating: 4.3, recommendedBy: 14, openPositions: 3, viewedProfile: '2025-05-07' },
    { id: 1, name: 'Tech Solutions Inc.', industry: 'Information Technology', logo: '/companies/tech-solutions.png', rating: 4.8, recommendedBy: 27, openPositions: 3, viewedProfile: '2025-05-09' }
  ],
  3: [ // Information Systems
    { id: 7, name: 'Business Intelligence Inc.', industry: 'Business Intelligence', logo: '/companies/business-intelligence.png', rating: 4.4, recommendedBy: 18, openPositions: 4, viewedProfile: '2025-05-02' },
    { id: 8, name: 'Systems Integration Ltd.', industry: 'IT Integration', logo: '/companies/systems-integration.png', rating: 4.2, recommendedBy: 12, openPositions: 2, viewedProfile: '2025-05-06' },
    { id: 2, name: 'DataInsights Corp.', industry: 'Data Analytics', logo: '/companies/datainsights.png', rating: 4.5, recommendedBy: 15, openPositions: 3, viewedProfile: '2025-05-11' },
    { id: 1, name: 'Tech Solutions Inc.', industry: 'Information Technology', logo: '/companies/tech-solutions.png', rating: 4.8, recommendedBy: 27, openPositions: 3, viewedProfile: '2025-05-04' }
  ],
  4: [ // Software Engineering
    { id: 1, name: 'Tech Solutions Inc.', industry: 'Information Technology', logo: '/companies/tech-solutions.png', rating: 4.8, recommendedBy: 30, openPositions: 5, viewedProfile: '2025-05-03' },
    { id: 9, name: 'App Development Labs', industry: 'Mobile Development', logo: '/companies/app-development.png', rating: 4.6, recommendedBy: 25, openPositions: 3, viewedProfile: '2025-05-08' },
    { id: 10, name: 'Cloud Solutions', industry: 'Cloud Computing', logo: '/companies/cloud-solutions.png', rating: 4.7, recommendedBy: 22, openPositions: 2, viewedProfile: '2025-05-12' },
    { id: 3, name: 'Creative Studios', industry: 'Design', logo: '/companies/creative-studios.png', rating: 4.6, recommendedBy: 12, openPositions: 1, viewedProfile: '2025-05-07' }
  ],
  5: [ // Electrical Engineering
    { id: 11, name: 'Power Systems Co.', industry: 'Power Engineering', logo: '/companies/power-systems.png', rating: 4.3, recommendedBy: 16, openPositions: 2, viewedProfile: '2025-05-02' },
    { id: 12, name: 'Electronics Manufacturing', industry: 'Electronics', logo: '/companies/electronics-manufacturing.png', rating: 4.4, recommendedBy: 14, openPositions: 3, viewedProfile: '2025-05-09' },
    { id: 13, name: 'Telecommunications Ltd.', industry: 'Telecommunications', logo: '/companies/telecommunications.png', rating: 4.5, recommendedBy: 18, openPositions: 1, viewedProfile: '2025-05-04' },
    { id: 16, name: 'Robotics Solutions', industry: 'Robotics', logo: '/companies/robotics-solutions.png', rating: 4.7, recommendedBy: 25, openPositions: 4, viewedProfile: '2025-05-11' }
  ],
  6: [ // Mechanical Engineering
    { id: 14, name: 'Automotive Innovations', industry: 'Automotive', logo: '/companies/automotive-innovations.png', rating: 4.6, recommendedBy: 21, openPositions: 3, viewedProfile: '2025-05-05' },
    { id: 15, name: 'Manufacturing Systems', industry: 'Manufacturing', logo: '/companies/manufacturing-systems.png', rating: 4.2, recommendedBy: 18, openPositions: 2, viewedProfile: '2025-05-09' },
    { id: 16, name: 'Robotics Solutions', industry: 'Robotics', logo: '/companies/robotics-solutions.png', rating: 4.7, recommendedBy: 25, openPositions: 4, viewedProfile: '2025-05-03' },
    { id: 12, name: 'Electronics Manufacturing', industry: 'Electronics', logo: '/companies/electronics-manufacturing.png', rating: 4.4, recommendedBy: 14, openPositions: 3, viewedProfile: '2025-05-12' }
  ],
  7: [ // Civil Engineering
    { id: 17, name: 'Construction Partners', industry: 'Construction', logo: '/companies/construction-partners.png', rating: 4.3, recommendedBy: 17, openPositions: 3, viewedProfile: '2025-05-01' },
    { id: 18, name: 'Urban Planning Group', industry: 'Urban Planning', logo: '/companies/urban-planning.png', rating: 4.5, recommendedBy: 14, openPositions: 2, viewedProfile: '2025-05-07' },
    { id: 19, name: 'Infrastructure Solutions', industry: 'Infrastructure', logo: '/companies/infrastructure-solutions.png', rating: 4.4, recommendedBy: 20, openPositions: 4, viewedProfile: '2025-05-10' },
    { id: 21, name: 'Urban Spaces', industry: 'Urban Architecture', logo: '/companies/urban-spaces.png', rating: 4.6, recommendedBy: 19, openPositions: 2, viewedProfile: '2025-05-04' }
  ],
  8: [ // Architecture
    { id: 20, name: 'Design Studio International', industry: 'Architectural Design', logo: '/companies/design-studio.png', rating: 4.8, recommendedBy: 24, openPositions: 3, viewedProfile: '2025-05-06' },
    { id: 21, name: 'Urban Spaces', industry: 'Urban Architecture', logo: '/companies/urban-spaces.png', rating: 4.6, recommendedBy: 19, openPositions: 2, viewedProfile: '2025-05-02' },
    { id: 22, name: 'Sustainable Buildings', industry: 'Sustainable Architecture', logo: '/companies/sustainable-buildings.png', rating: 4.7, recommendedBy: 23, openPositions: 4, viewedProfile: '2025-05-11' },
    { id: 18, name: 'Urban Planning Group', industry: 'Urban Planning', logo: '/companies/urban-planning.png', rating: 4.5, recommendedBy: 14, openPositions: 2, viewedProfile: '2025-05-08' }
  ],
  9: [ // Business Administration
    { id: 23, name: 'Global Consulting Group', industry: 'Management Consulting', logo: '/companies/global-consulting.png', rating: 4.7, recommendedBy: 26, openPositions: 5, viewedProfile: '2025-05-05' },
    { id: 24, name: 'Financial Solutions Inc.', industry: 'Finance', logo: '/companies/financial-solutions.png', rating: 4.5, recommendedBy: 22, openPositions: 3, viewedProfile: '2025-05-09' },
    { id: 25, name: 'Marketing Innovations', industry: 'Marketing', logo: '/companies/marketing-innovations.png', rating: 4.6, recommendedBy: 20, openPositions: 4, viewedProfile: '2025-05-03' },
    { id: 7, name: 'Business Intelligence Inc.', industry: 'Business Intelligence', logo: '/companies/business-intelligence.png', rating: 4.4, recommendedBy: 18, openPositions: 4, viewedProfile: '2025-05-12' }
  ]
};

// Dummy student data
const dummyStudentData = {
  name: 'Ahmed Hassan',
  id: '41-12345',
  major: 'Computer Science',
  majorId: 1,
  semester: 8,
  internshipHours: 180,
  requiredHours: 240,
  profileCompletion: 85,
  notifications: [
    { id: 1, type: 'application', title: 'Application Status Update', message: 'Your application for "Software Engineering Intern" at Tech Solutions Inc. has been accepted!', date: '2025-05-09', read: false, details: 'Congratulations! Your application has been reviewed and accepted. Please check your email for further instructions and schedule your onboarding session within the next 7 days.', actions: [{ label: 'View Application', action: 'view', path: '/student/applications' }] },
    { id: 2, type: 'report', title: 'Report Status Update', message: 'Your internship report has been flagged. Please check the comments.', date: '2025-05-08', read: true, details: 'Your supervisor has left some comments on your latest weekly report. They\'ve requested clarification on the tasks you completed last week. Please revise your report by Friday.', actions: [{ label: 'View Comments', action: 'comments', path: '/student/reports' }, { label: 'Edit Report', action: 'edit', path: '/student/reports' }] },
    { id: 3, type: 'cycle', title: 'New Internship Cycle', message: 'Summer 2025 internship cycle has begun! Start applying now.', date: '2025-05-01', read: true, details: 'The summer 2025 internship cycle is now open for applications. Over 150 companies have posted new positions. Based on your profile, we recommend checking out opportunities in software development and data analysis.', actions: [{ label: 'Browse Opportunities', action: 'browse', path: '/student/internships' }, { label: 'Update Preferences', action: 'preferences', path: '/student/profile' }] }
  ]
};

const dummyProStudentData = {
  name: 'Ahmed Hassan',
  id: '41-12345',
  major: 'Computer Science',
  majorId: 1,
  semester: 8,
  internshipHours: 180,
  requiredHours: 240,
  profileCompletion: 85,
  isPro: true,
  notifications: [
    { id: 1, type: 'application', title: 'Application Status Update', message: 'Your application for "Software Engineering Intern" at Tech Solutions Inc. has been accepted!', date: '2025-05-09', read: false, details: 'Congratulations! Your application has been reviewed and accepted. Please check your email for further instructions and schedule your onboarding session within the next 7 days.', actions: [{ label: 'View Application', action: 'view', path: '/proStudent/applications' }] },
    { id: 2, type: 'workshop', title: 'Workshop Reminder', message: 'Your registered workshop "Advanced React Patterns" starts tomorrow!', date: '2025-05-10', read: false, details: 'Your registration for the "Advanced React Patterns" workshop has been confirmed. The workshop starts tomorrow at 10:00 AM in Lab 305. Please bring your laptop and make sure you have Node.js and React installed. Looking forward to seeing you there!', actions: [{ label: 'View Workshop', action: 'view', path: '/proStudent/workshops' }] },
    { id: 3, type: 'appointment', title: 'Career Guidance Appointment', message: 'Your appointment with SCAD Office is confirmed for 2025-05-12.', date: '2025-05-08', read: true, details: 'Your career guidance appointment with the Student Career Advancement Department (SCAD) has been confirmed for Monday, May 12, 2025, at 2:00 PM. Please arrive 10 minutes early and bring your updated CV and portfolio if available. The meeting will take place in the SCAD office, Building C, Room 210.', actions: [{ label: 'View Appointment', action: 'view', path: '/proStudent/career-guidance' }] },
    { id: 4, type: 'appointment', title: 'Appointment Request Accepted', message: 'Your appointment request with SCAD Office has been accepted.', date: '2025-05-07', read: true, details: 'The SCAD Officer has reviewed and accepted your appointment request. You will be notified of the scheduled date and time shortly. Please check your email for any additional information.', actions: [{ label: 'View Appointment', action: 'view', path: '/proStudent/career-guidance' }] },
    { id: 5, type: 'call', title: 'Upcoming Virtual Meeting', message: 'You have a virtual meeting with SCAD Office tomorrow at 10:00 AM.', date: '2025-05-15', read: true, details: 'Your virtual career guidance meeting with the SCAD Office is scheduled for tomorrow, May 16, 2025, at 10:00 AM. Please ensure you have a stable internet connection and join the meeting 5 minutes early. The meeting link will be sent to your email shortly.', actions: [{ label: 'View Meeting Details', action: 'view', path: '/proStudent/career-guidance' }] }
  ]
};

// Notification Modal
const NotificationModal = ({ notification, onClose, onAction }) => {
  if (!notification) return null;

  const getTypeIcon = () => {
    switch (notification.type) {
      case 'application':
        return <div className="bg-blue-100 p-3 rounded-full"><svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
      case 'report':
        return <div className="bg-red-100 p-3 rounded-full"><svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>;
      case 'cycle':
        return <div className="bg-green-100 p-3 rounded-full"><svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>;
      case 'workshop':
        return <div className="bg-green-100 p-3 rounded-full"><svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>;
      case 'appointment':
        return <div className="bg-purple-100 p-3 rounded-full"><svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>;
      default:
        return <div className="bg-gray-100 p-3 rounded-full"><svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto overflow-hidden animate-fade tester-in-up">
        <div className="p-6 border-b border-gray-200 flex items-start space-x-4">
          {getTypeIcon()}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{notification.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600">{notification.details}</p>
        </div>
        <div className="p-6 bg-gray-50 flex flex-wrap justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none">Close</button>
          {notification.actions && notification.actions.map((action, index) => (
            <button key={index} onClick={() => onAction(action)} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none">{action.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Major/Semester Modal
const MajorSemesterModal = ({ isOpen, onClose, majors, semesters, currentMajorId, currentSemester, onSave }) => {
  const [selectedMajorId, setSelectedMajorId] = useState(currentMajorId);
  const [selectedSemester, setSelectedSemester] = useState(currentSemester);

  useEffect(() => {
    if (isOpen) {
      setSelectedMajorId(currentMajorId);
      setSelectedSemester(currentSemester);
    }
  }, [isOpen, currentMajorId, currentSemester]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden animate-fade tester-in-up">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Update Major & Semester</h3>
          <p className="text-sm text-gray-500 mt-1">Select your major and current semester</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">Major</label>
            <select id="major" value={selectedMajorId} onChange={(e) => setSelectedMajorId(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              {majors.map((major) => <option key={major.id} value={major.id}>{major.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <select id="semester" value={selectedSemester} onChange={(e) => setSelectedSemester(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              {semesters.map((semester) => <option key={semester.id} value={semester.number}>Semester {semester.number}</option>)}
            </select>
          </div>
        </div>
        <div className="p-6 bg-gray-50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none">Cancel</button>
          <button onClick={() => onSave(selectedMajorId, selectedSemester)} className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

const UnifiedDashboard = () => {
  const { userRole } = useContext(AuthContext);
  const role = userRole;
  const [student, setStudent] = useState(null);
  const [suggestedCompanies, setSuggestedCompanies] = useState([]);
  const [recentInternships, setRecentInternships] = useState([]);
  const [viewedCompanies, setViewedCompanies] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [majorSemesterModalOpen, setMajorSemesterModalOpen] = useState(false);
  const navigate = useNavigate();

  const getCompaniesByMajor = (majorId) => dummyCompaniesByMajor[majorId] || dummyCompaniesByMajor[1];
  const getInternshipsByMajor = (majorId) => dummyInternshipsByMajor[majorId] || dummyInternshipsByMajor[1];
  const getViewedCompaniesByMajor = (majorId) => dummyViewedCompaniesByMajor[majorId] || [];
  console.log(role);
  useEffect(() => {
    if (role === 'student'){ setStudent(dummyStudentData);}
    else if (role === 'proStudent') {setStudent(dummyProStudentData); }
  }, [role]);

  useEffect(() => {
    if (student) {
      setSuggestedCompanies(getCompaniesByMajor(student.majorId));
      setRecentInternships(getInternshipsByMajor(student.majorId));
      if (role === 'proStudent') setViewedCompanies(getViewedCompaniesByMajor(student.majorId));
      setUnreadNotifications(student.notifications.filter(n => !n.read).length);
    }
  }, [student, role]);

  if (!student) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  const handleMajorSemesterChange = (majorId, semester) => {
    const majorName = majorsList.find(m => m.id === majorId)?.name || student.major;
    const updatedStudent = { ...student, major: majorName, majorId, semester };
    setStudent(updatedStudent);
    setSuggestedCompanies(getCompaniesByMajor(majorId));
    setRecentInternships(getInternshipsByMajor(majorId));
    if (role === 'proStudent') setViewedCompanies(getViewedCompaniesByMajor(majorId));
    setMajorSemesterModalOpen(false);
  };

  const markAllAsRead = () => {
    const updatedNotifications = student.notifications.map(n => ({ ...n, read: true }));
    setStudent({ ...student, notifications: updatedNotifications });
    setUnreadNotifications(0);
  };

  const handleNotificationClick = (notification) => {
    const updatedNotifications = student.notifications.map(n => n.id === notification.id ? { ...n, read: true } : n);
    setStudent({ ...student, notifications: updatedNotifications });
    setUnreadNotifications(updatedNotifications.filter(n => !n.read).length);
    setSelectedNotification(notification);
  };

  const handleModalClose = () => setSelectedNotification(null);

  const handleNotificationAction = (action) => {
    console.log(`Action triggered: ${action.action}`);
    setSelectedNotification(null);
    if (action.path) navigate(action.path);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold">Welcome back, {student.name}</h1>
              {role === 'proStudent' && (
                <span className="ml-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  PRO
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </span>
              )}
            </div>
            <button onClick={() => setMajorSemesterModalOpen(true)} className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md text-white flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Change Major/Semester
            </button>
          </div>
          <p className="mt-2">Student ID: {student.id} | {student.major}, Semester {student.semester}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Internship Progress</h2>
            <div className="flex items-center mb-2">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{student.internshipHours} / {student.requiredHours} hours completed</span>
                  <span className="text-sm font-medium text-gray-700">{Math.round((student.internshipHours / student.requiredHours) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(student.internshipHours / student.requiredHours) * 100}%` }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                  <span className="text-sm font-medium text-gray-700">{student.profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${student.profileCompletion}%` }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link to={`/${role}/profile`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">Complete Your Profile</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent Internships for {student.major}</h2>
              <Link to={`/${role}/internships`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</Link>
            </div>
            <div className="space-y-4">
              {recentInternships.map((internship) => (
                <div key={internship.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{internship.title}</h3>
                    <span className="text-sm text-gray-500">{internship.postedAt}</span>
                  </div>
                  <p className="text-gray-600">{internship.company}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{internship.industry}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{internship.duration}</span>
                    {internship.isPaid && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{internship.salary}</span>}
                  </div>
                  <div className="mt-3">
                    <Link to={`/${role}/internships/${internship.id}`}>
                      <Button className="bg-blue-600 text-white hover:bg-blue-700 text-sm py-1">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {role === 'proStudent' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Companies Viewed Your Profile</h2>
              <div className="space-y-4">
                {viewedCompanies.map((company) => (
                  <div key={company.id} className="flex items-center space-x-3 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-700">{company.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-600">Viewed on {company.viewedProfile}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Notifications
                {unreadNotifications > 0 && <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{unreadNotifications}</span>}
              </h2>
              {unreadNotifications > 0 && <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>}
            </div>
            <div className="space-y-4">
              {student.notifications.length > 0 ? (
                student.notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50'} cursor-pointer hover:bg-gray-100 transition-colors duration-200`} onClick={() => handleNotificationClick(notification)}>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No notifications yet</p>
              )}
            </div>
          </div>

          { (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Suggested Companies</h2>
              </div>
              <div className="space-y-4">
                {suggestedCompanies.map((company) => (
                  <div key={company.id} className="flex items-center space-x-3 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium text-gray-700">{company.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                      <div className="mt-1 flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600">{company.rating} • Recommended by {company.recommendedBy} students</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-sm text-blue-600">{company.openPositions} open positions</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link to={`/${role}/applications`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">My Applications</Link>
              <Link to={`/${role}/reports`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">My Reports</Link>
              <Link to={`/${role}/internships`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">Browse Internships</Link>
              <Link to={`/${role}/profile`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">My Profile</Link>
              {role === 'proStudent' && (
                <>
                  <Link to={`/${role}/assessments`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">Assessments</Link>
                  <Link to={`/${role}/workshops`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">Workshops</Link>
                  <Link to={`/${role}/careerGuidance`} className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 font-medium">Career Guidance</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedNotification && <NotificationModal notification={selectedNotification} onClose={handleModalClose} onAction={handleNotificationAction} />}
      <MajorSemesterModal isOpen={majorSemesterModalOpen} onClose={() => setMajorSemesterModalOpen(false)} majors={majorsList} semesters={semestersList} currentMajorId={student.majorId} currentSemester={student.semester} onSave={handleMajorSemesterChange} />
    </div>
  );
};

export default UnifiedDashboard;