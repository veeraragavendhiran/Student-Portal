import React from 'react';
import Resources from '../components/Resources';
import UploadResource from '../components/UploadResource';

// Receive all the props from App.jsx
function DashboardPage({ userRole, refreshKey, triggerRefresh }) {
  return (
    <div className="dashboard-container">
      <h2>Dashboard (Role: {userRole})</h2>

      {userRole === 'teacher' && (
        <UploadResource onUploadSuccess={triggerRefresh} />
      )}

      <hr />

      <Resources refreshKey={refreshKey} />
    </div>
  );
}

export default DashboardPage;