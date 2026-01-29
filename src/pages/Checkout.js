import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendOrderConfirmationEmail } from '../services/orderEmailService';
import LoadingButton from '../components/LoadingButton';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    alternatePhone: '',
    addressType: 'home'
  });
  const [availableCities, setAvailableCities] = useState([]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isDelivering, setIsDelivering] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [isContinuing, setIsContinuing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const currentUser = localStorage.getItem('currentUser');
  const userData = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    .find(user => user.email === currentUser) || {};

  // Pincode to city/state mapping
  const pincodeData = {
    '110001': { state: 'Delhi', cities: ['New Delhi', 'Connaught Place', 'Karol Bagh'] },
    '400001': { state: 'Maharashtra', cities: ['Mumbai', 'Fort', 'Colaba'] },
    '560001': { state: 'Karnataka', cities: ['Bangalore', 'Chickpet', 'Shivaji Nagar'] },
    '600001': { state: 'Tamil Nadu', cities: ['Chennai', 'George Town', 'Parrys'] },
    '700001': { state: 'West Bengal', cities: ['Kolkata', 'BBD Bagh', 'Dalhousie'] },
    '500001': { state: 'Telangana', cities: ['Hyderabad', 'Afzal Gunj', 'Sultan Bazar'] },
    '844102': { state: 'Bihar', cities: ['Hajipur', 'Madarpur', 'Vaishali'] },
    '302001': { state: 'Rajasthan', cities: ['Jaipur', 'Pink City', 'Johari Bazar'] },
    '226001': { state: 'Uttar Pradesh', cities: ['Lucknow', 'Hazratganj', 'Aminabad'] },
    '380001': { state: 'Gujarat', cities: ['Ahmedabad', 'Lal Darwaja', 'Kalupur'] },
    '411001': { state: 'Maharashtra', cities: ['Pune', 'Kasba Peth', 'Shivaji Nagar'] },
    '201001': { state: 'Uttar Pradesh', cities: ['Ghaziabad', 'Raj Nagar', 'Kavi Nagar'] },
    '122001': { state: 'Haryana', cities: ['Gurgaon', 'Sector 14', 'Old Gurgaon'] },
    '160001': { state: 'Punjab', cities: ['Chandigarh', 'Sector 17', 'Sector 22'] },
    '751001': { state: 'Odisha', cities: ['Bhubaneswar', 'Old Town', 'Kharavel Nagar'] },
    '682001': { state: 'Kerala', cities: ['Kochi', 'Ernakulam', 'Fort Kochi'] },
    '800001': { state: 'Bihar', cities: ['Patna', 'Patna City', 'Bankipur'] },
    '834001': { state: 'Jharkhand', cities: ['Ranchi', 'Main Road', 'Lalpur'] },
    '492001': { state: 'Chhattisgarh', cities: ['Raipur', 'Civil Lines', 'Shankar Nagar'] }
  };

  const handlePincodeChange = (pincode) => {
    setNewAddress({...newAddress, pincode});
    
    if (pincode.length === 6 && pincodeData[pincode]) {
      const data = pincodeData[pincode];
      setNewAddress(prev => ({
        ...prev,
        pincode,
        state: data.state,
        city: ''
      }));
      setAvailableCities(data.cities);
      setShowCityDropdown(true);
    } else {
      setAvailableCities([]);
      setShowCityDropdown(false);
    }
  };

  const handleCitySelect = (city) => {
    setNewAddress({...newAddress, city});
    setShowCityDropdown(false);
  };

  const savedAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]')
    .filter(addr => addr.userEmail === currentUser);

  // Check if coming from buy now (single item) or cart (multiple items)
  const buyNowItem = location.state?.buyNowItem;
  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;
  
  const totalPrice = buyNowItem ? buyNowItem.price : getTotalPrice();
  const protectFee = Math.floor(totalPrice * 0.02);
  const discount = Math.floor(totalPrice * 0.12);
  const finalAmount = totalPrice + protectFee - discount;

  const handleAddAddress = () => {
    setIsAddingAddress(true);
    
    const errors = {};
    
    // Check required fields
    if (!newAddress.name.trim()) errors.name = true;
    if (!newAddress.mobile.trim()) errors.mobile = true;
    if (!newAddress.pincode.trim()) errors.pincode = true;
    if (!newAddress.address.trim()) errors.address = true;
    if (!newAddress.city.trim()) errors.city = true;
    if (!newAddress.state.trim()) errors.state = true;
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setIsAddingAddress(false);
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }
    
    setTimeout(() => {
      const addressToAdd = {
        ...newAddress,
        userEmail: currentUser,
        id: Date.now()
      };
      
      const existingAddresses = JSON.parse(localStorage.getItem('userAddresses') || '[]');
      localStorage.setItem('userAddresses', JSON.stringify([...existingAddresses, addressToAdd]));
      
      setShowAddAddress(false);
      setNewAddress({
        name: '',
        mobile: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternatePhone: '',
        addressType: 'home'
      });
      setFormErrors({});
      setIsAddingAddress(false);
      window.location.reload();
    }, 1500);
  };

  const handleDeliverHere = () => {
    setIsDelivering(true);
    
    // Initialize order items with quantities
    const initialItems = itemsToCheckout.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setOrderItems(initialItems);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsDelivering(false);
      setShowOrderSummary(true);
    }, 2000);
  };

  const updateQuantity = (itemIndex, newQuantity) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      const updatedItems = orderItems.filter((_, index) => index !== itemIndex);
      setOrderItems(updatedItems);
    } else {
      const updatedItems = orderItems.map((item, index) => 
        index === itemIndex ? { ...item, quantity: newQuantity } : item
      );
      setOrderItems(updatedItems);
    }
  };

  const removeItem = (itemIndex) => {
    const updatedItems = orderItems.filter((_, index) => index !== itemIndex);
    setOrderItems(updatedItems);
  };

  const handleContinueToPayment = () => {
    setIsContinuing(true);
    
    setTimeout(() => {
      const selectedAddressData = savedAddresses[selectedAddress];
      const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      const paymentData = {
        orderItems: orderItems,
        totalAmount: totalAmount,
        customerData: {
          email: currentUser,
          name: userData.firstName + ' ' + userData.lastName,
          phone: userData.mobile || '7369896772'
        },
        deliveryAddress: selectedAddressData ? 
          `${selectedAddressData.address}, ${selectedAddressData.city}, ${selectedAddressData.state} - ${selectedAddressData.pincode}` : 
          'Address not selected'
      };
      
      navigate('/payment', { state: paymentData });
    }, 1000);
  };

  const handlePlaceOrder = async () => {
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate.getTime() + (3 * 24 * 60 * 60 * 1000));
    const orderId = 'BK' + Date.now();
    
    const orders = orderItems.map(item => ({
      id: Date.now() + Math.random(),
      userEmail: currentUser,
      title: item.title,
      author: item.author,
      price: item.price,
      image: item.images ? item.images[0] : item.image,
      quantity: item.quantity || 1,
      orderDate: orderDate.toISOString(),
      deliveredDate: deliveryDate.toLocaleDateString('en-IN', { 
        month: 'short', 
        day: 'numeric' 
      }),
      status: 'delivered'
    }));
    
    const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    localStorage.setItem('userOrders', JSON.stringify([...existingOrders, ...orders]));
    
    // Prepare email data
    const selectedAddressData = savedAddresses[selectedAddress];
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = orderItems.map(item => 
      `${item.title} by ${item.author} - Qty: ${item.quantity} - ₹${item.price}`
    ).join('\n');
    
    const emailData = {
      customerEmail: currentUser,
      customerName: userData.firstName + ' ' + userData.lastName,
      orderId: orderId,
      orderDate: orderDate.toLocaleDateString('en-IN'),
      deliveryDate: deliveryDate.toLocaleDateString('en-IN'),
      totalAmount: totalAmount,
      itemsList: itemsList,
      deliveryAddress: selectedAddressData ? 
        `${selectedAddressData.address}, ${selectedAddressData.city}, ${selectedAddressData.state} - ${selectedAddressData.pincode}` : 
        'Address not selected',
      phoneNumber: userData.mobile || '7369896772'
    };
    
    // Send confirmation email
    const emailResult = await sendOrderConfirmationEmail(emailData);
    
    if (emailResult.success) {
      alert('Order placed successfully! Confirmation email sent.');
    } else {
      alert('Order placed successfully! (Email sending failed)');
    }
    
    // Only clear cart if items came from cart, not from buy now
    if (!buyNowItem) {
      cartItems.forEach(item => removeFromCart(item.id));
    }
    
    window.location.href = '/profile';
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="checkout-logo">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            Back
          </button>
          <span>BookKart</span>
          <span className="checkout-tagline">Explore Books</span>
        </div>
      </div>

      <div className="checkout-container">
        <div className="checkout-steps">
          {/* Step 1: Login */}
          <div className="checkout-step completed">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-header">
                <span className="step-title">LOGIN</span>
                <span className="step-check">✓</span>
              </div>
              <div className="step-details">
                {userData.firstName} {userData.lastName} +{userData.mobile || '7369896772'}
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Address */}
          <div className="checkout-step active">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-header">
                <span className="step-title">DELIVERY ADDRESS</span>
              </div>
              
              <div className="address-list">
                {savedAddresses.map((address, index) => (
                  <div key={address.id} className="address-item">
                    <input 
                      type="radio" 
                      name="address" 
                      checked={selectedAddress === index}
                      onChange={() => setSelectedAddress(index)}
                    />
                    <div className="address-details">
                      <div className="address-header">
                        <span className="address-name">{address.name}</span>
                        <span className="address-type">HOME</span>
                        <span className="address-phone">{address.mobile}</span>
                        <button className="edit-address">EDIT</button>
                      </div>
                      <div className="address-text">
                        {address.address}, {address.city}, {address.state} - {address.pincode}
                      </div>
                      {selectedAddress === index && (
                        <button 
                          className="deliver-here-btn" 
                          onClick={() => handleDeliverHere()}
                          disabled={isDelivering}
                        >
                          {isDelivering ? (
                            <>
                              <span className="spinner"></span>
                              Delivering...
                            </>
                          ) : (
                            'DELIVER HERE'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                <button className="add-address-btn" onClick={() => setShowAddAddress(!showAddAddress)}>
                  + Add a new address
                </button>
              </div>
              
              {/* Inline Address Form */}
              {showAddAddress && (
                <div className="inline-address-form">
                  <div className="form-header">
                    <h3>ADD A NEW ADDRESS</h3>
                    <button className="close-btn" onClick={() => setShowAddAddress(false)}>×</button>
                  </div>
                  
                  <div className="address-form">
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Name"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                          className={`form-input ${formErrors.name ? 'error' : ''}`}
                          data-field="name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="10-digit mobile number"
                          value={newAddress.mobile}
                          onChange={(e) => setNewAddress({...newAddress, mobile: e.target.value})}
                          className={`form-input ${formErrors.mobile ? 'error' : ''}`}
                          data-field="mobile"
                          maxLength="10"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Pincode"
                          value={newAddress.pincode}
                          onChange={(e) => handlePincodeChange(e.target.value)}
                          className={`form-input ${formErrors.pincode ? 'error' : ''}`}
                          data-field="pincode"
                          maxLength="6"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Locality"
                          value={newAddress.locality}
                          onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                          className="form-input"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group full-width">
                      <textarea
                        placeholder="Address (Area and Street)"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                        className={`form-textarea ${formErrors.address ? 'error' : ''}`}
                        data-field="address"
                        rows="3"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group city-group">
                        <input
                          type="text"
                          placeholder="City/District/Town"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                          className={`form-input ${formErrors.city ? 'error' : ''}`}
                          data-field="city"
                          readOnly={availableCities.length > 0}
                          onClick={() => availableCities.length > 0 && setShowCityDropdown(true)}
                        />
                        {showCityDropdown && availableCities.length > 0 && (
                          <div className="city-dropdown">
                            {availableCities.map(city => (
                              <div 
                                key={city} 
                                className="city-option"
                                onClick={() => handleCitySelect(city)}
                              >
                                {city}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <select
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                          className={`form-select ${formErrors.state ? 'error' : ''}`}
                          data-field="state"
                        >
                          <option value="">--Select State--</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Landmark (Optional)"
                          value={newAddress.landmark}
                          onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Alternate Phone (Optional)"
                          value={newAddress.alternatePhone}
                          onChange={(e) => setNewAddress({...newAddress, alternatePhone: e.target.value})}
                          className="form-input"
                          maxLength="10"
                        />
                      </div>
                    </div>
                    
                    <div className="address-type-section">
                      <h4>Address Type</h4>
                      <div className="address-type-options">
                        <label className="address-type-option">
                          <input
                            type="radio"
                            name="addressType"
                            value="home"
                            checked={newAddress.addressType === 'home'}
                            onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                          />
                          <span>Home (All day delivery)</span>
                        </label>
                        <label className="address-type-option">
                          <input
                            type="radio"
                            name="addressType"
                            value="work"
                            checked={newAddress.addressType === 'work'}
                            onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                          />
                          <span>Work (Delivery between 10 AM - 5 PM)</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-buttons">
                      <LoadingButton 
                        className="save-address-btn" 
                        onClick={handleAddAddress}
                        loading={isAddingAddress}
                      >
                        {isAddingAddress ? 'SAVING...' : 'SAVE'}
                      </LoadingButton>
                      <button className="cancel-btn" onClick={() => setShowAddAddress(false)}>
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 3: Order Summary */}
          <div className={`checkout-step ${showOrderSummary ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-header">
                <span className="step-title">ORDER SUMMARY</span>
              </div>
              
              {showOrderSummary && (
                <div className="order-summary-content">
                  {orderItems.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img 
                          src={item.images ? item.images[0] : item.image || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop'} 
                          alt={item.title}
                        />
                      </div>
                      <div className="item-details">
                        <h4 className="item-title">{item.title}</h4>
                        <p className="item-author">by {item.author}</p>
                        
                        <div className="item-pricing">
                          <div className="price-section">
                            <span className="original-price">₹{Math.floor(item.price * 1.2)}</span>
                            <span className="current-price">₹{item.price}</span>
                            <span className="discount">12% Off</span>
                          </div>
                          <div className="protect-fee">+ ₹{Math.floor(item.price * 0.02)} Protect Promise Fee</div>
                        </div>
                        
                        <div className="item-delivery">
                          <span className="delivery-icon">📦</span>
                          Delivery in 2 days, Fri
                        </div>
                        
                        <div className="quantity-controls">
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            {item.quantity === 1 ? '🗑️' : '-'}
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            +
                          </button>
                          <button 
                            className="remove-btn" 
                            onClick={() => removeItem(index)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}}
                  
                  {orderItems.length > 0 && (
                    <>
                      <div className="gst-section">
                        <label className="gst-checkbox">
                          <input type="checkbox" />
                          <span>Use GST Invoice</span>
                        </label>
                      </div>
                      
                      <div className="order-confirmation">
                        <p>Order confirmation email will be sent to <strong>{currentUser}</strong></p>
                        <LoadingButton 
                          className="continue-btn" 
                          onClick={handleContinueToPayment}
                          loading={isContinuing}
                        >
                          {isContinuing ? 'Processing...' : 'CONTINUE'}
                        </LoadingButton>
                      </div>
                    </>
                  )}
                  
                  {orderItems.length === 0 && (
                    <div className="empty-cart">
                      <p>No items in your order</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="price-details-checkout">
          <h3>Price Details</h3>
          <div className="price-row">
            <span>Price ({orderItems.length > 0 ? orderItems.reduce((sum, item) => sum + item.quantity, 0) : itemsToCheckout.length} item{(orderItems.length > 0 ? orderItems.reduce((sum, item) => sum + item.quantity, 0) : itemsToCheckout.length) > 1 ? 's' : ''})</span>
            <span>₹{(orderItems.length > 0 ? orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) : totalPrice).toLocaleString()}</span>
          </div>
          <div className="price-row">
            <span>Discount</span>
            <span className="discount-amount">-₹{Math.floor((orderItems.length > 0 ? orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) : totalPrice) * 0.12).toLocaleString()}</span>
          </div>
          <div className="price-row">
            <span>Protect Promise Fee</span>
            <span>₹{Math.floor((orderItems.length > 0 ? orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) : totalPrice) * 0.02)}</span>
          </div>
          <div className="price-row total">
            <span>Total Payable</span>
            <span>₹{(orderItems.length > 0 ? 
              orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + Math.floor(orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.02) - Math.floor(orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.12) :
              finalAmount
            ).toLocaleString()}</span>
          </div>
          <div className="savings">
            Your Total Savings on this order ₹{Math.floor((orderItems.length > 0 ? orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) : totalPrice) * 0.12).toLocaleString()}
          </div>
          <div className="security-info">
            <span className="check-icon">✓</span>
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </div>
          <div className="terms">
            By continuing with the order, you confirm that you are above 18 years of age, and you agree to the BookKart's{' '}
            <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="address-modal-overlay">
          <div className="address-modal-large">
            <div className="modal-header">
              <h3>ADD A NEW ADDRESS</h3>
              <button className="close-btn" onClick={() => setShowAddAddress(false)}>×</button>
            </div>
            
            <div className="address-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                    className={`form-input ${formErrors.name ? 'error' : ''}`}
                    data-field="name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="10-digit mobile number"
                    value={newAddress.mobile}
                    onChange={(e) => setNewAddress({...newAddress, mobile: e.target.value})}
                    className={`form-input ${formErrors.mobile ? 'error' : ''}`}
                    data-field="mobile"
                    maxLength="10"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={newAddress.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    className={`form-input ${formErrors.pincode ? 'error' : ''}`}
                    data-field="pincode"
                    maxLength="6"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Locality"
                    value={newAddress.locality}
                    onChange={(e) => setNewAddress({...newAddress, locality: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <textarea
                  placeholder="Address (Area and Street)"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                  className={`form-textarea ${formErrors.address ? 'error' : ''}`}
                  data-field="address"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group city-group">
                  <input
                    type="text"
                    placeholder="City/District/Town"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    className={`form-input ${formErrors.city ? 'error' : ''}`}
                    data-field="city"
                    readOnly={availableCities.length > 0}
                    onClick={() => availableCities.length > 0 && setShowCityDropdown(true)}
                  />
                  {showCityDropdown && availableCities.length > 0 && (
                    <div className="city-dropdown">
                      {availableCities.map(city => (
                        <div 
                          key={city} 
                          className="city-option"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <select
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    className={`form-select ${formErrors.state ? 'error' : ''}`}
                    data-field="state"
                  >
                    <option value="">--Select State--</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Landmark (Optional)"
                    value={newAddress.landmark}
                    onChange={(e) => setNewAddress({...newAddress, landmark: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Alternate Phone (Optional)"
                    value={newAddress.alternatePhone}
                    onChange={(e) => setNewAddress({...newAddress, alternatePhone: e.target.value})}
                    className="form-input"
                    maxLength="10"
                  />
                </div>
              </div>
              
              <div className="address-type-section">
                <h4>Address Type</h4>
                <div className="address-type-options">
                  <label className="address-type-option">
                    <input
                      type="radio"
                      name="addressType"
                      value="home"
                      checked={newAddress.addressType === 'home'}
                      onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                    />
                    <span>Home (All day delivery)</span>
                  </label>
                  <label className="address-type-option">
                    <input
                      type="radio"
                      name="addressType"
                      value="work"
                      checked={newAddress.addressType === 'work'}
                      onChange={(e) => setNewAddress({...newAddress, addressType: e.target.value})}
                    />
                    <span>Work (Delivery between 10 AM - 5 PM)</span>
                  </label>
                </div>
              </div>
              
              <div className="modal-buttons">
                <button className="save-address-btn" onClick={handleAddAddress}>
                  SAVE
                </button>
                <button className="cancel-btn" onClick={() => setShowAddAddress(false)}>
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="checkout-footer">
        <div className="footer-links">
          Policies: Returns Policy | Terms of use | Security | Privacy
        </div>
        <div className="footer-copyright">
          © 2007-2026 BookKart.com
        </div>
        <div className="footer-help">
          Need help? Visit the <a href="#">Help Center</a> or <a href="#">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Checkout;