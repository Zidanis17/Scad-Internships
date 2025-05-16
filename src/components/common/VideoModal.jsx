// VideoModal.jsx - Add this as a new component
import React, { useEffect, useRef } from 'react';
import Button from './Button';

const VideoModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  workshop
}) => {
  const modalRef = useRef();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Close on outside click
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-7xl max-h-[90vh] overflow-hidden bg-white rounded-lg shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            {title}
            {workshop?.isLive && (
              <span className="ml-3 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                Live
              </span>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;