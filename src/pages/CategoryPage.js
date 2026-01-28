import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CategoryPage.css';

const CategoryPage = ({ user, addToCart }) => {
  const { category } = useParams();

  const categoryData = {
    classic: {
      title: 'Classic Literature',
      description: 'Timeless masterpieces that have shaped literature',
      books: [
        { id: 101, title: 'Pride and Prejudice', author: 'Jane Austen', price: 299, originalPrice: 499, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 102, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 249, originalPrice: 399, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.9 },
        { id: 103, title: '1984', author: 'George Orwell', price: 199, originalPrice: 349, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 },
        { id: 104, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 279, originalPrice: 449, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.6 }
      ]
    },
    selfhelp: {
      title: 'Self-Help Books',
      description: 'Transform your life with these powerful reads',
      books: [
        { id: 201, title: 'Atomic Habits', author: 'James Clear', price: 149, originalPrice: 299, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.9 },
        { id: 202, title: 'The 7 Habits', author: 'Stephen Covey', price: 199, originalPrice: 349, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 203, title: 'Think and Grow Rich', author: 'Napoleon Hill', price: 179, originalPrice: 299, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 },
        { id: 204, title: 'The Power of Now', author: 'Eckhart Tolle', price: 229, originalPrice: 399, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.6 }
      ]
    },
    academic: {
      title: 'Academic Books',
      description: 'Comprehensive textbooks and reference materials',
      books: [
        { id: 301, title: 'Introduction to Algorithms', author: 'Thomas Cormen', price: 849, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 302, title: 'Calculus Early Transcendentals', author: 'James Stewart', price: 749, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 },
        { id: 303, title: 'Organic Chemistry', author: 'David Klein', price: 899, originalPrice: 1399, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.6 },
        { id: 304, title: 'Principles of Economics', author: 'Gregory Mankiw', price: 699, originalPrice: 1099, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.5 }
      ]
    },
    fiction: {
      title: 'Fiction Novels',
      description: 'Captivating stories from bestselling authors',
      books: [
        { id: 401, title: 'The Silent Patient', author: 'Alex Michaelides', price: 299, originalPrice: 499, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 402, title: 'Where the Crawdads Sing', author: 'Delia Owens', price: 349, originalPrice: 549, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.9 },
        { id: 403, title: 'The Seven Husbands', author: 'Taylor Jenkins Reid', price: 279, originalPrice: 449, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 },
        { id: 404, title: 'Educated', author: 'Tara Westover', price: 329, originalPrice: 529, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 }
      ]
    },
    bestseller: {
      title: 'Bestseller Books',
      description: 'Top-rated books loved by millions of readers',
      books: [
        { id: 501, title: 'It Ends with Us', author: 'Colleen Hoover', price: 199, originalPrice: 399, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.9 },
        { id: 502, title: 'The Thursday Murder Club', author: 'Richard Osman', price: 249, originalPrice: 449, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 503, title: 'Atomic Habits', author: 'James Clear', price: 229, originalPrice: 399, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.9 },
        { id: 504, title: 'The Midnight Library', author: 'Matt Haig', price: 279, originalPrice: 479, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 }
      ]
    },
    mystery: {
      title: 'Mystery & Thriller Books',
      description: 'Edge-of-your-seat suspense and thrilling adventures',
      books: [
        { id: 601, title: 'Gone Girl', author: 'Gillian Flynn', price: 249, originalPrice: 449, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 602, title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', price: 299, originalPrice: 499, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 },
        { id: 603, title: 'Big Little Lies', author: 'Liane Moriarty', price: 279, originalPrice: 479, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.6 },
        { id: 604, title: 'The Silent Patient', author: 'Alex Michaelides', price: 329, originalPrice: 529, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 }
      ]
    },
    children: {
      title: "Children's Books",
      description: 'Magical stories and educational books for young minds',
      books: [
        { id: 701, title: 'Harry Potter Series', author: 'J.K. Rowling', price: 99, originalPrice: 199, image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.9 },
        { id: 702, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', price: 149, originalPrice: 249, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 },
        { id: 703, title: 'Where the Wild Things Are', author: 'Maurice Sendak', price: 129, originalPrice: 229, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.7 },
        { id: 704, title: 'The Cat in the Hat', author: 'Dr. Seuss', price: 119, originalPrice: 199, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=400&fit=crop&auto=format&q=80', rating: 4.8 }
      ]
    }
  };

  const currentCategory = categoryData[category] || categoryData.classic;

  return (
    <div className="category-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <span>{currentCategory.title}</span>
        </div>
        
        <div className="category-header">
          <h1>{currentCategory.title}</h1>
          <p>{currentCategory.description}</p>
        </div>

        <div className="category-filters">
          <div className="filter-section">
            <span className="filter-label">Sort by:</span>
            <select className="filter-select">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="books-grid">
          {currentCategory.books.map(book => (
            <div key={book.id} className="book-card">
              <Link to={`/book/${book.id}`} className="book-link">
                <div className="book-image">
                  <img src={book.image} alt={book.title} />
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="author">{book.author}</p>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{book.rating}</span>
                  </div>
                  <div className="price-section">
                    <span className="current-price">₹{book.price}</span>
                    <span className="original-price">₹{book.originalPrice}</span>
                    <span className="discount">{Math.round((1 - book.price/book.originalPrice) * 100)}% OFF</span>
                  </div>
                </div>
              </Link>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(book)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;