import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoadingButton';
import '../styles/Orders.css';

const Orders = () => {
  const [orderFilters, setOrderFilters] = useState({
    status: [],
    time: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing dummy data and load only real orders
    const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const currentUser = localStorage.getItem('currentUser');
    
    // Filter out dummy orders and keep only orders with orderId (real orders)
    const realOrders = allOrders.filter(order => 
      order.userEmail === currentUser && 
      order.orderId && 
      order.orderId.startsWith('BK')
    );
    
    // Update localStorage with only real orders
    const allRealOrders = allOrders.filter(order => 
      order.orderId && order.orderId.startsWith('BK')
    );
    localStorage.setItem('userOrders', JSON.stringify(allRealOrders));
    
    setOrders(realOrders);
    
    const interval = setInterval(() => {
      const updatedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]')
        .filter(order => 
          order.userEmail === currentUser && 
          order.orderId && 
          order.orderId.startsWith('BK')
        );
      setOrders(updatedOrders);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get filtered orders
  const getFilteredOrders = () => {
    let filteredOrders = [...orders];
    
    // Apply search filter
    if (searchQuery) {
      filteredOrders = filteredOrders.filter(order => 
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.orderId && order.orderId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply status filters
    if (orderFilters.status.length > 0) {
      filteredOrders = filteredOrders.filter(order => 
        orderFilters.status.includes(order.status)
      );
    }
    
    // Apply time filters
    if (orderFilters.time.length > 0) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        return orderFilters.time.some(timeFilter => {
          switch(timeFilter) {
            case 'last_30_days':
              return orderDate >= thirtyDaysAgo;
            case '2024':
              return orderDate.getFullYear() === 2024;
            case '2023':
              return orderDate.getFullYear() === 2023;
            case 'older':
              return orderDate.getFullYear() < 2023;
            default:
              return true;
          }
        });
      });
    }
    
    return filteredOrders;
  };

  const handleCancelOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    const { currentStatus } = getTrackingSteps(order);
    
    if (currentStatus === 'shipped' || currentStatus === 'out_for_delivery' || currentStatus === 'delivered') {
      alert('Order shipped. You cannot cancel this order.');
      return;
    }
    
    setCancelOrderId(orderId);
    setShowCancelModal(true);
  };

  const confirmCancelOrder = () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    
    setLoadingStates(prev => ({ ...prev, [`cancel_${cancelOrderId}`]: true }));
    
    setTimeout(() => {
      const updatedOrders = orders.map(order => 
        order.id === cancelOrderId ? { 
          ...order, 
          status: 'cancelled', 
          cancelReason: cancelReason,
          canEdit: false, 
          canCancel: false 
        } : order
      );
      setOrders(updatedOrders);
      
      const allOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const newAllOrders = allOrders.map(order => 
        order.id === cancelOrderId ? { 
          ...order, 
          status: 'cancelled', 
          cancelReason: cancelReason,
          canEdit: false, 
          canCancel: false 
        } : order
      );
      localStorage.setItem('userOrders', JSON.stringify(newAllOrders));
      
      setLoadingStates(prev => ({ ...prev, [`cancel_${cancelOrderId}`]: false }));
      setShowCancelModal(false);
      setCancelOrderId(null);
      setCancelReason('');
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#2874f0';
      case 'processing': return '#ff9800';
      case 'shipped': return '#9c27b0';
      case 'delivered': return '#4caf50';
      case 'cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const getTrackingSteps = (order) => {
    if (order.status === 'cancelled') {
      return {
        steps: [{
          key: 'cancelled',
          label: `Order Cancelled - ${order.cancelReason || 'No reason provided'}`,
          date: new Date(order.orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          completed: true,
          cancelled: true
        }],
        currentStatus: 'cancelled'
      };
    }
    
    const orderDate = new Date(order.orderDate);
    const shippedDate = new Date(orderDate.getTime() + (1 * 24 * 60 * 60 * 1000));
    const outForDeliveryDate = new Date(orderDate.getTime() + (2 * 24 * 60 * 60 * 1000));
    const deliveryDate = new Date(orderDate.getTime() + (3 * 24 * 60 * 60 * 1000));
    
    const now = new Date();
    const daysPassed = Math.floor((now - orderDate) / (24 * 60 * 60 * 1000));
    
    let currentStatus = 'confirmed';
    if (daysPassed >= 3) currentStatus = 'delivered';
    else if (daysPassed >= 2) currentStatus = 'out_for_delivery';
    else if (daysPassed >= 1) currentStatus = 'shipped';
    
    const steps = [
      {
        key: 'confirmed',
        label: 'Order Confirmed',
        date: orderDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        completed: true
      },
      {
        key: 'shipped',
        label: 'Shipped',
        date: shippedDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        completed: daysPassed >= 1
      },
      {
        key: 'out_for_delivery',
        label: 'Out For Delivery',
        date: outForDeliveryDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        completed: daysPassed >= 2,
        current: daysPassed === 2
      },
      {
        key: 'delivered',
        label: 'Delivery',
        date: deliveryDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) + ' By 11 PM',
        completed: daysPassed >= 3
      }
    ];
    
    return { steps, currentStatus };
  };
  
  const handleFilterChange = (type, value) => {
    setOrderFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  return (
    <div className="orders-page-standalone">
      <div className="orders-container">
        <div className="orders-filters">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            Back
          </button>
          <h3>Filters</h3>
          
          <div className="filter-group">
            <h4>ORDER STATUS</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('confirmed')}
                  onChange={() => handleFilterChange('status', 'confirmed')}
                />
                <span>Confirmed</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('processing')}
                  onChange={() => handleFilterChange('status', 'processing')}
                />
                <span>Processing</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('shipped')}
                  onChange={() => handleFilterChange('status', 'shipped')}
                />
                <span>Shipped</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('on_the_way')}
                  onChange={() => handleFilterChange('status', 'on_the_way')}
                />
                <span>On the way</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('delivered')}
                  onChange={() => handleFilterChange('status', 'delivered')}
                />
                <span>Delivered</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('cancelled')}
                  onChange={() => handleFilterChange('status', 'cancelled')}
                />
                <span>Cancelled</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.status.includes('returned')}
                  onChange={() => handleFilterChange('status', 'returned')}
                />
                <span>Returned</span>
              </label>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>ORDER TIME</h4>
            <div className="filter-options">
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.time.includes('last_30_days')}
                  onChange={() => handleFilterChange('time', 'last_30_days')}
                />
                <span>Last 30 days</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.time.includes('2024')}
                  onChange={() => handleFilterChange('time', '2024')}
                />
                <span>2024</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.time.includes('2023')}
                  onChange={() => handleFilterChange('time', '2023')}
                />
                <span>2023</span>
              </label>
              <label className="filter-option">
                <input 
                  type="checkbox" 
                  checked={orderFilters.time.includes('older')}
                  onChange={() => handleFilterChange('time', 'older')}
                />
                <span>Older</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="orders-content">
          <div className="orders-search">
            <input 
              type="text" 
              placeholder="Search your orders here" 
              className="orders-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="orders-search-btn">
              🔍 Search Orders
            </button>
          </div>
          
          <div className="orders-list">
            {getFilteredOrders().map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">Order #{order.orderId}</div>
                  <div className="order-date">{new Date(order.orderDate).toLocaleDateString('en-IN')}</div>
                </div>
                
                <div className="order-content">
                  <div className="order-image">
                    <img src={order.image} alt={order.title} />
                  </div>
                  <div className="order-info">
                    <h4 className="order-title">{order.title}</h4>
                    <p className="order-author">by {order.author}</p>
                    <p className="order-price">₹{order.price} × {order.quantity}</p>
                    <p className="payment-method">Payment: {order.paymentMethod}</p>
                  </div>
                  
                  <div className="order-tracking">
                    <div className="tracking-timeline">
                      {(() => {
                        const { steps, currentStatus } = getTrackingSteps(order);
                        return steps.map((step, index) => (
                          <div key={step.key} className={`timeline-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                            <div className="step-indicator">
                              <div className="step-circle">
                                {step.completed ? '✓' : ''}
                              </div>
                              {index < steps.length - 1 && <div className="step-line"></div>}
                            </div>
                            <div className="step-content">
                              <div className="step-title">{step.label}, {step.date}</div>
                            </div>
                          </div>
                        ));
                      })()
                      }
                    </div>
                  </div>
                </div>
                
                <div className="order-actions">
                  {(() => {
                    const { currentStatus } = getTrackingSteps(order);
                    return (
                      <>
                        {currentStatus === 'confirmed' && (
                          <LoadingButton 
                            className="cancel-btn" 
                            onClick={() => handleCancelOrder(order.id)}
                            loading={loadingStates[`cancel_${order.id}`]}
                          >
                            {loadingStates[`cancel_${order.id}`] ? 'Cancelling...' : 'Cancel Order'}
                          </LoadingButton>
                        )}
                        {currentStatus === 'delivered' && (
                          <LoadingButton className="rate-review-btn">
                            ⭐ Rate & Review
                          </LoadingButton>
                        )}
                      </>
                    );
                  })()
                  }
                </div>
              </div>
            ))}
            
            {getFilteredOrders().length === 0 && (
              <div className="no-orders">
                <p>No orders found. Start shopping to see your orders here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showCancelModal && (
        <div className="cancel-modal">
          <div className="modal-content">
            <h3>Cancel Order</h3>
            <p>Please provide a reason for cancelling this order:</p>
            <div className="cancel-reasons">
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="cancelReason" 
                  value="Changed my mind"
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                <span>Changed my mind</span>
              </label>
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="cancelReason" 
                  value="Found better price elsewhere"
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                <span>Found better price elsewhere</span>
              </label>
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="cancelReason" 
                  value="Ordered by mistake"
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                <span>Ordered by mistake</span>
              </label>
              <label className="reason-option">
                <input 
                  type="radio" 
                  name="cancelReason" 
                  value="Other"
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                <span>Other</span>
              </label>
            </div>
            <div className="modal-actions">
              <LoadingButton 
                onClick={confirmCancelOrder}
                loading={loadingStates[`cancel_${cancelOrderId}`]}
                className="confirm-cancel-btn"
              >
                {loadingStates[`cancel_${cancelOrderId}`] ? 'Cancelling...' : 'Confirm Cancel'}
              </LoadingButton>
              <button onClick={() => { setShowCancelModal(false); setCancelReason(''); }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;