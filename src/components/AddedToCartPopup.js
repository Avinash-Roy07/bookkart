import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/AddedToCartPopup.css';

const AddedToCartPopup = () => {
  const { showAddedToCart } = useCart();

  if (!showAddedToCart) return null;

  return (
    <div className="added-to-cart-toast">
      <span className="check-icon">✓</span>
      <span>Item added to cart</span>
    </div>
  );
};

export default AddedToCartPopup;