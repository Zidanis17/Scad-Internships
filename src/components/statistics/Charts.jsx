import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Button from '../common/Button';

const Charts = ({ statsData }) => {
  const [activeChart, setActiveChart] = useState('applications');
  
  // Mock data for charts if not provided
  const data = statsData || {
    applications: [
      { name: 'Jan', count: 12 },
      { name: 'Feb', count: 19 },
      { name: 'Mar', count: 23 },
      { name: 'Apr', count: 34 },
      { name: 'May', count: 45 },
      { name: 'Jun', count: 36 },
      { name: 'Jul', count: 28 },
      { name: 'Aug', count: 39 },
      { name: 'Sep', count: 25 },
      { name: 'Oct', count: 18 },
      { name: 'Nov', count: 22 },
      { name: 'Dec', count: 15 },
    ],
    status: [
      { name: 'Pending', value: 45 },
      { name: 'Accepted', value: 68 },
      { name: 'Rejected', value: 24 },
      { name: 'Finalized', value: 53 },
    ],
    companies: [
      { name: 'Technology', count: 53 },
      { name: 'Finance', count: 28 },
      { name: 'Healthcare', count: 17 },
      { name: 'Education', count: 22 },
      { name: 'Manufacturing', count: 14 },
      { name: 'Retail', count: 19 },
    ],
    completion: [
      { name: 'Week 1', percentage: 25 },
      { name: 'Week 2', percentage: 42 },
      { name: 'Week 3', percentage: 58 },
      { name: 'Week 4', percentage: 70 },
      { name: 'Week 5', percentage: 79 },
      { name: 'Week 6', percentage: 88 },
      { name: 'Week 7', percentage: 91 },
      { name: 'Week 8', percentage: 95 },
    ],
    majors: [
      { name: 'Computer Science', value: 125 },
      { name: 'Media Engineering', value: 85 },
      { name: 'Business Informatics', value: 65 },
      { name: 'Digital Media', value: 45 },
      { name: 'Information Systems', value: 55 },
    ]
  };

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Render different charts based on active selection
  const renderChart = () => {
    switch (activeChart) {
      case 'applications':
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.applications} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3B82F6" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Applications by Month</p>
          </div>
        );
      
      case 'status':
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.status}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.status.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Applications']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Application Status Distribution</p>
          </div>
        );
      
      case 'companies':
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.companies} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4ADE80" name="Companies" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Companies by Industry</p>
          </div>
        );
      
      case 'completion':
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.completion} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                <Legend />
                <Line type="monotone" dataKey="percentage" stroke="#8884d8" name="Completion Rate" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Internship Completion Progress</p>
          </div>
        );
      
      case 'majors':
        return (
          <div className="w-full h-64 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.majors}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.majors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Students']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center mt-4 text-gray-600">Students by Major</p>
          </div>
        );
      
      default:
        return <div>Select a chart type</div>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Internship Statistics</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeChart === 'applications' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('applications')}
        >
          Monthly Applications
        </Button>
        <Button 
          variant={activeChart === 'status' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('status')}
        >
          Application Status
        </Button>
        <Button 
          variant={activeChart === 'companies' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('companies')}
        >
          Company Industries
        </Button>
        <Button 
          variant={activeChart === 'completion' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('completion')}
        >
          Completion Rates
        </Button>
        <Button 
          variant={activeChart === 'majors' ? 'primary' : 'secondary'}
          onClick={() => setActiveChart('majors')}
        >
          Student Majors
        </Button>
      </div>
      
      <div className="border rounded-lg p-4">
        {renderChart()}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Total Applications</p>
          <p className="text-2xl font-bold mt-1">316</p>
          <p className="text-xs text-blue-500 mt-1">↑ 12% from previous cycle</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-600 font-medium">Acceptance Rate</p>
          <p className="text-2xl font-bold mt-1">68%</p>
          <p className="text-xs text-green-500 mt-1">↑ 5% from previous cycle</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Participating Companies</p>
          <p className="text-2xl font-bold mt-1">45</p>
          <p className="text-xs text-purple-500 mt-1">↑ 8 new companies</p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-600 font-medium">Average Completion</p>
          <p className="text-2xl font-bold mt-1">89%</p>
          <p className="text-xs text-amber-500 mt-1">↑ 3% from previous cycle</p>
        </div>
      </div>
    </div>
  );
};

export default Charts;