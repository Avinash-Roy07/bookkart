import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookStore.css';

const BookStore = ({ user, addToCart, onLoginClick }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [buyNowLoading, setBuyNowLoading] = useState(null);

  const books = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 24.99,
      category: "fiction",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      description: "A magical novel about the choices that go into a life well lived."
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      price: 27.99,
      category: "self-help",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      description: "An easy & proven way to build good habits & break bad ones."
    },
    {
      id: 3,
      title: "The Seven Moons",
      author: "Rebecca Ross",
      price: 22.99,
      category: "fantasy",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "A captivating fantasy tale of magic and adventure."
    },
    {
      id: 4,
      title: "Educated",
      author: "Tara Westover",
      price: 26.99,
      category: "memoir",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      description: "A powerful memoir about education and transformation."
    },
    {
      id: 5,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 23.99,
      category: "thriller",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      description: "A psychological thriller that will keep you guessing."
    },
    {
      id: 6,
      title: "Becoming",
      author: "Michelle Obama",
      price: 29.99,
      category: "memoir",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop",
      description: "An intimate memoir by the former First Lady."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'self-help', name: 'Self Help' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'memoir', name: 'Memoir' },
    { id: 'thriller', name: 'Thriller' }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (book) => {
    if (!user) {
      onLoginClick();
      return;
    }
    addToCart(book);
  };

  const handleBuyNow = async (book) => {
    if (!user) {
      onLoginClick();
      return;
    }
    
    setBuyNowLoading(book.id);
    
    // Simulate loading
    setTimeout(() => {
      setBuyNowLoading(null);
      navigate('/checkout', { state: { buyNowItem: book } });
    }, 1500);
  };

  return (
    <div className="bookstore">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>A Book Can Change Your Life</h1>
            <p>Discover amazing stories and knowledge that will transform your perspective</p>
            <button className="hero-btn">Explore Now</button>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop" alt="Featured Book" />
          </div>
        </div>
      </div>

      {/* Featured Books Section */}
      <div className="featured-section">
        <div className="container">
          <div className="featured-content">
            <div className="featured-card large">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop" alt="The Design of Everyday Things" />
              </div>
              <div className="featured-info">
                <h3>The Design of Everyday Things</h3>
                <p>Don Norman</p>
                <span className="discount">50% OFF</span>
              </div>
            </div>
            
            <div className="featured-card">
              <div className="featured-image">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=150&fit=crop" alt="Book World" />
              </div>
              <div className="featured-info">
                <h4>Book World is Best Choice For Learners</h4>
                <button className="featured-btn">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Collections */}
      <div className="collections-section">
        <div className="container">
          <h2 className="section-title">Popular Collections</h2>
          
          <div className="collection-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="collection-grid">
            {filteredBooks.slice(0, 4).map(book => (
              <div key={book.id} className="collection-card">
                <div className="collection-image">
                  <img src={book.image} alt={book.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="books-section">
        <div className="container">
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-image">
                  <img src={book.image} alt={book.title} />
                  <div className="book-overlay">
                    <button 
                      className="quick-view-btn"
                      onClick={() => handleAddToCart(book)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-description">{book.description}</p>
                  
                  <div className="book-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{book.rating}</span>
                  </div>
                  
                  <div className="book-footer">
                    <span className="book-price">₹{Math.round(book.price * 75)}</span>
                    <div className="book-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(book)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className={`buy-now-btn ${buyNowLoading === book.id ? 'loading' : ''}`}
                        onClick={() => handleBuyNow(book)}
                        disabled={buyNowLoading === book.id}
                      >
                        {buyNowLoading === book.id ? (
                          <span className="spinner"></span>
                        ) : (
                          'Buy Now'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="no-results">
              <h3>No books found</h3>
              <p>Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookStore;