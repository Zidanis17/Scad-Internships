import React, { useState, useEffect } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

const Interns = () => {
  const [interns, setInterns] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      internshipPost: 'Software Engineering Intern',
      status: 'current',
    },
    {
      id: 2,
      name: 'Bob Brown',
      internshipPost: 'Data Science Intern',
      status: 'completed',
      evaluation: {
        rating: 4,
        comments: 'Great work ethic.',
      },
    },
    {
      id: 3,
      name: 'Charlie Wilson',
      internshipPost: 'Software Engineering Intern',
      status: 'completed',
    },
  ]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [evaluationData, setEvaluationData] = useState({ rating: '', comments: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    if (selectedIntern && selectedIntern.evaluation) {
      setEvaluationData(selectedIntern.evaluation);
    } else {
      setEvaluationData({ rating: '', comments: '' });
    }
  }, [selectedIntern]);

  const filteredInterns = interns.filter(
    (intern) =>
      (intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.internshipPost.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === '' || intern.status === filterStatus)
  );

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Internship Post', accessor: 'internshipPost' },
    { header: 'Status', accessor: 'status' },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (row) => (
        <div>
          {row.status === 'completed' && (
            <Button onClick={() => handleEvaluation(row)}>
              {row.evaluation ? 'View/Edit Evaluation' : 'Add Evaluation'}
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleEvaluation = (intern) => {
    setSelectedIntern(intern);
    setIsEvaluationModalOpen(true);
  };

  const handleEvaluationSubmit = (e) => {
    e.preventDefault();
    setInterns(
      interns.map((intern) =>
        intern.id === selectedIntern.id ? { ...intern, evaluation: evaluationData } : intern
      )
    );
    setIsEvaluationModalOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl space-y-8 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900">Interns</h1>
        <input
          type="text"
          placeholder="Search by name or job title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="current">Current</option>
          <option value="completed">Completed</option>
        </select>
        <Table data={filteredInterns} columns={columns} />
        {isEvaluationModalOpen && selectedIntern && (
          <Modal onClose={() => setIsEvaluationModalOpen(false)}>
            <h2 className="text-2xl font-bold">
              {selectedIntern.evaluation ? 'Edit Evaluation' : 'Add Evaluation'}
            </h2>
            <p>Intern: {selectedIntern.name}</p>
            <p>Internship Post: {selectedIntern.internshipPost}</p>
            <form onSubmit={handleEvaluationSubmit}>
              <label>
                Rating:
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={evaluationData.rating}
                  onChange={(e) => setEvaluationData({ ...evaluationData, rating: e.target.value })}
                  className="mt-1 p-2 border rounded"
                />
              </label>
              <label>
                Comments:
                <textarea
                  value={evaluationData.comments}
                  onChange={(e) => setEvaluationData({ ...evaluationData, comments: e.target.value })}
                  className="mt-1 p-2 border rounded"
                />
              </label>
              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Interns;