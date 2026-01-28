import React from 'react';
import '../styles/ProfilePages.css';

const Wishlist = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>My Wishlist</h1>
        <div className="wishlist-items">
          <p>No items in wishlist.</p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;