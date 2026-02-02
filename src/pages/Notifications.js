import React from 'react';
import '../styles/ProfilePages.css';

const Notifications = () => {
  return (
    <div className="notifications-page">
      <div className="notifications-container">
        <div className="notifications-empty">
          <div className="empty-illustration">
            <div className="laptop-container">
              <div className="laptop">
                <div className="laptop-screen">
                  <div className="checkmark">✓</div>
                </div>
              </div>
              <div className="decorative-shapes">
                <div className="balloon red"></div>
                <div className="triangle red-triangle"></div>
                <div className="diamond blue"></div>
                <div className="triangle yellow-triangle"></div>
                <div className="circle blue-circle"></div>
                <div className="triangle orange-triangle"></div>
                <div className="diamond yellow"></div>
                <div className="gift-box">
                  <div className="gift-top"></div>
                  <div className="gift-bottom"></div>
                  <div className="gift-ribbon"></div>
                </div>
                <div className="shapes-bottom">
                  <div className="triangle red-bottom"></div>
                  <div className="diamond blue-bottom"></div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="empty-title">All caught up!</h2>
          <p className="empty-message">There are no new notifications for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;