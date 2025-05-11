import React from 'react';
import { Link } from 'react-router-dom';

const CompanyDashboard = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Company Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/company/internship-posts"
            className="p-6 bg-blue-100 rounded-lg text-center text-blue-700 hover:bg-blue-200 transition"
          >
            <h2 className="text-lg font-semibold">Manage Internship Posts</h2>
            <p className="mt-2 text-sm text-gray-600">Create, edit, or delete internship listings.</p>
          </Link>
          <Link
            to="/company/applications"
            className="p-6 bg-green-100 rounded-lg text-center text-green-700 hover:bg-green-200 transition"
          >
            <h2 className="text-lg font-semibold">View Applications</h2>
            <p className="mt-2 text-sm text-gray-600">Review student applications to your posts.</p>
          </Link>
          <Link
            to="/company/interns"
            className="p-6 bg-yellow-100 rounded-lg text-center text-yellow-700 hover:bg-yellow-200 transition"
          >
            <h2 className="text-lg font-semibold">Manage Interns</h2>
            <p className="mt-2 text-sm text-gray-600">Track current and past interns.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;