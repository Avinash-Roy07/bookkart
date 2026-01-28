import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = ({ user, onLoginClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dealsScrollPosition, setDealsScrollPosition] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Close dropdown when touching outside
  useEffect(() => {
    const handleOutsideTouch = (event) => {
      if (!event.target.closest('.category-nav-item') && !event.target.closest('.user-menu') && !event.target.closest('.dropdown-menu')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('touchstart', handleOutsideTouch);
    document.addEventListener('click', handleOutsideTouch);
    return () => {
      document.removeEventListener('touchstart', handleOutsideTouch);
      document.removeEventListener('click', handleOutsideTouch);
    };
  }, []);
  
  const scrollDeals = (direction) => {
    const container = document.querySelector('.deals-grid');
    const scrollAmount = 220;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };
  
  const categoryData = {
    books: [
      { id: 301, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
      { id: 302, title: "To Kill a Mockingbird", author: "Harper Lee" },
      { id: 303, title: "1984", author: "George Orwell" },
      { id: 304, title: "Pride and Prejudice", author: "Jane Austen" },
      { id: 305, title: "The Catcher in the Rye", author: "J.D. Salinger" }
    ],
    ebooks: [
      { id: 401, title: "Digital Marketing Mastery", author: "John Smith" },
      { id: 402, title: "Python Programming Guide", author: "Sarah Johnson" },
      { id: 403, title: "Web Development Bootcamp", author: "Mike Brown" },
      { id: 404, title: "Data Science Basics", author: "Lisa Davis" },
      { id: 405, title: "AI and Machine Learning", author: "David Wilson" }
    ],
    audiobooks: [
      { id: 501, title: "Atomic Habits", author: "James Clear" },
      { id: 502, title: "The 7 Habits of Highly Effective People", author: "Stephen Covey" },
      { id: 503, title: "Think and Grow Rich", author: "Napoleon Hill" },
      { id: 504, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
      { id: 505, title: "The Power of Now", author: "Eckhart Tolle" }
    ],
    novels: [
      { id: 601, title: "The Alchemist", author: "Paulo Coelho" },
      { id: 602, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
      { id: 603, title: "The Hobbit", author: "J.R.R. Tolkien" },
      { id: 604, title: "Dune", author: "Frank Herbert" },
      { id: 605, title: "The Kite Runner", author: "Khaled Hosseini" }
    ],
    fiction: [
      { id: 701, title: "The Midnight Library", author: "Matt Haig" },
      { id: 702, title: "Where the Crawdads Sing", author: "Delia Owens" },
      { id: 703, title: "The Seven Moons", author: "Rebecca Ross" },
      { id: 704, title: "Project Hail Mary", author: "Andy Weir" },
      { id: 705, title: "The Silent Patient", author: "Alex Michaelides" }
    ],
    nonfiction: [
      { id: 801, title: "Sapiens", author: "Yuval Noah Harari" },
      { id: 802, title: "Educated", author: "Tara Westover" },
      { id: 803, title: "Becoming", author: "Michelle Obama" },
      { id: 804, title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot" },
      { id: 805, title: "Freakonomics", author: "Steven Levitt" }
    ],
    textbooks: [
      { id: 901, title: "Calculus Early Transcendentals", author: "James Stewart" },
      { id: 902, title: "Campbell Biology", author: "Jane Reece" },
      { id: 903, title: "Principles of Economics", author: "Gregory Mankiw" },
      { id: 904, title: "Introduction to Algorithms", author: "Thomas Cormen" },
      { id: 905, title: "Organic Chemistry", author: "Paula Bruice" }
    ],
    children: [
      { id: 1001, title: "The Cat in the Hat", author: "Dr. Seuss" },
      { id: 1002, title: "Where the Wild Things Are", author: "Maurice Sendak" },
      { id: 1003, title: "Goodnight Moon", author: "Margaret Wise Brown" },
      { id: 1004, title: "The Very Hungry Caterpillar", author: "Eric Carle" },
      { id: 1005, title: "Green Eggs and Ham", author: "Dr. Seuss" }
    ],
    comics: [
      { id: 1101, title: "Spider-Man: Into the Spider-Verse", author: "Marvel Comics" },
      { id: 1102, title: "Batman: The Dark Knight Returns", author: "Frank Miller" },
      { id: 1103, title: "Watchmen", author: "Alan Moore" },
      { id: 1104, title: "The Walking Dead Vol. 1", author: "Robert Kirkman" },
      { id: 1105, title: "X-Men: Days of Future Past", author: "Chris Claremont" }
    ],
    bestsellers: [
      { id: 1201, title: "It Ends with Us", author: "Colleen Hoover" },
      { id: 1202, title: "The Thursday Murder Club", author: "Richard Osman" },
      { id: 1203, title: "The Silent Patient", author: "Alex Michaelides" },
      { id: 1204, title: "Gone Girl", author: "Gillian Flynn" },
      { id: 1205, title: "The Girl on the Train", author: "Paula Hawkins" }
    ]
  };
  
  const promoData = [
    {
      title: "🎧 Audiobook Paradise",
      price: "Starting at ₹99 Only",
      subtitle: "Listen Anywhere, Anytime",
      code: "CODE: AUDIO99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=300&fit=crop&auto=format&q=80",
      badge: "HOT DEAL",
      bgColor: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)"
    },
    {
      title: "🎓 Student Special",
      price: "Extra 40% OFF on Textbooks",
      subtitle: "Academic Year Sale - Don't Miss!",
      code: "CODE: STUDENT40",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=300&fit=crop&auto=format&q=80",
      badge: "STUDENT OFFER",
      bgColor: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    {
      title: "📚 Mega Book Sale!",
      price: "Up to 70% OFF",
      subtitle: "Limited Time Offer - Shop Now!",
      code: "CODE: MEGA70",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=300&fit=crop&auto=format&q=80",
      badge: "BESTSELLER",
      bgColor: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)"
    },
    {
      title: "📖 Digital Library Access",
      price: "Unlimited Reading ₹299/month",
      subtitle: "10,000+ Books at Your Fingertips",
      code: "CODE: DIGITAL50",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=300&fit=crop&auto=format&q=80",
      badge: "PREMIUM",
      bgColor: "linear-gradient(135deg, #a8e6cf 0%, #88d8c0 100%)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % promoData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [promoData.length]);
  const trendingBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: 399,
      originalPrice: 699,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop&auto=format&q=80",
      rating: 4.9
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 449,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop&auto=format&q=80",
      rating: 4.8
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 299,
      originalPrice: 599,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop&auto=format&q=80",
      rating: 4.7
    },
    {
      id: 4,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      price: 349,
      originalPrice: 649,
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop&auto=format&q=80",
      rating: 4.6
    }
  ];

  const quickCategories = [
    { name: "Fiction", icon: "📚", color: "#FF6B6B" },
    { name: "Business", icon: "💼", color: "#4ECDC4" },
    { name: "Self Help", icon: "🌟", color: "#45B7D1" },
    { name: "Romance", icon: "💝", color: "#F7DC6F" },
    { name: "Mystery", icon: "🔍", color: "#BB8FCE" },
    { name: "Biography", icon: "👤", color: "#85C1E9" }
  ];

  return (
    <div className="homepage">
      {/* Category Navigation */}
      <section className="category-navigation" style={{display: 'none'}}>
        <div className="category-container">
          <div className="category-nav-row">
            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('books')}
                 onMouseLeave={() => setActiveDropdown(null)}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=64&h=80&fit=crop&auto=format&q=80" alt="Books" />
                <div className="category-label">
                  <span>Books</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'books' && (
                <div className="dropdown-menu">
                  {categoryData.books.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={(e) => { e.stopPropagation(); window.location.href = `/book/${book.id}`; }}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('ebooks')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'ebooks' ? null : 'ebooks')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=64&h=80&fit=crop&auto=format&q=80" alt="E-books" />
                <div className="category-label">
                  <span>E-books</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'ebooks' && (
                <div className="dropdown-menu">
                  {categoryData.ebooks.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('audiobooks')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'audiobooks' ? null : 'audiobooks')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=80&fit=crop&auto=format&q=80" alt="Audiobooks" />
                <div className="category-label">
                  <span>Audiobooks</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'audiobooks' && (
                <div className="dropdown-menu">
                  {categoryData.audiobooks.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('novels')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'novels' ? null : 'novels')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=64&h=80&fit=crop&auto=format&q=80" alt="Novels" />
                <div className="category-label">
                  <span>Novels</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'novels' && (
                <div className="dropdown-menu">
                  {categoryData.novels.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('fiction')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'fiction' ? null : 'fiction')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=64&h=80&fit=crop&auto=format&q=80" alt="Fiction" />
                <div className="category-label">
                  <span>Fiction</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'fiction' && (
                <div className="dropdown-menu">
                  {categoryData.fiction.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('nonfiction')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'nonfiction' ? null : 'nonfiction')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=64&h=80&fit=crop&auto=format&q=80" alt="Non-Fiction" />
                <div className="category-label">
                  <span>Non-Fiction</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'nonfiction' && (
                <div className="dropdown-menu">
                  {categoryData.nonfiction.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('textbooks')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'textbooks' ? null : 'textbooks')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=64&h=80&fit=crop&auto=format&q=80" alt="Textbooks" />
                <div className="category-label">
                  <span>Textbooks</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'textbooks' && (
                <div className="dropdown-menu">
                  {categoryData.textbooks.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('children')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'children' ? null : 'children')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=64&h=80&fit=crop&auto=format&q=80" alt="Children Books" />
                <div className="category-label">
                  <span>Children Books</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'children' && (
                <div className="dropdown-menu">
                  {categoryData.children.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('comics')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'comics' ? null : 'comics')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=64&h=80&fit=crop&auto=format&q=80" alt="Comics" />
                <div className="category-label">
                  <span>Comics</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'comics' && (
                <div className="dropdown-menu">
                  {categoryData.comics.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="category-nav-item" 
                 onMouseEnter={() => setActiveDropdown('bestsellers')}
                 onMouseLeave={() => setActiveDropdown(null)}
                 onClick={() => setActiveDropdown(activeDropdown === 'bestsellers' ? null : 'bestsellers')}>
              <div className="nav-item-content">
                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=64&h=80&fit=crop&auto=format&q=80" alt="Bestsellers" />
                <div className="category-label">
                  <span>Bestsellers</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>
              {activeDropdown === 'bestsellers' && (
                <div className="dropdown-menu">
                  {categoryData.bestsellers.map(book => (
                    <div key={book.id} className="dropdown-item" onClick={() => window.location.href = `/book/${book.id}`}>
                      <span className="book-title">{book.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-container">
          <div className="promo-card" style={{background: promoData[currentSlide].bgColor}}>
            <div className="promo-left">
              <img src={promoData[currentSlide].image} alt="Promo" key={currentSlide} />
            </div>
            <div className="promo-right" key={`content-${currentSlide}`}>
              <h1>{promoData[currentSlide].title}</h1>
              <p>{promoData[currentSlide].price}</p>
              <p className="promo-subtitle">{promoData[currentSlide].subtitle}</p>
              <div className="promo-code" onClick={() => navigator.clipboard.writeText(promoData[currentSlide].code.split(': ')[1])}>
                {promoData[currentSlide].code}
              </div>
              <div className="promo-logos">
                <span className="promo-logo-text">BookKart</span>
                <span className="promo-lowest-price">{promoData[currentSlide].badge}</span>
              </div>
            </div>
          </div>
          <div className="promo-indicators">
            {promoData.map((_, index) => (
              <button 
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Book Deals Section */}
      <section className="book-deals">
        <div className="container">
          <h2>Best deals on books</h2>
          <div className="deals-container">
            <button className="scroll-btn left" onClick={() => scrollDeals('left')}>
              &#8249;
            </button>
            <div className="deals-grid">
              <div className="deal-item" onClick={() => window.location.href = '/book/201'}>
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=250&fit=crop&auto=format&q=80" alt="Fiction Books" />
                <h3>Fiction Collection</h3>
                <p className="deal-price">From ₹199*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/202'}>
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=250&fit=crop&auto=format&q=80" alt="Bestsellers" />
                <h3>Bestsellers 2024</h3>
                <p className="deal-price">From ₹299</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/203'}>
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=250&fit=crop&auto=format&q=80" alt="Self Help" />
                <h3>Self-Help Books</h3>
                <p className="deal-price">Just ₹149*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/204'}>
                <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=250&fit=crop&auto=format&q=80" alt="Academic" />
                <h3>Academic Books</h3>
                <p className="deal-price">From ₹399*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/205'}>
                <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=250&fit=crop&auto=format&q=80" alt="Children Books" />
                <h3>Children's Books</h3>
                <p className="deal-price">Just ₹99</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/206'}>
                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=250&fit=crop&auto=format&q=80" alt="Biography" />
                <h3>Biography Books</h3>
                <p className="deal-price">From ₹249*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/207'}>
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=250&fit=crop&auto=format&q=80" alt="Romance" />
                <h3>Romance Novels</h3>
                <p className="deal-price">Just ₹179*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/208'}>
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=250&fit=crop&auto=format&q=80" alt="Mystery" />
                <h3>Mystery & Thriller</h3>
                <p className="deal-price">From ₹199*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/209'}>
                <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=250&fit=crop&auto=format&q=80" alt="Science" />
                <h3>Science Books</h3>
                <p className="deal-price">From ₹349*</p>
              </div>
              <div className="deal-item" onClick={() => window.location.href = '/book/210'}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop&auto=format&q=80" alt="History" />
                <h3>History Books</h3>
                <p className="deal-price">Just ₹229*</p>
              </div>
            </div>
            <button className="scroll-btn right" onClick={() => scrollDeals('right')}>
              &#8250;
            </button>
          </div>
        </div>
      </section>

      {/* Book Categories Grid Section */}
      <section className="book-categories-grid">
        <div className="container">
          <div className="categories-row">
            <div className="category-card large">
              <div className="category-header">
                <h3>Shop for Your Reading</h3>
                <button className="category-arrow">›</button>
              </div>
              <div className="category-items">
                <div className="category-item-small" onClick={() => window.location.href = '/book/1'}>
                  <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150&h=150&fit=crop&auto=format&q=80" alt="Self Help" />
                  <div className="item-info">
                    <span className="item-title">Self Help Books</span>
                    <span className="item-discount">Min. 50% Off</span>
                  </div>
                </div>
                <div className="category-item-small" onClick={() => window.location.href = '/book/2'}>
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=150&fit=crop&auto=format&q=80" alt="Fiction" />
                  <div className="item-info">
                    <span className="item-title">Fiction & Literature</span>
                    <span className="item-discount">Min. 40% Off</span>
                  </div>
                </div>
                <div className="category-item-small" onClick={() => window.location.href = '/book/3'}>
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&auto=format&q=80" alt="Business" />
                  <div className="item-info">
                    <span className="item-title">Business Books</span>
                    <span className="item-discount">Min. 60% Off</span>
                  </div>
                </div>
                <div className="category-item-small" onClick={() => window.location.href = '/book/4'}>
                  <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=150&h=150&fit=crop&auto=format&q=80" alt="Academic" />
                  <div className="item-info">
                    <span className="item-title">Academic Books</span>
                    <span className="item-discount">Min. 30% Off</span>
                  </div>
                </div>
                <div className="category-item-small" onClick={() => window.location.href = '/book/5'}>
                  <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=150&h=150&fit=crop&auto=format&q=80" alt="Children" />
                  <div className="item-info">
                    <span className="item-title">Children's Books</span>
                    <span className="item-discount">Min. 45% Off</span>
                  </div>
                </div>
                <div className="category-item-small" onClick={() => window.location.href = '/book/6'}>
                  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&h=150&fit=crop&auto=format&q=80" alt="Biography" />
                  <div className="item-info">
                    <span className="item-title">Biography Books</span>
                    <span className="item-discount">Min. 35% Off</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="category-card medium">
              <div className="category-header">
                <h3>Make your library stylish</h3>
                <button className="category-arrow">›</button>
              </div>
              <div className="category-items-medium">
                <div className="category-item-medium" onClick={() => window.location.href = '/book/7'}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80" alt="Classic Literature" />
                  <div className="item-info">
                    <span className="item-title">Classic Literature</span>
                    <span className="item-discount">Min. 50% Off</span>
                  </div>
                </div>
                <div className="category-item-medium" onClick={() => window.location.href = '/book/8'}>
                  <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop&auto=format&q=80" alt="Science Books" />
                  <div className="item-info">
                    <span className="item-title">Science Books</span>
                    <span className="item-discount">Min. 40% Off</span>
                  </div>
                </div>
                <div className="category-item-medium" onClick={() => window.location.href = '/book/9'}>
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop&auto=format&q=80" alt="Mystery" />
                  <div className="item-info">
                    <span className="item-title">Mystery & Thriller</span>
                    <span className="item-discount">Min. 55% Off</span>
                  </div>
                </div>
                <div className="category-item-medium" onClick={() => window.location.href = '/book/10'}>
                  <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop&auto=format&q=80" alt="Romance" />
                  <div className="item-info">
                    <span className="item-title">Romance Novels</span>
                    <span className="item-discount">Min. 45% Off</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="category-card small">
              <div className="category-content">
                <div className="category-text">
                  <h3>Shop your Reading Needs</h3>
                  <p>with Latest & Trendy Choices</p>
                </div>
                <div className="category-image">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop&auto=format&q=80" alt="Reading" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Categories Banner Section */}
      <section className="book-categories-banner">
        <div className="container">
          <div className="banner-grid">
            <div className="banner-item small" onClick={() => window.location.href = '/book/1'}>
              <div className="banner-content">
                <div className="banner-text">
                  <span className="banner-category">Classic Literature</span>
                  <span className="banner-price">From ₹199</span>
                </div>
                <div className="banner-image">
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=120&fit=crop&auto=format&q=80" alt="Classic Books" />
                </div>
              </div>
            </div>
            
            <div className="banner-item small" onClick={() => window.location.href = '/book/2'}>
              <div className="banner-content">
                <div className="banner-text">
                  <span className="banner-category">Self-help & more</span>
                  <span className="banner-price">From ₹149/Pc</span>
                </div>
                <div className="banner-image">
                  <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=120&h=120&fit=crop&auto=format&q=80" alt="Self Help Books" />
                </div>
              </div>
            </div>
            
            <div className="banner-item small" onClick={() => window.location.href = '/book/3'}>
              <div className="banner-content">
                <div className="banner-text">
                  <span className="banner-category">Academic books</span>
                  <span className="banner-price">From ₹349</span>
                </div>
                <div className="banner-image">
                  <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=120&h=120&fit=crop&auto=format&q=80" alt="Academic Books" />
                </div>
              </div>
            </div>
            
            <div className="banner-item small" onClick={() => window.location.href = '/book/4'}>
              <div className="banner-content">
                <div className="banner-text">
                  <span className="banner-category">Fiction novels</span>
                  <span className="banner-price">From ₹299</span>
                </div>
                <div className="banner-image">
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=120&fit=crop&auto=format&q=80" alt="Fiction Books" />
                </div>
              </div>
            </div>
            
            <div className="banner-item large" onClick={() => window.location.href = '/books/bestsellers'}>
              <div className="banner-content">
                <div className="banner-text">
                  <span className="banner-category">Bestsellers & more</span>
                  <span className="banner-title">Reading clearance sale</span>
                  <span className="banner-price">From ₹199</span>
                </div>
                <div className="banner-image-large">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop&auto=format&q=80" alt="Bestseller Books" />
                </div>
              </div>
            </div>
            
            <div className="banner-item large" onClick={() => window.location.href = '/books/mystery'}>
              <div className="banner-content">
                <div className="banner-text">
                  <span className="banner-category">Mystery, thriller & more</span>
                  <span className="banner-title">Adventure & Mystery</span>
                  <span className="banner-price">From ₹249 <span className="original-price">₹500</span></span>
                </div>
                <div className="banner-image-large">
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=150&fit=crop&auto=format&q=80" alt="Mystery Books" />
                </div>
              </div>
            </div>
            
            <div className="banner-item large brand" onClick={() => window.location.href = '/books/children'}>
              <div className="banner-content">
                <div className="banner-brand">
                  <span className="brand-logo">BookKart</span>
                </div>
                <div className="banner-text">
                  <span className="banner-title">Children's Books</span>
                  <span className="banner-subtitle">50,000+ titles</span>
                  <span className="banner-price">From ₹99 <span className="original-price">₹199</span></span>
                </div>
                <div className="banner-image-large">
                  <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=150&fit=crop&auto=format&q=80" alt="Children Books" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Value Deals Section */}
      <section className="best-value-deals-new">
        <div className="container">
          <div className="deals-layout">
            <div className="deals-left">
              <div className="deals-header">
                <h3>Best Value Deals on Books</h3>
                <button className="deals-arrow">›</button>
              </div>
              <div className="deals-grid">
                <div className="deal-item-value" onClick={() => window.location.href = '/book/11'}>
                  <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=150&h=150&fit=crop&auto=format&q=80" alt="Self Help" />
                  <div className="deal-info">
                    <span className="deal-title">Self Help Collection</span>
                    <span className="deal-offer">Special offer</span>
                  </div>
                </div>
                <div className="deal-item-value" onClick={() => window.location.href = '/book/12'}>
                  <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=150&h=150&fit=crop&auto=format&q=80" alt="Fiction" />
                  <div className="deal-info">
                    <span className="deal-title">Fiction Bestsellers</span>
                    <span className="deal-offer">Min. 70% Off</span>
                  </div>
                </div>
                <div className="deal-item-value" onClick={() => window.location.href = '/book/1'}>
                  <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&auto=format&q=80" alt="Business" />
                  <div className="deal-info">
                    <span className="deal-title">Business & Finance</span>
                    <span className="deal-offer">Min. 60% Off</span>
                  </div>
                </div>
                <div className="deal-item-value" onClick={() => window.location.href = '/book/2'}>
                  <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=150&h=150&fit=crop&auto=format&q=80" alt="Academic" />
                  <div className="deal-info">
                    <span className="deal-title">Academic Books</span>
                    <span className="deal-offer">Min. 50% Off</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="deals-right">
              <div className="featured-deal">
                <div className="featured-badge">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format&q=80" alt="BookKart" />
                </div>
                <div className="featured-content">
                  <h2>Top Selling Books</h2>
                  <p>Latest Releases, Best Authors</p>
                  <div className="featured-books">
                    <div className="featured-book" onClick={() => window.location.href = '/book/3'}>
                      <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=250&fit=crop&auto=format&q=80" alt="Book 1" />
                    </div>
                    <div className="featured-book" onClick={() => window.location.href = '/book/4'}>
                      <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=250&fit=crop&auto=format&q=80" alt="Book 2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Books Section */}
      <section className="smart-gadgets-section">
        <div className="container">
          <h2 className="gadgets-title">Smart books</h2>
          <div className="gadgets-grid">
            <div className="gadget-card" onClick={() => window.location.href = '/book/101'}>
              <div className="gadget-image">
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=150&fit=crop&auto=format&q=80" alt="Bestsellers" />
              </div>
              <div className="gadget-info">
                <h3 className="gadget-name">Bestsellers</h3>
                <p className="gadget-price">From ₹199</p>
              </div>
            </div>
            
            <div className="gadget-card" onClick={() => window.location.href = '/book/102'}>
              <div className="gadget-image">
                <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=150&fit=crop&auto=format&q=80" alt="Fiction Books" />
              </div>
              <div className="gadget-info">
                <h3 className="gadget-name">Fiction Books</h3>
                <p className="gadget-price">From ₹149</p>
              </div>
            </div>
            
            <div className="gadget-card" onClick={() => window.location.href = '/book/103'}>
              <div className="gadget-image">
                <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=150&fit=crop&auto=format&q=80" alt="Self Help Books" />
              </div>
              <div className="gadget-info">
                <h3 className="gadget-name">Self Help Books</h3>
                <p className="gadget-price">From ₹99</p>
              </div>
            </div>
            
            <div className="gadget-card" onClick={() => window.location.href = '/book/104'}>
              <div className="gadget-image">
                <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=200&h=150&fit=crop&auto=format&q=80" alt="Academic Books" />
              </div>
              <div className="gadget-info">
                <h3 className="gadget-name">Academic Books</h3>
                <p className="gadget-price">From ₹299</p>
              </div>
            </div>
            
            <div className="gadget-card" onClick={() => window.location.href = '/book/105'}>
              <div className="gadget-image">
                <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=150&fit=crop&auto=format&q=80" alt="Children Books" />
              </div>
              <div className="gadget-info">
                <h3 className="gadget-name">Children Books</h3>
                <p className="gadget-price">From ₹79</p>
              </div>
            </div>
            
            <div className="gadget-card" onClick={() => window.location.href = '/book/106'}>
              <div className="gadget-image">
                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=150&fit=crop&auto=format&q=80" alt="Biography Books" />
              </div>
              <div className="gadget-info">
                <h3 className="gadget-name">Biography Books</h3>
                <p className="gadget-price">From ₹179</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Stories Brand Directory Section */}
      <section className="brand-directory-section">
        <div className="container">
          <h2 className="directory-title">Top Stories : Brand Directory</h2>
          
          <div className="directory-content">
            <div className="directory-category">
              <h3 className="category-title">MOST SEARCHED FOR ON BOOKKART:</h3>
              <p className="category-text">
                Classic Literature Collection | Modern Fiction Bestsellers | Self-Help & Personal Development | Academic Textbooks & Reference | Children's Fantasy Adventures | Young Adult Romance | Mystery & Thriller Novels | Science Fiction Epics | Historical Fiction Masterpieces | Biography & Memoirs | Business & Leadership Books | Philosophy & Psychology | Poetry Collections | Art & Design Books | Cooking & Recipe Books | Travel & Adventure Guides | Health & Fitness Manuals | Technology & Programming | Language Learning Resources | Religious & Spiritual Texts | Comics & Graphic Novels | Educational Workbooks | Professional Development | Creative Writing Guides | Mathematics & Science | Engineering Handbooks | Medical Reference Books | Law & Legal Studies | Economics & Finance | Political Science | Sociology & Anthropology | Environmental Studies | Architecture & Urban Planning
              </p>
            </div>

            <div className="directory-category">
              <h3 className="category-title">PUBLISHERS:</h3>
              <p className="category-text">
                Penguin Random House | HarperCollins Publishers | Simon & Schuster | Macmillan Publishers | Hachette Book Group | Scholastic Corporation | Oxford University Press | Cambridge University Press | McGraw-Hill Education | Pearson Education | Wiley Publishing | Springer Nature | Elsevier | Taylor & Francis | SAGE Publications | Bloomsbury Publishing | Faber & Faber | Vintage Books | Doubleday | Knopf Publishing | Little Brown & Company | Crown Publishing | Bantam Books | Dell Publishing | Tor Books | Orbit Books | Ace Books | DAW Books | Baen Books | Angry Robot | Subterranean Press | Night Shade Books | Small Beer Press | Tachyon Publications | ChiZine Publications | Apex Publications | Clarkesworld Books | Lightspeed Magazine | Asimov's Science Fiction | Analog Science Fiction | Fantasy & Science Fiction Magazine
              </p>
            </div>

            <div className="directory-category">
              <h3 className="category-title">GENRES:</h3>
              <p className="category-text">
                Literary Fiction | Commercial Fiction | Historical Fiction | Science Fiction | Fantasy | Mystery | Thriller | Romance | Young Adult | Middle Grade | Children's Picture Books | Non-Fiction | Biography | Autobiography | Memoir | Self-Help | Business | Health & Fitness | Cooking | Travel | History | Politics | Philosophy | Religion | Science | Technology | Art | Music | Sports | True Crime | Essays | Poetry | Drama | Humor | Reference | Textbooks | Academic | Professional | Technical | How-To Guides | Crafts & Hobbies | Parenting | Relationships | Psychology | Sociology | Anthropology | Economics | Law | Medicine | Engineering | Mathematics | Physics | Chemistry | Biology | Environmental Science | Computer Science | Programming | Web Development | Graphic Design | Photography | Architecture | Interior Design
              </p>
            </div>

            <div className="directory-category">
              <h3 className="category-title">BESTSELLING AUTHORS:</h3>
              <p className="category-text">
                Stephen King | J.K. Rowling | Dan Brown | John Grisham | James Patterson | Agatha Christie | Paulo Coelho | Haruki Murakami | Margaret Atwood | Toni Morrison | Maya Angelou | Ernest Hemingway | F. Scott Fitzgerald | Jane Austen | Charles Dickens | William Shakespeare | Mark Twain | George Orwell | Harper Lee | J.R.R. Tolkien | C.S. Lewis | Roald Dahl | Dr. Seuss | Maurice Sendak | Eric Carle | Shel Silverstein | Beverly Cleary | Judy Blume | R.L. Stine | Rick Riordan | Suzanne Collins | Stephenie Meyer | Cassandra Clare | Sarah J. Maas | Colleen Hoover | Taylor Jenkins Reid | Kristin Hannah | Jodi Picoult | Nicholas Sparks | John Green | Rainbow Rowell | Angie Thomas | Becky Albertalli | Adam Silvera | Jason Reynolds | Kwame Alexander | Jacqueline Woodson | Nic Stone | Elizabeth Acevedo | Ibi Zoboi | Tomi Adeyemi
              </p>
            </div>

            <div className="directory-category">
              <h3 className="category-title">BOOK FORMATS:</h3>
              <p className="category-text">
                Hardcover Books | Paperback Books | Mass Market Paperbacks | Trade Paperbacks | E-books | Audiobooks | Large Print Books | Braille Books | Board Books | Pop-up Books | Interactive Books | Graphic Novels | Comic Books | Manga | Light Novels | Novellas | Short Story Collections | Anthology Collections | Poetry Chapbooks | Art Books | Coffee Table Books | Reference Books | Dictionaries | Encyclopedias | Atlases | Almanacs | Yearbooks | Directories | Handbooks | Manuals | Guides | Workbooks | Textbooks | Study Guides | Test Prep Books | Language Learning Books | Phrase Books | Grammar Books | Writing Guides | Style Manuals | Research Methods | Academic Journals | Conference Proceedings | Dissertations | Theses | White Papers | Technical Reports | Government Publications | Legal Documents | Medical Texts | Scientific Papers
              </p>
            </div>

            <div className="directory-category">
              <h3 className="category-title">SPECIAL COLLECTIONS:</h3>
              <p className="category-text">
                Rare Books | First Editions | Signed Copies | Limited Editions | Collector's Editions | Anniversary Editions | Deluxe Editions | Illustrated Editions | Award Winners | Bestseller Lists | Classic Literature | Contemporary Fiction | Poetry Collections | Biography & Memoirs | History & Politics | Science & Technology | Art & Design | Philosophy & Religion | Self-Help & Wellness | Business & Economics
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;