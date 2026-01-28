import React, { useState } from 'react';
import axios from 'axios';

function UploadResource() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });
  const token = localStorage.getItem('token'); // Get the token

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data and the token
      await axios.post('http://localhost:5000/api/resources', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Resource uploaded successfully!');
      // Clear the form
      setFormData({ title: '', description: '', link: '' });

      // We will add a function here later to auto-refresh the list

    } catch (error) {
      alert('Error uploading resource: ' + error.response.data.message);
    }
  };

  return (
    <div className="upload-form">
      <h3>Upload New Resource</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Link (URL):</label>
          <input type="url" name="link" value={formData.link} onChange={handleChange} required />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadResource;