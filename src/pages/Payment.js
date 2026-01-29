import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendOrderConfirmationEmail } from '../services/orderEmailService';
import LoadingButton from '../components/LoadingButton';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const { orderItems, totalAmount, customerData, deliveryAddress } = location.state || {};

  useEffect(() => {
    if (!orderItems) {
      navigate('/checkout');
    }
  }, [orderItems, navigate]);

  const validCoupons = {
    'BOOK10': 10,
    'SAVE20': 20,
    'FIRST15': 15,
    'WELCOME5': 5
  };

  const handleApplyDiscount = () => {
    const code = discountCode.toUpperCase();
    if (validCoupons[code]) {
      const discountPercent = validCoupons[code];
      const discountAmount = Math.floor(totalAmount * (discountPercent / 100));
      setAppliedDiscount(discountAmount);
      setDiscountError('');
      setShowDiscountInput(false);
    } else {
      setDiscountError('Invalid coupon code');
      setAppliedDiscount(0);
    }
  };

  const finalTotal = totalAmount - appliedDiscount;

  const playSuccessSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {});
  };

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    const newOrderId = 'BK' + Date.now();
    setOrderId(newOrderId);

    const orderDate = new Date();
    const deliveryDate = new Date(orderDate.getTime() + (3 * 24 * 60 * 60 * 1000));

    const orders = orderItems.map(item => ({
      id: Date.now() + Math.random(),
      orderId: newOrderId,
      userEmail: customerData.email,
      title: item.title,
      author: item.author,
      price: item.price,
      image: item.images ? item.images[0] : item.image,
      quantity: item.quantity || 1,
      orderDate: orderDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      status: 'confirmed',
      paymentMethod: 'Cash on Delivery',
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress,
      canEdit: true,
      canCancel: true
    }));

    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    localStorage.setItem('userOrders', JSON.stringify([...existingOrders, ...orders]));

    // Send email
    const itemsList = orderItems.map(item => 
      `${item.title} by ${item.author} - Qty: ${item.quantity} - ₹${item.price}`
    ).join('\n');

    const emailData = {
      customerEmail: customerData.email,
      customerName: customerData.name,
      orderId: newOrderId,
      orderDate: orderDate.toLocaleDateString('en-IN'),
      deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
      totalAmount: totalAmount,
      itemsList: itemsList,
      deliveryAddress: deliveryAddress,
      phoneNumber: customerData.phone,
      paymentMethod: 'Cash on Delivery'
    };

    await sendOrderConfirmationEmail(emailData);

    // Simulate processing time
    setTimeout(() => {
      setIsConfirming(false);
      playSuccessSound();
      setShowConfirmation(true);
    }, 2000);
  };

  const handleSeeOrderDetails = () => {
    navigate('/orders');
  };

  if (!orderItems) return null;

  return (
    <div className="payment-page">
      <div className="payment-header">
        <div className="payment-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            Back
          </button>
          <div className="nav-breadcrumb">
            <span>SHOPPING CART</span>
            <span className="nav-arrow">></span>
            <span>CHECKOUT</span>
            <span className="nav-arrow">></span>
            <span className="active">CONFIRMATION</span>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <div className="payment-left">
          {/* Shipping Address */}
          <div className="payment-section">
            <div className="section-header">
              <h3>Shipping Address</h3>
              <span className="pin-code">401301</span>
            </div>
            <div className="address-details">
              <p><strong>{customerData?.name}</strong></p>
              <p>{deliveryAddress}</p>
              <p><strong>Email:</strong> {customerData?.email}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-section active">
            <div className="section-header">
              <span className="section-icon">💳</span>
              <h3>Payment Method</h3>
              <button className="add-payment-btn">Add new payment</button>
            </div>
            
            <div className="payment-methods-list">
              <div className="saved-method">
                <h4>Your saved method</h4>
                <div className="method-item disabled">
                  <input type="radio" disabled />
                  <div className="method-info">
                    <span>PhonePe / Wallet</span>
                  </div>
                </div>
              </div>

              <div className="method-item disabled">
                <input type="radio" disabled />
                <div className="method-info">
                  <span>Credit / Debit / ATM Card</span>
                </div>
              </div>

              <div className="method-item disabled">
                <input type="radio" disabled />
                <div className="method-info">
                  <span>Net Banking</span>
                </div>
              </div>

              <div className="method-item disabled">
                <input type="radio" disabled />
                <div className="method-info">
                  <span>EMI (Easy Installments)</span>
                </div>
              </div>

              <div className={`method-item ${selectedPayment === 'cod' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  checked={selectedPayment === 'cod'}
                  onChange={() => setSelectedPayment('cod')}
                />
                <div className="method-info">
                  <span>Cash on Delivery</span>
                </div>
              </div>

              <div className="method-item disabled">
                <input type="radio" disabled />
                <div className="method-info">
                  <span>Gift Cards | Vouchers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-right">
          <div className="order-summary">
            <div className="summary-header">
              <span className="summary-icon">🛍️</span>
              <h3>Your Order Summary</h3>
            </div>
            
            <div className="summary-items">
              {orderItems?.map((item, index) => (
                <div key={index} className="summary-item">
                  <img src={item.images?.[0] || item.image} alt={item.title} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>by {item.author}</p>
                    <div className="item-pricing">
                      <span className="quantity">Qty: {item.quantity}</span>
                      <div className="price-info">
                        <span className="discount">42% off</span>
                        <span className="price">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>SUBTOTAL</span>
                <span>₹{totalAmount}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="price-row discount-applied">
                  <span>DISCOUNT</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="price-row">
                <span>SHIPPING CHARGES</span>
                <span className="free">FREE</span>
              </div>
              <div className="price-row total">
                <span>TOTAL</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <div className="discount-section">
              {!showDiscountInput ? (
                <a href="#" onClick={(e) => { e.preventDefault(); setShowDiscountInput(true); }}>
                  Have a discount code?
                </a>
              ) : (
                <div className="discount-input-section">
                  <div className="discount-input-row">
                    <input 
                      type="text" 
                      placeholder="Enter coupon code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className={`discount-input ${discountError ? 'error' : ''}`}
                    />
                    <button className="apply-btn" onClick={handleApplyDiscount}>
                      APPLY
                    </button>
                  </div>
                  {discountError && (
                    <div className="discount-error">{discountError}</div>
                  )}
                  <div className="valid-coupons">
                    <small>Valid codes: BOOK10, SAVE20, FIRST15, WELCOME5</small>
                  </div>
                </div>
              )}
            </div>

            <div className="payment-security">
              <p>Online payments powered by 🔒 PhonePe</p>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-footer">
        <div className="security-info">
          <span className="security-icon">🔒</span>
          <span>Safe and Secure Payments. Easy returns.</span>
          <span>100% Authentic products.</span>
        </div>
        <LoadingButton 
          className="proceed-btn"
          onClick={handleConfirmOrder}
          loading={isConfirming}
        >
          {isConfirming ? 'PROCESSING...' : 'PROCEED TO PAY'}
        </LoadingButton>
      </div>

      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <div className="success-icon">✅</div>
            <h2>Order Confirmed!</h2>
            <p>Your order #{orderId} has been placed successfully.</p>
            <p>You will receive a confirmation email shortly.</p>
            <LoadingButton 
              className="see-details-btn"
              onClick={handleSeeOrderDetails}
            >
              See Order Details
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;