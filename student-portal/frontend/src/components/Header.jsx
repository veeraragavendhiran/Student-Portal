import React from 'react';
import './Header.css'; // We will create this file next

// This component receives the token and logout function as props
function Header({ token, handleLogout }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          Student Portal
        </div>
        <nav>
          {token && (
            // Only show logout button if logged in
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;