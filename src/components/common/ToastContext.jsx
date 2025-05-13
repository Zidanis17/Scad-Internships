// ToastContext.jsx
import React, { createContext, useState, useContext } from 'react';
import Toast from './Toast';

// Create the context
const ToastContext = createContext();

/**
 * Provider component that wraps your app and makes toast functionality
 * available throughout your application
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now(); // Simple way to generate unique IDs
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    return id;
  };

  // Remove a toast by ID
  const closeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // Helper functions for different toast types
  const success = (message, duration) => showToast(message, 'success', duration);
  const error = (message, duration) => showToast(message, 'error', duration);
  const warning = (message, duration) => showToast(message, 'warning', duration);
  const info = (message, duration) => showToast(message, 'info', duration);

  // Value to be provided by the context
  const contextValue = {
    showToast,
    success,
    error,
    warning,
    info,
    closeToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Render all active toasts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => closeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
