import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to BookKart Dashboard</h1>
          <p>Hello, {user.email || 'User'}!</p>
        </div>
        
        <div className="dashboard-content">
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>My Orders</h3>
              <p>Track your recent orders</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Wishlist</h3>
              <p>Your saved books</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Notifications</h3>
              <p>Latest updates</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Settings</h3>
              <p>Manage your account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;