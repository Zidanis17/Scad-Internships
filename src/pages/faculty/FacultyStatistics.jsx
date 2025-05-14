import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import Charts from '../../components/statistics/Charts';
import Button from '../../components/common/Button';
import { useToast } from '../../components/common/ToastContext';

// Dummy data for Statistics page
const dummyStatsData = {
  pendingCompanyApplications: 8,
  totalStudents: 150,
  submittedReports: 45,
  stats: {
    reports: [
      { name: 'Accepted', value: 30 },
      { name: 'Rejected', value: 10 },
      { name: 'Flagged', value: 5 },
    ],
    reviewTime: [
      { name: 'Week 1', days: 2 },
      { name: 'Week 2', days: 3 },
      { name: 'Week 3', days: 2.5 },
    ],
    courses: [
      { name: 'Computer Science', usage: 50 },
      { name: 'Media Engineering', usage: 30 },
    ],
    ratings: [
      { name: 'Tech Solutions Inc.', rating: 4.5 },
      { name: 'HealthCare Ltd.', rating: 3.8 },
    ],
  },
};

const Statistics = () => {
  const { success } = useToast();
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData(dummyStatsData);
    }, 500);
  }, []);

  const exportReport = () => {
    if (!data) return;
    const reportData = [
      {
        ReportStatus: 'Accepted',
        Count: data.stats.reports.find((r) => r.name === 'Accepted')?.value || 0,
      },
      {
        ReportStatus: 'Rejected',
        Count: data.stats.reports.find((r) => r.name === 'Rejected')?.value || 0,
      },
      {
        ReportStatus: 'Flagged',
        Count: data.stats.reports.find((r) => r.name === 'Flagged')?.value || 0,
      },
    ];
    const csv = Papa.unparse(reportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'statistics_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Report generated successfully');
  };

  if (!data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Statistics Dashboard</h1>
          <p className="mt-2">View key metrics and real-time statistics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">

        {/* Real-Time Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Real-Time Statistics</h2>
            <Button onClick={exportReport} variant="primary">
              Generate Report
            </Button>
          </div>
          <Charts statsData={data.stats} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;