import React, { useState } from 'react';
import Button from '../common/Button';
import jsPDF from 'jspdf';

const EvaluationForm = ({ onSubmit, initialData = {}, evaluationType = 'company', onDeleteEvaluation }) => {
  const [formData, setFormData] = useState({
    companyName: initialData.companyName || '', // Add companyName to state
    rating: initialData.rating || 3,
    strengths: initialData.strengths || '',
    areasForImprovement: initialData.areasForImprovement || '',
    comments: initialData.comments || '',
    recommended: initialData.hasOwnProperty('recommended') ? initialData.recommended : true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleDelete = () => {
    if (typeof window.onDeleteEvaluation === 'function') {
      window.onDeleteEvaluation();
    } else if (onDeleteEvaluation) {
      onDeleteEvaluation();
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Set font size and styling
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    
    // Title
    const title = evaluationType === 'company' 
      ? 'Internship Evaluation Report' 
      : 'Student Performance Evaluation';
    doc.text(title, 105, 20, { align: 'center' });
    
    // Reset font for body text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // Add content
    let yPosition = 40;
    const leftMargin = 20;
    const lineHeight = 8;
    
    // Company name
    doc.setFont('helvetica', 'bold');
    doc.text(`Company: ${formData.companyName}`, leftMargin, yPosition);
    yPosition += lineHeight * 2;
    
    // Rating
    doc.text(`Overall Rating: ${formData.rating}/5`, leftMargin, yPosition);
    yPosition += lineHeight * 2;
    
    // Strengths
    doc.text(evaluationType === 'company' ? 'Strengths of the Internship:' : 'Student Strengths:', leftMargin, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += lineHeight;
    
    // Handle multi-line text
    const strengthLines = doc.splitTextToSize(formData.strengths || 'None provided', 170);
    doc.text(strengthLines, leftMargin, yPosition);
    yPosition += (strengthLines.length * lineHeight) + lineHeight;
    
    // Areas for Improvement
    doc.setFont('helvetica', 'bold');
    doc.text(evaluationType === 'company' ? 'Areas for Improvement:' : 'Areas for Student Development:', leftMargin, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += lineHeight;
    
    const improvementLines = doc.splitTextToSize(formData.areasForImprovement || 'None provided', 170);
    doc.text(improvementLines, leftMargin, yPosition);
    yPosition += (improvementLines.length * lineHeight) + lineHeight;
    
    // Additional Comments
    doc.setFont('helvetica', 'bold');
    doc.text('Additional Comments:', leftMargin, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += lineHeight;
    
    const commentLines = doc.splitTextToSize(formData.comments || 'None provided', 170);
    doc.text(commentLines, leftMargin, yPosition);
    yPosition += (commentLines.length * lineHeight) + lineHeight;
    
    // Recommendation (for company evaluations only)
    if (evaluationType === 'company') {
      doc.setFont('helvetica', 'bold');
      doc.text(`Recommendation: ${formData.recommended ? 'Recommended for future students' : 'Not recommended for future students'}`, leftMargin, yPosition);
      yPosition += lineHeight * 2;
    }
    
    // Add date at the bottom
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, leftMargin, 280);
    
    // Save the PDF
    doc.save(`${evaluationType === 'company' ? 'Internship' : 'Student'}_Evaluation_${formData.companyName}.pdf`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {evaluationType === 'company'
          ? 'Evaluate Your Internship Experience'
          : 'Evaluate Student Performance'}
      </h2>

      {/* Add Company Name field */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
        {initialData.id ? (
          <p className="text-gray-700">{formData.companyName}</p> // Display only for editing
        ) : (
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="Enter the company name"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Overall Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={star <= formData.rating ? 'currentColor' : 'none'}
                stroke="currentColor"
                className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Rest of the form remains unchanged */}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {evaluationType === 'company' ? 'Strengths of the Internship' : 'Student Strengths'}
        </label>
        <textarea
          name="strengths"
          value={formData.strengths}
          onChange={handleChange}
          className="border rounded p-2 w-full h-24"
          placeholder={evaluationType === 'company'
            ? 'What aspects of the internship were most valuable?'
            : 'What were the student\'s strongest skills or attributes?'}
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {evaluationType === 'company' ? 'Areas for Improvement' : 'Areas for Student Development'}
        </label>
        <textarea
          name="areasForImprovement"
          value={formData.areasForImprovement}
          onChange={handleChange}
          className="border rounded p-2 w-full h-24"
          placeholder={evaluationType === 'company'
            ? 'What aspects of the internship could be improved?'
            : 'What skills or attributes could the student develop further?'}
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Additional Comments
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          className="border rounded p-2 w-full h-24"
          placeholder="Any other comments or feedback"
        ></textarea>
      </div>

      {evaluationType === 'company' && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="recommended"
            name="recommended"
            checked={formData.recommended}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="recommended" className="text-gray-700">
            I would recommend this company to other students
          </label>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button 
          variant="secondary" 
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={handleDownloadPDF}
        >
          Download Evaluation
        </Button>
        
        {initialData.rating && (
          <Button
            variant="danger"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete Evaluation
          </Button>
        )}
        
        <Button variant="primary" onClick={handleSubmit}>
          Submit Evaluation
        </Button>
      </div>
    </div>
  );
};

export default EvaluationForm;