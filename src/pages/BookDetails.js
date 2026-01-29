import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import AuthModal from '../components/AuthModal';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const { category, bookId } = useParams();
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Is this book available in hardcover?',
      answer: 'Yes, both paperback and hardcover editions are available.',
      asker: 'book lover',
      certified: true,
      likes: 15,
      dislikes: 2
    },
    {
      id: 2,
      question: 'How many pages does this book have?',
      answer: 'This book has 236 pages.',
      asker: 'reader123',
      certified: true,
      likes: 8,
      dislikes: 1
    }
  ]);
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(savedUser);
  }, []);

  // All books database
  const allBooks = {
    // Dropdown Books - Books Category (301-305)
    301: {
      id: 301,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 199,
      originalPrice: 399,
      category: 'fiction',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80&sat=-50',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80&brightness=10',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80&contrast=20',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80&sepia=30'
      ],
      rating: 4.8,
      reviews: '15,420 Ratings & 6,850 Reviews',
      description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
      highlights: ['Paperback Edition', '180 Pages', 'English Language', 'Published by Scribner'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    302: {
      id: 302,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 299,
      originalPrice: 599,
      category: 'fiction',
      images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.9,
      reviews: '22,150 Ratings & 9,200 Reviews',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      highlights: ['Paperback Edition', '376 Pages', 'English Language', 'Pulitzer Prize Winner'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    303: {
      id: 303,
      title: '1984',
      author: 'George Orwell',
      price: 179,
      originalPrice: 359,
      category: 'fiction',
      images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.8,
      reviews: '18,650 Ratings & 7,200 Reviews',
      description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
      highlights: ['Paperback Edition', '328 Pages', 'English Language', 'Classic Dystopian Fiction'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    304: {
      id: 304,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 149,
      originalPrice: 299,
      category: 'romance',
      images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.7,
      reviews: '25,420 Ratings & 12,850 Reviews',
      description: 'A timeless romance novel about Elizabeth Bennet and Mr. Darcy in Regency England.',
      highlights: ['Paperback Edition', '432 Pages', 'English Language', 'Classic Romance'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    305: {
      id: 305,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 229,
      originalPrice: 459,
      category: 'fiction',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.6,
      reviews: '12,850 Ratings & 5,200 Reviews',
      description: 'A controversial novel about teenage rebellion and alienation in post-war America.',
      highlights: ['Paperback Edition', '277 Pages', 'English Language', 'Coming-of-Age Classic'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    // E-books Category (401-405)
    401: {
      id: 401,
      title: 'Digital Marketing Mastery',
      author: 'John Smith',
      price: 99,
      originalPrice: 199,
      category: 'ebooks',
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80&sat=-50',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80&brightness=10',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80&contrast=20',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80&sepia=30'
      ],
      rating: 4.5,
      reviews: '3,420 Ratings & 1,850 Reviews',
      description: 'Complete guide to digital marketing strategies and techniques for modern businesses.',
      highlights: ['E-book Format', '350 Pages', 'English Language', 'Digital Marketing Guide'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    402: {
      id: 402,
      title: 'Python Programming Guide',
      author: 'Sarah Johnson',
      price: 149,
      originalPrice: 299,
      category: 'ebooks',
      images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.7,
      reviews: '8,950 Ratings & 3,650 Reviews',
      description: 'Comprehensive Python programming guide from basics to advanced concepts.',
      highlights: ['E-book Format', '500 Pages', 'English Language', 'Programming Tutorial'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    403: {
      id: 403,
      title: 'Web Development Bootcamp',
      author: 'Mike Brown',
      price: 199,
      originalPrice: 399,
      category: 'ebooks',
      images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.6,
      reviews: '5,670 Ratings & 2,100 Reviews',
      description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks.',
      highlights: ['E-book Format', '600 Pages', 'English Language', 'Web Development Course'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    404: {
      id: 404,
      title: 'Data Science Basics',
      author: 'Lisa Davis',
      price: 179,
      originalPrice: 359,
      category: 'ebooks',
      images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.4,
      reviews: '4,230 Ratings & 1,800 Reviews',
      description: 'Introduction to data science concepts, tools, and techniques for beginners.',
      highlights: ['E-book Format', '400 Pages', 'English Language', 'Data Science Guide'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    405: {
      id: 405,
      title: 'AI and Machine Learning',
      author: 'David Wilson',
      price: 249,
      originalPrice: 499,
      category: 'ebooks',
      images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.8,
      reviews: '7,120 Ratings & 2,900 Reviews',
      description: 'Comprehensive guide to artificial intelligence and machine learning concepts.',
      highlights: ['E-book Format', '550 Pages', 'English Language', 'AI/ML Guide'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    // All remaining dropdown books with unique details
    501: { id: 501, title: 'Atomic Habits', author: 'James Clear', price: 299, originalPrice: 599, category: 'audiobooks', images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '32,150 Ratings & 15,200 Reviews', description: 'Audio guide to building good habits.', highlights: ['Audiobook', '5 Hours 35 Minutes', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    502: { id: 502, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', price: 349, originalPrice: 699, category: 'audiobooks', images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '18,650 Ratings & 7,200 Reviews', description: 'Audio lessons in personal change.', highlights: ['Audiobook', '13 Hours 4 Minutes', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    503: { id: 503, title: 'Think and Grow Rich', author: 'Napoleon Hill', price: 199, originalPrice: 399, category: 'audiobooks', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '25,420 Ratings & 12,850 Reviews', description: 'Audio version of the classic.', highlights: ['Audiobook', '10 Hours 17 Minutes', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    504: { id: 504, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', price: 249, originalPrice: 499, category: 'audiobooks', images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '45,200 Ratings & 18,500 Reviews', description: 'Audio lessons about money.', highlights: ['Audiobook', '6 Hours 9 Minutes', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    505: { id: 505, title: 'The Power of Now', author: 'Eckhart Tolle', price: 279, originalPrice: 559, category: 'audiobooks', images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '12,850 Ratings & 5,200 Reviews', description: 'Audio guide to spiritual enlightenment.', highlights: ['Audiobook', '7 Hours 37 Minutes', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    601: { id: 601, title: 'The Alchemist', author: 'Paulo Coelho', price: 199, originalPrice: 399, category: 'novels', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.5, reviews: '45,200 Ratings & 18,500 Reviews', description: 'A fable about following your dream.', highlights: ['Paperback', '163 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    602: { id: 602, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', price: 299, originalPrice: 599, category: 'novels', images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '85,200 Ratings & 35,500 Reviews', description: 'Harry Potter\'s magical adventure.', highlights: ['Paperback', '309 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    603: { id: 603, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 249, originalPrice: 499, category: 'novels', images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '32,150 Ratings & 15,200 Reviews', description: 'Bilbo Baggins\' unexpected journey.', highlights: ['Paperback', '366 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    604: { id: 604, title: 'Dune', author: 'Frank Herbert', price: 349, originalPrice: 699, category: 'novels', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '18,650 Ratings & 7,200 Reviews', description: 'Epic science fiction on desert planet.', highlights: ['Paperback', '688 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    605: { id: 605, title: 'The Kite Runner', author: 'Khaled Hosseini', price: 229, originalPrice: 459, category: 'novels', images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '25,420 Ratings & 12,850 Reviews', description: 'Story of friendship and redemption.', highlights: ['Paperback', '371 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    701: { id: 701, title: 'The Midnight Library', author: 'Matt Haig', price: 199, originalPrice: 399, category: 'fiction', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '22,150 Ratings & 9,200 Reviews', description: 'Novel about life choices.', highlights: ['Paperback', '288 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    702: { id: 702, title: 'Where the Crawdads Sing', author: 'Delia Owens', price: 249, originalPrice: 499, category: 'fiction', images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '65,200 Ratings & 28,500 Reviews', description: 'Mystery and coming-of-age story.', highlights: ['Paperback', '384 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    703: { id: 703, title: 'The Seven Moons', author: 'Rebecca Ross', price: 179, originalPrice: 359, category: 'fiction', images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.5, reviews: '8,950 Ratings & 3,650 Reviews', description: 'Fantasy romance about magic.', highlights: ['Paperback', '416 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    704: { id: 704, title: 'Project Hail Mary', author: 'Andy Weir', price: 299, originalPrice: 599, category: 'fiction', images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '15,420 Ratings & 6,850 Reviews', description: 'Science fiction space adventure.', highlights: ['Paperback', '496 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    705: { id: 705, title: 'The Silent Patient', author: 'Alex Michaelides', price: 219, originalPrice: 439, category: 'fiction', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '35,420 Ratings & 18,850 Reviews', description: 'Psychological thriller.', highlights: ['Paperback', '336 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    801: { id: 801, title: 'Sapiens', author: 'Yuval Noah Harari', price: 299, originalPrice: 599, category: 'nonfiction', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '85,200 Ratings & 35,500 Reviews', description: 'Brief history of humankind.', highlights: ['Paperback', '512 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    802: { id: 802, title: 'Educated', author: 'Tara Westover', price: 249, originalPrice: 499, category: 'nonfiction', images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '45,200 Ratings & 18,500 Reviews', description: 'Memoir about education and family.', highlights: ['Paperback', '334 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    803: { id: 803, title: 'Becoming', author: 'Michelle Obama', price: 349, originalPrice: 699, category: 'nonfiction', images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '125,200 Ratings & 55,500 Reviews', description: 'Michelle Obama\'s inspiring memoir.', highlights: ['Paperback', '448 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    804: { id: 804, title: 'The Immortal Life of Henrietta Lacks', author: 'Rebecca Skloot', price: 229, originalPrice: 459, category: 'nonfiction', images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '32,150 Ratings & 15,200 Reviews', description: 'Science and ethics story.', highlights: ['Paperback', '381 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    805: { id: 805, title: 'Freakonomics', author: 'Steven Levitt', price: 199, originalPrice: 399, category: 'nonfiction', images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '28,650 Ratings & 12,200 Reviews', description: 'Economics made interesting.', highlights: ['Paperback', '336 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    901: { id: 901, title: 'Calculus Early Transcendentals', author: 'James Stewart', price: 599, originalPrice: 1199, category: 'textbooks', images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.5, reviews: '5,420 Ratings & 2,850 Reviews', description: 'Comprehensive calculus textbook.', highlights: ['Hardcover', '1368 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    902: { id: 902, title: 'Campbell Biology', author: 'Jane Reece', price: 799, originalPrice: 1599, category: 'textbooks', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '8,950 Ratings & 3,650 Reviews', description: 'Leading biology textbook.', highlights: ['Hardcover', '1464 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    903: { id: 903, title: 'Principles of Economics', author: 'Gregory Mankiw', price: 699, originalPrice: 1399, category: 'textbooks', images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '12,150 Ratings & 5,200 Reviews', description: 'Economics principles textbook.', highlights: ['Hardcover', '888 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    904: { id: 904, title: 'Introduction to Algorithms', author: 'Thomas Cormen', price: 899, originalPrice: 1799, category: 'textbooks', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '15,420 Ratings & 6,850 Reviews', description: 'Comprehensive algorithms textbook.', highlights: ['Hardcover', '1312 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    905: { id: 905, title: 'Organic Chemistry', author: 'Paula Bruice', price: 749, originalPrice: 1499, category: 'textbooks', images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.4, reviews: '7,120 Ratings & 2,900 Reviews', description: 'Organic chemistry textbook.', highlights: ['Hardcover', '1344 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1001: { id: 1001, title: 'The Cat in the Hat', author: 'Dr. Seuss', price: 99, originalPrice: 199, category: 'children', images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '85,200 Ratings & 35,500 Reviews', description: 'Classic children\'s story.', highlights: ['Paperback', '61 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1002: { id: 1002, title: 'Where the Wild Things Are', author: 'Maurice Sendak', price: 149, originalPrice: 299, category: 'children', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '65,200 Ratings & 28,500 Reviews', description: 'Adventure in imagination.', highlights: ['Paperback', '48 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1003: { id: 1003, title: 'Goodnight Moon', author: 'Margaret Wise Brown', price: 129, originalPrice: 259, category: 'children', images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '45,200 Ratings & 18,500 Reviews', description: 'Bedtime story classic.', highlights: ['Paperback', '32 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1004: { id: 1004, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', price: 179, originalPrice: 359, category: 'children', images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '125,200 Ratings & 55,500 Reviews', description: 'Learning through story.', highlights: ['Paperback', '26 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1005: { id: 1005, title: 'Green Eggs and Ham', author: 'Dr. Seuss', price: 119, originalPrice: 239, category: 'children', images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '75,200 Ratings & 32,500 Reviews', description: 'Fun reading adventure.', highlights: ['Paperback', '62 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1101: { id: 1101, title: 'Spider-Man: Into the Spider-Verse', author: 'Marvel Comics', price: 299, originalPrice: 599, category: 'comics', images: ['https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '25,420 Ratings & 12,850 Reviews', description: 'Superhero comic adventure.', highlights: ['Comic Book', '128 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1102: { id: 1102, title: 'Batman: The Dark Knight Returns', author: 'Frank Miller', price: 399, originalPrice: 799, category: 'comics', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '35,420 Ratings & 18,850 Reviews', description: 'Dark Batman story.', highlights: ['Comic Book', '224 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1103: { id: 1103, title: 'Watchmen', author: 'Alan Moore', price: 449, originalPrice: 899, category: 'comics', images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.9, reviews: '45,200 Ratings & 18,500 Reviews', description: 'Graphic novel masterpiece.', highlights: ['Comic Book', '416 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1104: { id: 1104, title: 'The Walking Dead Vol. 1', author: 'Robert Kirkman', price: 199, originalPrice: 399, category: 'comics', images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '22,150 Ratings & 9,200 Reviews', description: 'Zombie apocalypse story.', highlights: ['Comic Book', '144 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1105: { id: 1105, title: 'X-Men: Days of Future Past', author: 'Chris Claremont', price: 349, originalPrice: 699, category: 'comics', images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '18,650 Ratings & 7,200 Reviews', description: 'Mutant superhero saga.', highlights: ['Comic Book', '176 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1201: { id: 1201, title: 'It Ends with Us', author: 'Colleen Hoover', price: 249, originalPrice: 499, category: 'bestsellers', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.8, reviews: '125,200 Ratings & 55,500 Reviews', description: 'Contemporary romance novel.', highlights: ['Paperback', '384 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1202: { id: 1202, title: 'The Thursday Murder Club', author: 'Richard Osman', price: 199, originalPrice: 399, category: 'bestsellers', images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.7, reviews: '85,200 Ratings & 35,500 Reviews', description: 'Mystery novel with humor.', highlights: ['Paperback', '368 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1203: { id: 1203, title: 'The Silent Patient', author: 'Alex Michaelides', price: 219, originalPrice: 439, category: 'bestsellers', images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.6, reviews: '65,200 Ratings & 28,500 Reviews', description: 'Psychological thriller bestseller.', highlights: ['Paperback', '336 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1204: { id: 1204, title: 'Gone Girl', author: 'Gillian Flynn', price: 229, originalPrice: 459, category: 'bestsellers', images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.5, reviews: '95,200 Ratings & 42,500 Reviews', description: 'Psychological thriller masterpiece.', highlights: ['Paperback', '432 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    1205: { id: 1205, title: 'The Girl on the Train', author: 'Paula Hawkins', price: 199, originalPrice: 399, category: 'bestsellers', images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&auto=format&q=80'], rating: 4.4, reviews: '75,200 Ratings & 32,500 Reviews', description: 'Gripping psychological thriller.', highlights: ['Paperback', '395 Pages', 'English Language'], offers: [{ type: 'Bank Offer', text: '5% cashback', code: 'T&C' }] },
    // Audiobooks Category (501-505)
    501: {
      id: 501,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 299,
      originalPrice: 599,
      category: 'audiobooks',
      images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.9,
      reviews: '32,150 Ratings & 15,200 Reviews',
      description: 'An easy & proven way to build good habits & break bad ones - Audio Edition.',
      highlights: ['Audiobook Format', '5 Hours 35 Minutes', 'English Language', 'Narrated by Author'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    502: {
      id: 502,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      price: 349,
      originalPrice: 699,
      category: 'audiobooks',
      images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.7,
      reviews: '18,650 Ratings & 7,200 Reviews',
      description: 'Powerful lessons in personal change - Audio Edition.',
      highlights: ['Audiobook Format', '13 Hours 4 Minutes', 'English Language', 'Professional Narration'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    503: {
      id: 503,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      price: 199,
      originalPrice: 399,
      category: 'audiobooks',
      images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.7,
      reviews: '25,420 Ratings & 12,850 Reviews',
      description: 'The landmark bestseller now in audio format - Audio Edition.',
      highlights: ['Audiobook Format', '10 Hours 17 Minutes', 'English Language', 'Classic Narration'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    504: {
      id: 504,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      price: 249,
      originalPrice: 499,
      category: 'audiobooks',
      images: ['https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.6,
      reviews: '45,200 Ratings & 18,500 Reviews',
      description: 'What the rich teach their kids about money - Audio Edition.',
      highlights: ['Audiobook Format', '6 Hours 9 Minutes', 'English Language', 'Author Narrated'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    505: {
      id: 505,
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      price: 279,
      originalPrice: 559,
      category: 'audiobooks',
      images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&auto=format&q=80'],
      rating: 4.8,
      reviews: '12,850 Ratings & 5,200 Reviews',
      description: 'A guide to spiritual enlightenment - Audio Edition.',
      highlights: ['Audiobook Format', '7 Hours 37 Minutes', 'English Language', 'Spiritual Guide'],
      offers: [{ type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }]
    },
    1: {
      id: 1,
      title: 'The Power of Now: A Guide to Spiritual Enlightenment',
      author: 'Eckhart Tolle',
      price: 249,
      originalPrice: 499,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80&sat=-50',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80&brightness=10',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80&contrast=20',
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80&sepia=30'
      ],
      rating: 4.7,
      reviews: '1,850 Ratings & 650 Reviews',
      description: 'A guide to spiritual enlightenment and living in the present moment.',
      highlights: [
        'Paperback Edition',
        '236 Pages',
        'English Language',
        'Published by New World Library',
        'ISBN: 978-1577314806',
        '1 Year Warranty for Damage'
      ],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' },
        { type: 'Bank Offer', text: '5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarter', code: 'T&C' },
        { type: 'Special Price', text: 'Get extra ₹100 off', code: 'T&C' }
      ]
    },
    2: {
      id: 2,
      title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits',
      author: 'James Clear',
      price: 299,
      originalPrice: 599,
      category: 'bestsellers',
      images: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.9,
      reviews: '5,150 Ratings & 2,851 Reviews',
      description: 'An easy & proven way to build good habits & break bad ones.',
      highlights: ['Paperback Edition', '320 Pages', 'English Language', 'Published by Avery'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    3: {
      id: 3,
      title: 'Think and Grow Rich: The Landmark Bestseller',
      author: 'Napoleon Hill',
      price: 199,
      originalPrice: 399,
      category: 'bestsellers',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.7,
      reviews: '3,200 Ratings & 1,200 Reviews',
      description: 'The landmark bestseller now revised and updated for the 21st century.',
      highlights: ['Paperback Edition', '320 Pages', 'English Language', 'Published by TarcherPerigee'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    4: {
      id: 4,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen R. Covey',
      price: 349,
      originalPrice: 699,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.7,
      reviews: '2,800 Ratings & 1,100 Reviews',
      description: 'Powerful lessons in personal change.',
      highlights: ['Paperback Edition', '381 Pages', 'English Language', 'Published by Free Press'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    5: {
      id: 5,
      title: 'Rich Dad Poor Dad: What the Rich Teach Their Kids',
      author: 'Robert T. Kiyosaki',
      price: 249,
      originalPrice: 499,
      category: 'finance',
      images: [
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.6,
      reviews: '4,200 Ratings & 1,800 Reviews',
      description: 'What the rich teach their kids about money that the poor and middle class do not.',
      highlights: ['Paperback Edition', '336 Pages', 'English Language', 'Published by Plata Publishing'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    6: {
      id: 6,
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      price: 199,
      originalPrice: 399,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.6,
      reviews: '3,500 Ratings & 1,500 Reviews',
      description: 'A counterintuitive approach to living a good life.',
      highlights: ['Paperback Edition', '224 Pages', 'English Language', 'Published by HarperOne'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    7: {
      id: 7,
      title: 'The Alchemist: A Fable About Following Your Dream',
      author: 'Paulo Coelho',
      price: 199,
      originalPrice: 399,
      category: 'fiction',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.5,
      reviews: '12,450 Ratings & 5,200 Reviews',
      description: 'A fable about following your dream and the transformative journey of self-discovery.',
      highlights: ['Paperback Edition', '163 Pages', 'English Language', 'Published by HarperOne'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    8: {
      id: 8,
      title: 'The Monk Who Sold His Ferrari: A Fable About Fulfilling Your Dreams',
      author: 'Robin Sharma',
      price: 179,
      originalPrice: 359,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.4,
      reviews: '8,320 Ratings & 3,100 Reviews',
      description: 'A fable about fulfilling your dreams and living with passion, purpose and peace.',
      highlights: ['Paperback Edition', '198 Pages', 'English Language', 'Published by Jaico Publishing'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    9: {
      id: 9,
      title: 'You Can Win: A Step-by-Step Tool for Top Achievers',
      author: 'Shiv Khera',
      price: 149,
      originalPrice: 299,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.3,
      reviews: '6,890 Ratings & 2,400 Reviews',
      description: 'A step-by-step tool for top achievers to build confidence and achieve success.',
      highlights: ['Paperback Edition', '286 Pages', 'English Language', 'Published by Macmillan'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    10: {
      id: 10,
      title: 'The Secret: The Power of Positive Thinking',
      author: 'Rhonda Byrne',
      price: 229,
      originalPrice: 459,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.2,
      reviews: '5,670 Ratings & 2,100 Reviews',
      description: 'Discover the power of positive thinking and the law of attraction.',
      highlights: ['Paperback Edition', '198 Pages', 'English Language', 'Published by Atria Books'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    11: {
      id: 11,
      title: 'Who Moved My Cheese?: An Amazing Way to Deal with Change',
      author: 'Spencer Johnson',
      price: 159,
      originalPrice: 319,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.1,
      reviews: '4,230 Ratings & 1,800 Reviews',
      description: 'An amazing way to deal with change in your work and in your life.',
      highlights: ['Paperback Edition', '94 Pages', 'English Language', 'Published by Putnam Adult'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    12: {
      id: 12,
      title: 'The Magic of Thinking Big: Achieve More Than You Ever Imagined',
      author: 'David J. Schwartz',
      price: 189,
      originalPrice: 379,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.4,
      reviews: '7,120 Ratings & 2,900 Reviews',
      description: 'Achieve more than you ever imagined possible with the magic of thinking big.',
      highlights: ['Paperback Edition', '238 Pages', 'English Language', 'Published by Fireside'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    201: {
      id: 201,
      title: 'The Great Gatsby: A Classic American Novel',
      author: 'F. Scott Fitzgerald',
      price: 199,
      originalPrice: 399,
      category: 'fiction',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: '15,420 Ratings & 6,850 Reviews',
      description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
      highlights: ['Paperback Edition', '180 Pages', 'English Language', 'Published by Scribner'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    202: {
      id: 202,
      title: 'To Kill a Mockingbird: Pulitzer Prize Winner',
      author: 'Harper Lee',
      price: 299,
      originalPrice: 599,
      category: 'bestsellers',
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.9,
      reviews: '22,150 Ratings & 9,200 Reviews',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      highlights: ['Paperback Edition', '376 Pages', 'English Language', 'Pulitzer Prize Winner'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    203: {
      id: 203,
      title: 'The 4-Hour Workweek: Escape 9-5, Live Anywhere',
      author: 'Timothy Ferriss',
      price: 149,
      originalPrice: 299,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.6,
      reviews: '8,750 Ratings & 3,200 Reviews',
      description: 'Learn how to escape the 9-5 grind, live anywhere, and join the new rich.',
      highlights: ['Paperback Edition', '416 Pages', 'English Language', 'Lifestyle Design Guide'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    204: {
      id: 204,
      title: 'Introduction to Algorithms: MIT Press',
      author: 'Thomas H. Cormen',
      price: 399,
      originalPrice: 799,
      category: 'academic',
      images: [
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.7,
      reviews: '3,420 Ratings & 1,850 Reviews',
      description: 'Comprehensive introduction to algorithms and data structures for computer science students.',
      highlights: ['Hardcover Edition', '1312 Pages', 'English Language', 'MIT Press Publication'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    205: {
      id: 205,
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      price: 99,
      originalPrice: 199,
      category: 'children',
      images: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.9,
      reviews: '45,200 Ratings & 18,500 Reviews',
      description: 'The magical story of Harry Potter\'s first year at Hogwarts School of Witchcraft and Wizardry.',
      highlights: ['Paperback Edition', '223 Pages', 'English Language', 'Fantasy Adventure'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    206: {
      id: 206,
      title: 'Steve Jobs: The Exclusive Biography',
      author: 'Walter Isaacson',
      price: 249,
      originalPrice: 499,
      category: 'biography',
      images: [
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: '12,850 Ratings & 5,200 Reviews',
      description: 'The exclusive biography of Apple co-founder Steve Jobs, based on extensive interviews.',
      highlights: ['Paperback Edition', '656 Pages', 'English Language', 'Bestselling Biography'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    207: {
      id: 207,
      title: 'Pride and Prejudice: Jane Austen Classic',
      author: 'Jane Austen',
      price: 179,
      originalPrice: 359,
      category: 'romance',
      images: [
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.7,
      reviews: '18,650 Ratings & 7,200 Reviews',
      description: 'A timeless romance novel about Elizabeth Bennet and Mr. Darcy in Regency England.',
      highlights: ['Paperback Edition', '432 Pages', 'English Language', 'Classic Romance'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    208: {
      id: 208,
      title: 'Gone Girl: A Psychological Thriller',
      author: 'Gillian Flynn',
      price: 199,
      originalPrice: 399,
      category: 'mystery',
      images: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.6,
      reviews: '25,420 Ratings & 12,850 Reviews',
      description: 'A psychological thriller about a marriage gone terribly wrong and a wife who disappears.',
      highlights: ['Paperback Edition', '432 Pages', 'English Language', 'Bestselling Thriller'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    209: {
      id: 209,
      title: 'A Brief History of Time: From Big Bang to Black Holes',
      author: 'Stephen Hawking',
      price: 349,
      originalPrice: 699,
      category: 'science',
      images: [
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: '8,950 Ratings & 3,650 Reviews',
      description: 'A landmark volume in science writing that explores the nature of time and the universe.',
      highlights: ['Paperback Edition', '256 Pages', 'English Language', 'Popular Science'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    210: {
      id: 210,
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      price: 229,
      originalPrice: 459,
      category: 'history',
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.9,
      reviews: '32,150 Ratings & 15,200 Reviews',
      description: 'A brief history of humankind from the Stone Age to the present, exploring how we conquered the world.',
      highlights: ['Paperback Edition', '512 Pages', 'English Language', 'International Bestseller'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    101: {
      id: 101,
      title: 'Bestsellers Collection: Top Rated Books',
      author: 'Various Authors',
      price: 199,
      originalPrice: 399,
      category: 'bestsellers',
      images: [
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: '25,420 Ratings & 12,850 Reviews',
      description: 'A curated collection of the most popular and highly-rated books across all genres.',
      highlights: ['Paperback Edition', 'Multiple Authors', 'English Language', 'Bestseller Collection'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    102: {
      id: 102,
      title: 'Fiction Masterpieces: Literary Classics',
      author: 'Classic Authors',
      price: 149,
      originalPrice: 299,
      category: 'fiction',
      images: [
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.7,
      reviews: '18,650 Ratings & 7,200 Reviews',
      description: 'A collection of timeless fiction works from renowned authors around the world.',
      highlights: ['Paperback Edition', 'Classic Literature', 'English Language', 'Fiction Collection'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    103: {
      id: 103,
      title: 'Self Help Essentials: Transform Your Life',
      author: 'Leading Self-Help Authors',
      price: 99,
      originalPrice: 199,
      category: 'selfhelp',
      images: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.6,
      reviews: '32,150 Ratings & 15,200 Reviews',
      description: 'Essential self-help books to transform your mindset and achieve personal growth.',
      highlights: ['Paperback Edition', 'Personal Development', 'English Language', 'Self-Help Collection'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    104: {
      id: 104,
      title: 'Academic Excellence: Study Materials',
      author: 'Academic Publishers',
      price: 299,
      originalPrice: 599,
      category: 'academic',
      images: [
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.5,
      reviews: '8,950 Ratings & 3,650 Reviews',
      description: 'Comprehensive academic books and study materials for students and professionals.',
      highlights: ['Hardcover Edition', 'Academic Content', 'English Language', 'Study Materials'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    105: {
      id: 105,
      title: 'Children\'s Wonder: Magical Stories',
      author: 'Children\'s Authors',
      price: 79,
      originalPrice: 159,
      category: 'children',
      images: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.9,
      reviews: '45,200 Ratings & 18,500 Reviews',
      description: 'Enchanting stories and adventures that spark imagination in young minds.',
      highlights: ['Paperback Edition', 'Illustrated', 'English Language', 'Children\'s Literature'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    },
    106: {
      id: 106,
      title: 'Biography Chronicles: Inspiring Lives',
      author: 'Biography Writers',
      price: 179,
      originalPrice: 359,
      category: 'biography',
      images: [
        'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&auto=format&q=80'
      ],
      rating: 4.8,
      reviews: '12,850 Ratings & 5,200 Reviews',
      description: 'Inspiring life stories of remarkable individuals who changed the world.',
      highlights: ['Paperback Edition', 'Real Life Stories', 'English Language', 'Biography Collection'],
      offers: [
        { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' }
      ]
    }
  };

  // Determine current book and category
  let book, currentCategory;
  
  if (bookId) {
    // Individual book page
    book = allBooks[bookId];
    if (book) {
      currentCategory = {
        title: book.category.charAt(0).toUpperCase() + book.category.slice(1) + ' Books',
        books: [book]
      };
    }
  } else {
    // Category page
    const categoryBooks = Object.values(allBooks).filter(b => b.category === category);
    currentCategory = {
      title: category ? category.charAt(0).toUpperCase() + category.slice(1) + ' Books' : 'Self-Help Books',
      books: categoryBooks.length > 0 ? categoryBooks : [allBooks[1]]
    };
    book = currentCategory.books[selectedBook];
  }
  
  if (!book) {
    book = allBooks[1]; // fallback
    currentCategory = { title: 'Self-Help Books', books: [book] };
  }

  const similarBooks = [
    { id: 1, title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones', author: 'James Clear', price: 299, originalPrice: 599, rating: 4.5, reviews: '(74,975)', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true },
    { id: 2, title: 'Think and Grow Rich: The Landmark Bestseller Now Revised and Updated', author: 'Napoleon Hill', price: 199, originalPrice: 399, rating: 4.7, reviews: '(326)', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true, gemini: true },
    { id: 3, title: 'The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change', author: 'Stephen R. Covey', price: 349, originalPrice: 699, rating: 4.7, reviews: '(326)', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true },
    { id: 4, title: 'Rich Dad Poor Dad: What the Rich Teach Their Kids About Money', author: 'Robert T. Kiyosaki', price: 249, originalPrice: 499, rating: 4.6, reviews: '(52,150)', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true },
    { id: 5, title: 'The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living', author: 'Mark Manson', price: 199, originalPrice: 399, rating: 4.6, reviews: '(52,150)', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true },
    { id: 6, title: 'How to Win Friends and Influence People: The Only Book You Need', author: 'Dale Carnegie', price: 179, originalPrice: 359, rating: 4.6, reviews: '(52,150)', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true }
  ];

  const accessories = [
    { id: 7, title: 'The Alchemist: A Fable About Following Your Dream', author: 'Paulo Coelho', price: 199, originalPrice: 399, rating: 4.5, reviews: '(12,450)', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: false, assured: false, category: 'selfhelp' },
    { id: 8, title: 'The Monk Who Sold His Ferrari: A Fable About Fulfilling Your Dreams', author: 'Robin Sharma', price: 179, originalPrice: 359, rating: 4.4, reviews: '(8,320)', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true, category: 'selfhelp' },
    { id: 9, title: 'You Can Win: A Step-by-Step Tool for Top Achievers', author: 'Shiv Khera', price: 149, originalPrice: 299, rating: 4.3, reviews: '(6,890)', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: false, assured: true, category: 'selfhelp' },
    { id: 10, title: 'The Secret: The Power of Positive Thinking', author: 'Rhonda Byrne', price: 229, originalPrice: 459, rating: 4.2, reviews: '(5,670)', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: false, category: 'motivational' },
    { id: 11, title: 'Who Moved My Cheese?: An Amazing Way to Deal with Change', author: 'Spencer Johnson', price: 159, originalPrice: 319, rating: 4.1, reviews: '(4,230)', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: false, assured: true, category: 'personal-development' },
    { id: 12, title: 'The Magic of Thinking Big: Achieve More Than You Ever Imagined', author: 'David J. Schwartz', price: 189, originalPrice: 379, rating: 4.4, reviews: '(7,120)', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: false, assured: true, category: 'motivational' },
    { id: 13, title: 'Mindset: The New Psychology of Success', author: 'Carol S. Dweck', price: 299, originalPrice: 599, rating: 4.6, reviews: '(9,850)', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: true, assured: true, category: 'personal-development' },
    { id: 14, title: 'The Power of Positive Thinking', author: 'Norman Vincent Peale', price: 179, originalPrice: 359, rating: 4.3, reviews: '(6,420)', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=250&fit=crop&auto=format&q=80', discount: '50% off', sponsored: false, assured: true, category: 'motivational' }
  ];

  const getFilteredAccessories = () => {
    return accessories;
  };

  const handleAddToCart = async () => {
    setAddToCartLoading(true);
    
    setTimeout(() => {
      addToCart(book);
      setAddToCartLoading(false);
    }, 800);
  };

  const handleBuyNow = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setBuyNowLoading(true);
    
    setTimeout(() => {
      setBuyNowLoading(false);
      navigate('/checkout', { state: { buyNowItem: book } });
    }, 1500);
  };

  const handleIncreaseQuantity = () => {
    const cartItem = cartItems.find(item => item.id === book.id);
    if (cartItem) {
      updateQuantity(book.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    const cartItem = cartItems.find(item => item.id === book.id);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        removeFromCart(book.id);
      } else {
        updateQuantity(book.id, cartItem.quantity - 1);
      }
    }
  };

  const getCartQuantity = () => {
    const cartItem = cartItems.find(item => item.id === book.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const isInCart = () => {
    return cartItems.some(item => item.id === book.id);
  };

  const handleLogin = (userData) => {
    const email = userData.email || userData;
    setUser(email);
    localStorage.setItem('currentUser', email);
    setShowAuthModal(false);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const question = {
        id: questions.length + 1,
        question: newQuestion,
        answer: 'This question is awaiting an answer.',
        asker: user ? user.split('@')[0] : 'Anonymous',
        certified: !!user,
        likes: 0,
        dislikes: 0
      };
      setQuestions([...questions, question]);
      setNewQuestion('');
    }
  };

  const allOffers = [
    { type: 'Bank Offer', text: '5% cashback on Axis Bank Flipkart Debit Card up to ₹750', code: 'T&C' },
    { type: 'Bank Offer', text: '5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000', code: 'T&C' },
    { type: 'Special Price', text: 'Get extra ₹100 off', code: 'T&C' },
    { type: 'EMI Offer', text: 'No Cost EMI on Credit Card', code: 'T&C' },
    { type: 'Exchange Offer', text: 'Up to ₹200 off on Exchange', code: 'T&C' },
    { type: 'Partner Offer', text: 'Sign up for BookKart Pay Later and get free delivery', code: 'T&C' },
    { type: 'Bank Offer', text: '10% off on HDFC Bank Credit Card', code: 'T&C' },
    { type: 'Cashback', text: 'Get ₹50 cashback on first order', code: 'T&C' },
    { type: 'Bundle Offer', text: 'Buy 2 books and get 1 free', code: 'T&C' },
    { type: 'Student Offer', text: 'Extra 15% off for students', code: 'T&C' }
  ];

  return (
    <div className="book-details-page">
      {/* Main Product Section */}
      <div className="product-main">
        <div className="container">
          {/* Breadcrumb inside main content */}
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link> 
            <span className="breadcrumb-separator"> &gt; </span>
            <Link to="/books" className="breadcrumb-link">Books</Link> 
            <span className="breadcrumb-separator"> &gt; </span>
          </div>
          <div className="product-layout">
            {/* Left - Images */}
            <div className="product-images">
              <div className="image-thumbnails">
                {book.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${book.title} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
              <div className="main-image">
                <img src={book.images[selectedImage]} alt={book.title} />
                <div className="image-actions">
                  <button className="wishlist-btn">♡</button>
                </div>
              </div>
              <div className="action-buttons">
                {!isInCart() ? (
                  <button 
                    className={`add-to-cart ${addToCartLoading ? 'loading' : ''}`}
                    onClick={handleAddToCart}
                    disabled={addToCartLoading}
                  >
                    {addToCartLoading ? <span className="spinner"></span> : '🛒 ADD TO CART'}
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={handleDecreaseQuantity}>-</button>
                    <span className="quantity-display">{getCartQuantity()}</span>
                    <button className="quantity-btn" onClick={handleIncreaseQuantity}>+</button>
                  </div>
                )}
                <button 
                  className={`buy-now ${buyNowLoading ? 'loading' : ''}`}
                  onClick={handleBuyNow}
                  disabled={buyNowLoading}
                >
                  {buyNowLoading ? <span className="spinner"></span> : '⚡ BUY NOW'}
                </button>
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="product-info">
              <div className="product-header">
                <h1>{book.title}</h1>
                <div className="rating-section">
                  <span className="rating-badge">{book.rating} ★</span>
                  <span className="rating-text">{book.reviews}</span>
                  <span className="assured">🛡️ Assured</span>
                </div>
                <div className="extra-offer">Extra ₹{Math.floor((book.originalPrice - book.price) * 0.2)} off</div>
              </div>

              <div className="pricing">
                <div className="price-main">₹{book.price.toLocaleString()}</div>
                <div className="price-original">₹{book.originalPrice.toLocaleString()}</div>
                <div className="discount">{Math.round((1 - book.price/book.originalPrice) * 100)}% off</div>
              </div>

              <div className="delivery-info">
                <div className="protect-fee">
                  + ₹{Math.floor(book.price * 0.1)} Protect Promise Fee 
                  <button 
                    className="learn-more-btn"
                    onClick={() => setShowLearnMore(!showLearnMore)}
                  >
                    Learn more
                  </button>
                  {showLearnMore && (
                    <div className="learn-more-content">
                      <div className="learn-more-popup">
                        <h4>Protect Promise Fee</h4>
                        <p>This fee covers:</p>
                        <ul>
                          <li>Damage protection during shipping</li>
                          <li>Replacement guarantee for defective items</li>
                          <li>Extended return window</li>
                          <li>Priority customer support</li>
                        </ul>
                        <button onClick={() => setShowLearnMore(false)}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="delivery-date">Secure delivery by 29 Jan, Thursday</div>
              </div>

              {/* Available Offers */}
              <div className="offers-section">
                <h3>Available offers</h3>
                {(showMoreOffers ? allOffers : allOffers.slice(0, 3)).map((offer, index) => (
                  <div key={index} className="offer-item">
                    <span className="offer-icon">🏷️</span>
                    <span className="offer-type">{offer.type}</span>
                    <span className="offer-text">{offer.text}</span>
                    <span className="offer-code">{offer.code}</span>
                  </div>
                ))}
                <button 
                  className="view-more-offers"
                  onClick={() => setShowMoreOffers(!showMoreOffers)}
                >
                  {showMoreOffers ? 'View less offers' : 'View 9 more offers'}
                </button>
              </div>

              {/* Buy Options */}
              <div className="buy-options">
                <div className="buy-option active">
                  <input type="radio" name="buyOption" defaultChecked />
                  <span>Buy without Exchange</span>
                  <span className="option-price">₹{book.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Highlights */}
      <div className="product-highlights">
        <div className="container">
          <h2>Product Highlights</h2>
          <div className="highlights-grid">
            {book.highlights.map((highlight, index) => (
              <div key={index} className="highlight-item">• {highlight}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions & Answers */}
      <div className="qa-section">
        <div className="container">
          <div className="qa-header">
            <h2>Questions & Answers</h2>
            <button className="back-to-top" onClick={() => window.scrollTo(0, 0)}>↑ Back to top</button>
          </div>
          
          {/* Add Question Form */}
          <div className="add-question-form">
            <h3>Ask a Question</h3>
            <div className="question-input-group">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="question-input"
                rows="3"
              />
              <button 
                className="submit-question-btn"
                onClick={handleAddQuestion}
                disabled={!newQuestion.trim()}
              >
                Submit Question
              </button>
            </div>
          </div>

          <div className="qa-list">
            {(showAllQuestions ? questions : questions.slice(0, 2)).map((qa) => (
              <div key={qa.id} className="qa-item">
                <div className="question">Q: {qa.question}</div>
                <div className="answer">A: {qa.answer}</div>
                <div className="qa-meta">
                  <span className="asker">{qa.asker}</span>
                  {qa.certified && <span className="certified">✓ Certified Buyer</span>}
                  <div className="qa-actions">
                    <button>👍 {qa.likes}</button>
                    <button>👎 {qa.dislikes}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            className="all-questions"
            onClick={() => setShowAllQuestions(!showAllQuestions)}
          >
            {showAllQuestions ? 'Show less questions' : `All questions + (${questions.length})`}
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="similar-products">
        <div className="container">
          <h2>Similar products</h2>
          <div className="products-scroll-container">
            <div className="products-grid-horizontal">
              {similarBooks.map(product => (
                <div key={product.id} className="product-card-horizontal" onClick={() => window.location.href = `/book/${product.id}`}>
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                    <button className="wishlist">♡</button>
                    {product.gemini && <div className="gemini-badge">with ✦ Google Gemini</div>}
                  </div>
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    <p className="author">by {product.author}</p>
                    <div className="product-rating">
                      <span className="rating">{product.rating} ★</span>
                      <span className="reviews">{product.reviews}</span>
                      {product.assured && <span className="assured-small">🛡️ Assured</span>}
                    </div>
                    <div className="product-pricing">
                      <span className="current-price">₹{product.price.toLocaleString()}</span>
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="discount">{product.discount}</span>
                    </div>
                    {product.sponsored && <div className="sponsored">Sponsored</div>}
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-arrow right">›</button>
          </div>
        </div>
      </div>

      {/* Bought Together */}
      <div className="bought-together">
        <div className="container">
          <div className="bought-header">
            <h2>Bought together</h2>
            <button className="back-to-top">↑ Back to top</button>
          </div>
          <div className="category-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Categories
            </button>
          </div>
          <div className="accessories-scroll-container">
            <div className="accessories-grid-horizontal">
              {getFilteredAccessories().map(accessory => (
                <div key={accessory.id} className="accessory-card-horizontal" onClick={() => window.location.href = `/book/${accessory.id}`}>
                  <div className="accessory-image">
                    <img src={accessory.image} alt={accessory.title} />
                    <button className="wishlist">♡</button>
                  </div>
                  <div className="accessory-details">
                    <h3>{accessory.title}</h3>
                    <p className="author">by {accessory.author}</p>
                    {accessory.rating && (
                      <div className="accessory-rating">
                        <span className="rating">{accessory.rating} ★</span>
                        <span className="reviews">{accessory.reviews}</span>
                        {accessory.assured && <span className="assured-small">🛡️ Assured</span>}
                      </div>
                    )}
                    <div className="accessory-pricing">
                      <span className="current-price">₹{accessory.price}</span>
                      <span className="original-price">₹{accessory.originalPrice.toLocaleString()}</span>
                      <span className="discount">{accessory.discount}</span>
                    </div>
                    {accessory.sponsored && <div className="sponsored">Sponsored</div>}
                  </div>
                </div>
              ))}}
            </div>
            <button className="scroll-arrow right">›</button>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="trust-banner">
        <div className="container">
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <div className="back-to-top-fixed">
        <button onClick={() => window.scrollTo(0, 0)}>↑ Back to top</button>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default BookDetails;