import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  // 1. Create 'state' to hold the form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student' // Default role
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
    e.preventDefault(); // Stop the page from reloading
    try {
      // Send a POST request to our backend API
      const response = await axios.post(
        'http://localhost:5000/api/auth/register', 
        formData
      );

      console.log('Registration successful:', response.data);
      alert('Registration successful!');

    } catch (error) {
      console.error('Registration error:', error.response.data.message);
      alert('Error: ' + error.response.data.message);
    }
  };

  // 4. The HTML-like JSX for the form
  return (
    <div>
      <h2>Register</h2>
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
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;