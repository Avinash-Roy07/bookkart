import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('bookKartWishlist');
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        setWishlistItems(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        setWishlistItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bookKartWishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded]);

  const addToWishlist = (book) => {
    if (!book || !book.id) return;
    
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) return prev;
      
      return [...prev, {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        images: book.images,
        rating: book.rating,
        reviews: book.reviews
      }];
    });
  };

  const removeFromWishlist = (bookId) => {
    if (!bookId) return;
    setWishlistItems(prev => prev.filter(item => item.id !== bookId));
  };

  const isInWishlist = (bookId) => {
    if (!bookId || !isLoaded) return false;
    return wishlistItems.some(item => item.id === bookId);
  };

  const toggleWishlist = (book) => {
    if (!book || !book.id) return;
    
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      isLoaded
    }}>
      {children}
    </WishlistContext.Provider>
  );
};