import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Resources() {
  const [resources, setResources] = useState([]); // To hold the list of resources
  const [error, setError] = useState('');

  // 1. Get the token from localStorage
  const token = localStorage.getItem('token');
  
  // 2. Use 'useEffect' to fetch data when the component loads
  useEffect(() => {
    const fetchResources = async () => {
      try {
        // 3. Make an authenticated API call
        const response = await axios.get('http://localhost:5000/api/resources', {
          headers: {
            Authorization: `Bearer ${token}` // Send the token
          }
        });
        setResources(response.data); // Save the list
      } catch (err) {
        setError('Failed to fetch resources.');
      }
    };

    if (token) {
      fetchResources();
    }
  }, [token]); // Re-run if the token changes

  if (error) {
    return <p>{error}</p>;
  }

  // 4. The JSX to display the list
  return (
    <div className="resources-list">
      <h2>Digital Resources</h2>
      {resources.length === 0 ? (
        <p>No resources uploaded yet.</p>
      ) : (
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>
              <strong>{resource.title}</strong>
              <p>{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                Go to Resource
              </a>
              {/* This check is needed in case the user was deleted */}
              <small> (Uploaded by: {resource.User ? resource.User.username : 'Unknown'})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Resources;