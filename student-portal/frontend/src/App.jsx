import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import './App.css'; // This will now be our main layout file

function App() {
  // --- All your state lives in App.jsx ---
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // --- Check for login on app load ---
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('userRole');
    if (storedToken) {
      setToken(storedToken);
      setUserRole(storedRole);
    }
  }, []);

  // --- Auth functions ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUserRole(null);
  };
  
  const triggerRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  // --- Update Login.jsx to pass setUserRole ---
  // You must update Login.jsx to also call setUserRole!
  // Find this in Login.jsx: setToken(response.data.token);
  // Add this below it: setUserRole(response.data.user.role);

  return (
    <div className={!token ? "App-layout App-unauthed" : "App-layout"}>
      <Header token={token} handleLogout={handleLogout} />
      
      <main className="main-content">
        <Routes>
          
          {/* --- LOGIN/REGISTER ROUTE --- */}
          <Route 
            path="/login" 
            element={
              !token ? (
                <AuthPage setToken={setToken} /> 
              ) : (
                <Navigate to="/dashboard" /> // If logged in, go to dashboard
              )
            } 
          />
          
          {/* --- DASHBOARD ROUTE (Protected) --- */}
          <Route 
            path="/dashboard" 
            element={
              token ? (
                <DashboardPage 
                  userRole={userRole}
                  refreshKey={refreshKey}
                  triggerRefresh={triggerRefresh}
                />
              ) : (
                <Navigate to="/login" /> // If not logged in, go to login
              )
            } 
          />
          
          {/* --- DEFAULT ROUTE --- */}
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;