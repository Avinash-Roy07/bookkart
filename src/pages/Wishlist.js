import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import '../styles/ProfilePages.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h1 className="wishlist-title">My Wishlist ({wishlistItems.length})</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="no-wishlist-items">
            <p>No items in wishlist.</p>
          </div>
        ) : (
          <div className="wishlist-list">
            {wishlistItems.map(book => (
              <div key={book.id} className="wishlist-card" onClick={() => navigate(`/book/${book.id}`)}>
                <div className="wishlist-item-image">
                  <img src={book.images[0]} alt={book.title} />
                </div>
                <div className="wishlist-item-info">
                  <h3 className="wishlist-item-title">{book.title}</h3>
                  <div className="wishlist-assured">
                    <span className="assured-badge">🛡️ Assured</span>
                  </div>
                  <div className="wishlist-item-pricing">
                    <span className="wishlist-current-price">₹{book.price.toLocaleString()}</span>
                    <span className="wishlist-original-price">₹{book.originalPrice.toLocaleString()}</span>
                    <span className="wishlist-discount">{Math.round((1 - book.price/book.originalPrice) * 100)}% off</span>
                  </div>
                </div>
                <div className="wishlist-item-actions">
                  <button 
                    className="wishlist-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(book.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;