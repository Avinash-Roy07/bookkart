import React from 'react';
import { useCart } from '../context/CartContext';

const AddedToCartPopup = () => {
  const { showAddedToCart } = useCart();

  if (!showAddedToCart) return null;

  return (
    <div className="added-to-cart-popup">
      <span className="check-icon">✓</span>
      <span>Item added to cart</span>
    </div>
  );
};

export default AddedToCartPopup;