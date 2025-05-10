import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const EvaluationList = ({ evaluations, evaluationType = 'company', onView, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort evaluations
  const filteredEvaluations = evaluations
    .filter(evaluation => {
      // For company evaluations, search by student name
      if (evaluationType === 'student') {
        return evaluation.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      } 
      // For student evaluations, search by company name
      return evaluation.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortCriteria === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else if (sortCriteria === 'rating') {
        comparison = a.rating - b.rating;
      } else if (sortCriteria === 'name') {
        const nameA = evaluationType === 'student' ? a.studentName : a.companyName;
        const nameB = evaluationType === 'student' ? b.studentName : b.companyName;
        comparison = nameA.localeCompare(nameB);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={star <= rating ? 'currentColor' : 'none'} 
            stroke="currentColor"
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Input
          label={`Search by ${evaluationType === 'student' ? 'Student Name' : 'Company Name'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search ${evaluationType === 'student' ? 'students' : 'companies'}...`}
          className="w-full md:w-64"
        />
        
        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="sortCriteria" className="block text-gray-700 text-sm font-bold mb-2">Sort By</label>
            <select
              id="sortCriteria"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              className="border rounded p-2"
            >
              <option value="date">Date</option>
              <option value="rating">Rating</option>
              <option value="name">{evaluationType === 'student' ? 'Student Name' : 'Company Name'}</option>
            </select>
          </div>
          
          <Button 
            variant="outline" 
            onClick={toggleSortOrder}
            className="mt-6"
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </Button>
        </div>
      </div>

      {filteredEvaluations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No evaluations found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvaluations.map((evaluation) => (
            <div key={evaluation.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">
                    {evaluationType === 'student' ? evaluation.studentName : evaluation.companyName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {new Date(evaluation.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  {renderStars(evaluation.rating)}
                  {evaluationType === 'company' && (
                    <span className={`text-xs mt-1 ${evaluation.recommended ? 'text-green-600' : 'text-red-600'}`}>
                      {evaluation.recommended ? 'Recommended' : 'Not Recommended'}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-700 line-clamp-3">{evaluation.comments}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button variant="primary" onClick={() => onView(evaluation.id)}>
                  View Details
                </Button>
                <Button variant="secondary" onClick={() => onEdit(evaluation.id)}>
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EvaluationList;