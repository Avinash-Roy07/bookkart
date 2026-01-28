import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = ({ onPlaceOrder }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');

  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      onPlaceOrder();
    }
  };

  const checkPincode = () => {
    if (!pincode) return;
    
    // Simulate pincode check - some pincodes are available, others are not
    const availablePincodes = ['110001', '400001', '560001', '600001', '700001', '500001'];
    const isAvailable = availablePincodes.includes(pincode);
    
    if (isAvailable) {
      setDeliveryStatus('Delivery available in this area');
      setStatusColor('green');
    } else {
      setDeliveryStatus('Sorry, delivery not available in this area');
      setStatusColor('red');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            <p>Add items to it now.</p>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const discount = Math.floor(totalPrice * 0.1);
  const protectFee = Math.floor(totalPrice * 0.02);
  const finalAmount = totalPrice - discount + protectFee;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-layout">
          <div className="cart-items">
            <div className="delivery-address">
              <h3>From Saved Addresses</h3>
              <button className="enter-pincode" onClick={() => setShowPincodeModal(true)}>Enter Delivery Pincode</button>
            </div>
            
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.images[0]} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-author">by {item.author}</p>
                  <div className="item-price">
                    <span className="current-price">₹{item.price}</span>
                    <span className="original-price">₹{item.originalPrice}</span>
                    <span className="discount">{Math.round((1 - item.price/item.originalPrice) * 100)}% Off</span>
                  </div>
                  <p className="protect-fee">+ ₹{Math.floor(item.price * 0.02)} Protect Promise Fee</p>
                  <p className="delivery-date">Delivery by Tue Feb 3</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="save-later">SAVE FOR LATER</button>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>REMOVE</button>
                </div>
              </div>
            ))}
            
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              PLACE ORDER
            </button>
          </div>

          <div className="price-details">
            <h3>PRICE DETAILS</h3>
            <div className="price-row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="price-row">
              <span>Discount</span>
              <span className="discount-amount">-₹{discount.toLocaleString()}</span>
            </div>
            <div className="price-row">
              <span>Protect Promise Fee</span>
              <span>₹{protectFee}</span>
            </div>
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{finalAmount.toLocaleString()}</span>
            </div>
            <div className="savings">
              You will save ₹{discount.toLocaleString()} on this order
            </div>
            <div className="security-info">
              <span className="check-icon">✓</span>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </div>
          </div>
        </div>
      </div>
      
      {/* Pincode Modal */}
      {showPincodeModal && (
        <div className="pincode-modal-overlay">
          <div className="pincode-modal">
            <button className="close-btn" onClick={() => setShowPincodeModal(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3>Select Delivery Address</h3>
            
            <div className="login-section">
              <div className="login-icon">📋</div>
              <span>Log in to view saved addresses</span>
            </div>
            
            <div className="pincode-section">
              <h4>Use pincode to check delivery info</h4>
              <div className="pincode-input-group">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="pincode-input"
                  maxLength="6"
                />
                <button className="submit-btn" onClick={checkPincode}>Submit</button>
              </div>
              
              {deliveryStatus && (
                <div className="delivery-status" style={{ color: statusColor }}>
                  {deliveryStatus}
                </div>
              )}
              
              <div className="current-location">
                <span className="location-icon">📍</span>
                <span className="location-text">Use my current location</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;