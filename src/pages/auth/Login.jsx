import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

// Dummy users for authentication
const dummyUsers = [
  { email: 'student@guc.edu.eg', password: 'student123', role: 'student' },
  { email: 'pro_student@guc.edu.eg', password: 'pro123', role: 'proStudent' },
  { email: 'company@example.com', password: 'company123', role: 'company' },
  { email: 'faculty@guc.edu.eg', password: 'faculty123', role: 'faculty' },
  { email: 'scad@guc.edu.eg', password: 'scad123', role: 'scadOffice' },
];

// Mapping roles to dashboard path prefixes
const roleToPathPrefix = {
  student: 'student',
  proStudent: 'proStudent',
  company: 'company',
  faculty: 'faculty',
  scadOffice: 'scad',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = dummyUsers.find((u) => u.email === email);
    if (!user) {
      setError('User not found');
      return;
    }
    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }
    setError(null);
    login(user.role);
    const pathPrefix = roleToPathPrefix[user.role];
    navigate(`/${pathPrefix}/dashboard`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <img className="mx-auto h-8 w-auto" src="/logo.png" alt="GUC Logo" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Login to GUC Internship System</h2>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} name="login-form">
          <div className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autocomplete="email"
              className="w-full"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="current-password"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">

          <Link to="/register-company" className="font-medium text-blue-600 hover:text-blue-500">
            Register as a Company
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;