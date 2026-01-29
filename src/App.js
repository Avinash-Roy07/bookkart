import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookStore from './pages/BookStore';
import BookDetails from './pages/BookDetails';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import AuthModal from './components/AuthModal';
import AddedToCartPopup from './components/AddedToCartPopup';
import Footer from './components/Footer';
import './styles/App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (userData) => {
    const email = userData.email || userData;
    setUser(email);
    localStorage.setItem('currentUser', email);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const handlePlaceOrder = () => {
    if (!user) {
      setShowAuthModal(true);
    }
  };

  return (
    <div className="App">
      <Header 
        user={user ? { email: user } : null}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/books" 
          element={
            <BookStore 
              user={user}
              addToCart={addToCart}
              onLoginClick={() => setShowAuthModal(true)}
            />
          } 
        />
        <Route path="/books/:category" element={<CategoryPage />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/cart" element={<Cart onPlaceOrder={handlePlaceOrder} />} />
        <Route 
          path="/checkout" 
          element={user ? <Checkout /> : <Navigate to="/" />} 
        />
        <Route 
          path="/payment" 
          element={user ? <Payment /> : <Navigate to="/" />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Profile /> : <Navigate to="/" />} 
        />
        <Route 
          path="/orders" 
          element={user ? <Orders /> : <Navigate to="/" />} 
        />
        <Route 
          path="/wishlist" 
          element={user ? <Wishlist /> : <Navigate to="/" />} 
        />
        <Route 
          path="/notifications" 
          element={user ? <Notifications /> : <Navigate to="/" />} 
        />
        <Route 
          path="/settings" 
          element={user ? <Settings /> : <Navigate to="/" />} 
        />
      </Routes>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      
      <AddedToCartPopup />

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;