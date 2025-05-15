import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Button from '../common/Button';

const Charts = ({ statsData }) => {
  const [activeChart, setActiveChart] = useState('reports');
  
  // Debug the data coming in
  useEffect(() => {
    console.log("Stats data received:", statsData);
  }, [statsData]);

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Check if data exists
  if (!statsData) {
    return <div className="text-center p-4 text-gray-500">No statistics data available</div>;
  }

  // Render different charts based on active selection
  const renderChart = () => {
    switch (activeChart) {
      case 'reports':
        if (!statsData.reports || !Array.isArray(statsData.reports) || statsData.reports.length === 0) {
          return <div className="text-center p-4 text-gray-500">No report statistics available</div>;
        }
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statsData.reports}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statsData.reports.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Reports']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Report Status Distribution</p>
          </div>
        );

      case 'reviewTime':
        if (!statsData.reviewTime || !Array.isArray(statsData.reviewTime) || statsData.reviewTime.length === 0) {
          return <div className="text-center p-4 text-gray-500">No review time statistics available</div>;
        }
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statsData.reviewTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} days`, 'Average Review Time']} />
                <Legend />
                <Line type="monotone" dataKey="days" stroke="#8884d8" name="Average Review Time" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Average Report Review Time</p>
          </div>
        );

      case 'courses':
        if (!statsData.courses || !Array.isArray(statsData.courses) || statsData.courses.length === 0) {
          return <div className="text-center p-4 text-gray-500">No course statistics available</div>;
        }
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData.courses} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [value, 'Usage']} />
                <Legend />
                <Bar dataKey="usage" fill="#4ADE80" name="Course Usage" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Course Distribution</p>
          </div>
        );

      case 'ratings':
        if (!statsData.ratings || !Array.isArray(statsData.ratings) || statsData.ratings.length === 0) {
          return <div className="text-center p-4 text-gray-500">No rating statistics available</div>;
        }
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData.ratings} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                <Tooltip formatter={(value) => [`${value} ⭐`, 'Rating']} />
                <Legend />
                <Bar dataKey="rating" fill="#3B82F6" name="Company Rating" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Company Ratings</p>
          </div>
        );

      default:
        return <div className="text-gray-500 text-center">Select a chart type</div>;
    }
  };

  // Calculate statistics
  const calculateReportTotal = () => {
    if (!statsData.reports || !Array.isArray(statsData.reports)) return 0;
    return statsData.reports.reduce((sum, item) => sum + (item.value || 0), 0);
  };

  const calculateAverageRating = () => {
    if (!statsData.ratings || !Array.isArray(statsData.ratings) || statsData.ratings.length === 0) return 0;
    return (statsData.ratings.reduce((sum, item) => sum + (item.rating || 0), 0) / statsData.ratings.length).toFixed(1);
  };

  const calculateAverageReviewTime = () => {
    if (!statsData.reviewTime || !Array.isArray(statsData.reviewTime) || statsData.reviewTime.length === 0) return 0;
    return (statsData.reviewTime.reduce((sum, item) => sum + (item.days || 0), 0) / statsData.reviewTime.length).toFixed(1);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Internship Statistics</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeChart === 'reports' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('reports')}
        >
          Report Status
        </Button>
        <Button 
          variant={activeChart === 'reviewTime' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('reviewTime')}
        >
          Review Time
        </Button>
        <Button 
          variant={activeChart === 'courses' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('courses')}
        >
          Course Distribution
        </Button>
        <Button 
          variant={activeChart === 'ratings' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('ratings')}
        >
          Company Ratings
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        {renderChart()}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Reports</p>
          <p className="text-2xl font-bold mt-1">{calculateReportTotal()}</p>
          <p className="text-xs text-blue-500 mt-1">From all departments</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-600 font-medium">Average Company Rating</p>
          <p className="text-2xl font-bold mt-1">
            {calculateAverageRating()} ⭐
          </p>
          <p className="text-xs text-green-500 mt-1">Based on student feedback</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Avg. Review Time</p>
          <p className="text-2xl font-bold mt-1">{calculateAverageReviewTime()} days</p>
          <p className="text-xs text-purple-500 mt-1">For processing reports</p>
        </div>
      </div>
    </div>
  );
};

export default Charts;
