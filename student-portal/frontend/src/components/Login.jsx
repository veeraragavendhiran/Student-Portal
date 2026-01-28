import React, { useState } from 'react';
import axios from 'axios';

// 1. Accept BOTH setToken and setUserRole as props
function Login({ setToken, setUserRole }) {
  // 1. Create state for login form
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // 2. A function to update state when user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. A function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to our backend LOGIN endpoint
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        formData
      );
      
      console.log('Login successful:', response.data);
      
      // IMPORTANT: Save the token and role in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      
      // 4. Update the state in App.jsx for BOTH token and role
      setToken(response.data.token); 
      setUserRole(response.data.user.role); // <-- THIS IS THE NEW LINE
      
      // We can remove the alert now that we have navigation
      // alert('Login successful! Token saved.');

    } catch (error) {
      console.error('Login error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  // 4. The HTML-like JSX for the form
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;