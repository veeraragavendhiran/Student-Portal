import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import './AuthPage.css';

// 1. Make sure it accepts both props from App.jsx
function AuthPage({ setToken, setUserRole }) {
  return (
    <div className="auth-page-container">
      <h1>Student Portal</h1>
      <div className="auth-container">
        <Register />
        {/* 2. Pass BOTH props down to Login */}
        <Login setToken={setToken} setUserRole={setUserRole} />
      </div>
    </div>
  );
}

export default AuthPage;