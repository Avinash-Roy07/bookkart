import React from 'react';
import '../styles/ProfilePages.css';

const Orders = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Orders</h1>
        <div className="orders-list">
          <p>No orders found.</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;