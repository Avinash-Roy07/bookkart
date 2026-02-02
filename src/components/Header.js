import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = ({ user, onLoginClick, onLogout }) => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Books database for search
  const allBooks = {
    1: { id: 1, title: 'The Power of Now', author: 'Eckhart Tolle', price: 249 },
    2: { id: 2, title: 'Atomic Habits', author: 'James Clear', price: 299 },
    3: { id: 3, title: 'Think and Grow Rich', author: 'Napoleon Hill', price: 199 },
    4: { id: 4, title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', price: 349 },
    5: { id: 5, title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', price: 249 },
    301: { id: 301, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 199 },
    302: { id: 302, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 299 },
    303: { id: 303, title: '1984', author: 'George Orwell', price: 179 },
    304: { id: 304, title: 'Pride and Prejudice', author: 'Jane Austen', price: 149 },
    501: { id: 501, title: 'Atomic Habits', author: 'James Clear', price: 299 },
    601: { id: 601, title: 'The Alchemist', author: 'Paulo Coelho', price: 199 },
    602: { id: 602, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', price: 299 },
    701: { id: 701, title: 'The Midnight Library', author: 'Matt Haig', price: 199 },
    801: { id: 801, title: 'Sapiens', author: 'Yuval Noah Harari', price: 299 },
    802: { id: 802, title: 'Educated', author: 'Tara Westover', price: 249 },
    803: { id: 803, title: 'Becoming', author: 'Michelle Obama', price: 349 }
  };

  // Get user display name from localStorage
  const getUserDisplayName = () => {
    if (!user) return 'User';
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const currentUser = registeredUsers.find(u => u.email === user);
    if (currentUser && currentUser.firstName) {
      return `${currentUser.firstName} ${currentUser.lastName || ''}`.trim();
    }
    return (user.email || user)?.split('@')[0] || 'User';
  };

  // Search functionality
  const getSearchSuggestions = () => {
    if (!searchTerm.trim()) return [];
    
    const books = Object.values(allBooks);
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchDropdown(value.trim().length > 0);
  };

  const handleBookSelect = (bookId) => {
    navigate(`/book/${bookId}`);
    setSearchTerm('');
    setShowSearchDropdown(false);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log('Header user:', user); // Debug log

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setShowProfileDropdown(false);
  };

  const handleNavigation = (path) => {
    setShowProfileDropdown(false);
    navigate(path);
    // Scroll to top when page opens
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const confirmLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-content">
            <span className="logo-name">BookKart</span>
            <span className="logo-tagline">
              <span className="explore">Explore</span> <span className="books">Books</span>
            </span>
          </div>
        </Link>

        <div className="header-actions">
          <div className="action-item">
            {user ? (
              <div className="user-menu" ref={profileRef}>
                <button 
                  className="user-btn"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{getUserDisplayName()}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {showProfileDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => handleNavigation('/profile')}>Profile</Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => handleNavigation('/orders')}>Orders</Link>
                    <Link to="/wishlist" className="dropdown-item" onClick={() => handleNavigation('/wishlist')}>Wishlist</Link>
                    <Link to="/notifications" className="dropdown-item" onClick={() => handleNavigation('/notifications')}>Notifications</Link>
                    <div className="dropdown-item logout-item" onClick={handleLogoutClick}>Logout</div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onLoginClick} className="login-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Login</span>
              </button>
            )}
          </div>

          <Link to="/cart" className="action-item cart-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
      
      {/* Search Section Below Header */}
      <div className="search-section-below" style={{marginTop: '-50px'}}>
        <div className="search-bar" ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search for Books, Authors and More"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.trim() && setShowSearchDropdown(true)}
          />
          <button className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Search Dropdown */}
          {showSearchDropdown && (
            <div className="search-dropdown">
              {getSearchSuggestions().length > 0 ? (
                getSearchSuggestions().map(book => (
                  <div 
                    key={book.id} 
                    className="search-suggestion"
                    onClick={() => handleBookSelect(book.id)}
                  >
                    <div className="suggestion-content">
                      <div className="suggestion-title">{book.title}</div>
                      <div className="suggestion-author">by {book.author}</div>
                      <div className="suggestion-price">₹{book.price}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-text">No books found for "{searchTerm}"</div>
                  <div className="not-available">Not available</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showLogoutConfirm && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-buttons">
              <button 
                className="cancel-btn" 
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn" 
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;