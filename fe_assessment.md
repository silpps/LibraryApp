# Frontend Self Assessment

Frontend focused on user-friendly application with dynamic UI. Following self assessment includes examples of the frontend code.

## Profile

Profile page is designed to display and manage a user's profile information. It integrates with backend APIs to fetch and update user data dynamically. 

```js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import RecentBooks from '../../components/RecentBooks/RecentBooks';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
import BookDetails from '../../modals/BookDetails/BookDetails'; 

import pfp1 from '../../assets/bh_pfp_1.jpg';
import pfp2 from '../../assets/bh_pfp_2.jpg';
import pfp3 from '../../assets/bh_pfp_3.jpg';

const apiUrl = `${REACT_APP_API_URL}`;

const Profile = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [bookwormLevel, setBookwormLevel] = useState(1);
  const [profilePicture, setProfilePicture] = useState('bh_pfp_1');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [recentBooks, setRecentBooks] = useState([]);
  const [update, setUpdate] = useState(true);
  
  const navigate = useNavigate();

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('User data not found. Please log in again.');
        }

        const userData = JSON.parse(userDataString);
        const token = userData.token;

        const res = await fetch(`${apiUrl}/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await res.json();

        setUsername(data.username);
        setDescription(data.description);
        setBookwormLevel(data.library.length);
        setProfilePicture(data.profilePicture || 'bh_pfp_1');
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setUpdate(false);
    fetchProfileData();
  }, [update]);

  const triggerBookUpdate = () => {
    setUpdate(true); 
  };

  // Profile picture selection logic
  const profileImage =
    profilePicture === 'bh_pfp_1' ? pfp1 :
    profilePicture === 'bh_pfp_2' ? pfp2 :
    pfp3;

  // Navigate to different sections
  const goToWishlist = () => {
    navigate('/wishlist');
  };

  const goToLibrary = () => {
    navigate('/library');
  };

  const goToCustomizeProfile = () => {
    navigate('/settings');
  };

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleUpdate = () => {
    closeModal();
    triggerBookUpdate();
  };

  const handleDelete = () => {
    triggerBookUpdate();
    closeModal();
  };

  return (
    <div className="profile-page">
      <h1>{username}'s profile</h1>
      <div className="profile-card-div">
        <ProfileCard 
          username={username} 
          description={description} 
          bookwormLevel={bookwormLevel} 
          profilePicture={profileImage} 
        />
        <button onClick={goToCustomizeProfile}>
          Edit Profile
        </button>
      </div>

      <div className="recently-added-div">
        <RecentBooks books={recentBooks} onBookClick={openBookDetails} onUpdate= {triggerBookUpdate} />
      </div>

      <div className="profile-buttons-div">
        <button onClick={goToLibrary} className="library-button">Library</button>
        <button onClick={goToWishlist} className="wishlist-button">Wishlist</button>
      </div>

      {isModalOpen && (
        <BookDetails
          book={selectedBook}
          onClose={closeModal} 
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Profile;
```

### Positive Aspects 
1. **Component Modularity:**
   The Profile component is well-structured, with subcomponents such as ProfileCard, RecentBooks, and BookDetails handling     specific responsibilities. This promotes reusability and cleaner code.

2. **Dynamic Profile Picture Logic:**
   The profile picture selection logic is straightforward and allows for easy extension to support more images.

3. **Data Fetching:**
   Profile data is fetched on component mount, ensuring the UI is populated dynamically based on the user’s data.

4. **Navigation Integration:**
   Button handlers (goToWishlist, goToLibrary, goToCustomizeProfile) use useNavigate for clean and efficient navigation        between routes.

### Areas for Improvement
1. **State Management:**
   Multiple useState hooks are used for managing state. While this works, a state management solution like useReducer or a     global state library could simplify state logic and improve scalability.

2. **Hardcoded Assets:**
   The profile picture logic hardcodes assets (pfp1, pfp2, pfp3). Using a more dynamic approach (e.g., mapping through an      array of image data) would make it easier to maintain and extend.

3. **Redundant Calls:**
   The update state triggers re-fetching profile data. This approach works but could be optimized by directly updating the     relevant state after specific actions like updating or deleting a book.


## SignUp page and useSignup hook

Following code implements a sign-up functionality using a custom hook.

```js
import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignup';

const SignUp = ({ onLogin }) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    emailValid,
    strongPassword,
    passwordMatch,
    formSubmitted,
    successMessage,
    errorMessage,
    handleSubmit,
  } = useSignUp(onLogin);

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <p className="description">Username</p>
        <input
          {...username}
          placeholder="Enter your username"
          required
        />

        <p className="description">Email</p>
        <input
          {...email}
          placeholder="Enter your email"
          className={emailValid ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !emailValid && (
          <p className="error-message">Please enter a valid email address</p>
        )}

        <p className="description">Password</p>
        <input
          {...password}
          placeholder="Enter your password"
          className={strongPassword ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !strongPassword && (
          <p className="error-message">
            Password must be at least 8 characters long and contain at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </p>
        )}

        <p className="description">Confirm Password</p>
        <input
          {...confirmPassword}
          placeholder="Re-enter your password"
          className={passwordMatch ? 'valid' : 'invalid'}
          required
        />
        {formSubmitted && !passwordMatch && (
          <p className="error-message">Passwords do not match</p>
        )}

        <button type="submit">Sign Up</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p className="sign-up-link">
        Ready to log in? <Link to="/">Log In here</Link>
      </p>
    </div>
  );
};

export default SignUp;
```
```js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../utils/apiConfig';
import useField from './useField'; // Import the useField hook

export default function useSignUp(onLogin) {
  const username = useField('text');
  const email = useField('email');
  const password = useField('password');
  const confirmPassword = useField('password');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[\S]{8,}$/;
    return passwordRegex.test(password);
  };

  const emailValid = validateEmail(email.value);
  const strongPassword = validatePassword(password.value);
  const passwordMatch = password.value === confirmPassword.value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!emailValid || !strongPassword || !passwordMatch) {
      setErrorMessage('Please fix the errors in the form before submitting.');
      return;
    }

    try {
      const newUser = { username: username.value, email: email.value, password: password.value };
      const signupRes = await fetch(`${REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!signupRes.ok) {
        const errorData = await signupRes.json();
        throw new Error(errorData.message || 'Signup failed.');
      }

      // Automatically login the user
      const loginRes = await fetch(`${REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      if (!loginRes.ok) {
        const loginError = await loginRes.json();
        throw new Error(loginError.message || 'Login failed.');
      }

      const loginData = await loginRes.json();
      localStorage.setItem('userData', JSON.stringify(loginData));
      onLogin(true); // Handle login state
      navigate('/customize-profile');
      setSuccessMessage('User created and logged in successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return {
    username,
    email,
    password,
    confirmPassword,
    emailValid,
    strongPassword,
    passwordMatch,
    formSubmitted,
    successMessage,
    errorMessage,
    handleSubmit,
  };
}
```

### Positive Aspects

1. **Reusability:** The use of the custom hook separates sign-up logic from the UI. UseField enhances reusability.
2. **Success and error states:** Managing error and success messages effectively provide clear feedback to user.
3. **Code Organization:** Separating the UI logic in the component and business logic in the custom hook ensures better maintainability

### Areas for Improvement

1. **Reusability:** Reusability could be improved by moving validateEmail and validatePassword function to a utility file for reuse across components
2. **Optimization:** Instead of making two separate API calls (for sign-up and login separately), the backend could return a token directly upon successful registration.

## UseContext

There were multiple attempts to integrate useContext into the project. Unfortunately, this wasn't successful due to challenges in managing state consistency. The following code is a snippet of such an attempt, but it was removed from the final project.

```js
import React, { createContext, useState, useContext } from 'react';
const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);
export const ProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState('bh_pfp_1'); 
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('Enter your description here!');
  const updateProfile = (newUsername, newDescription, newProfilePicture) => {
    setUsername(newUsername);
    setDescription(newDescription);
    setProfilePicture(newProfilePicture);
  };
  return (
    <ProfileContext.Provider value={{ profilePicture, username, description, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
```
```js
import About from './pages/AboutPage/About.jsx';
import Wishlist from './pages/WishlistPage/Wishlist.jsx';
import CustomizeProfile from './pages/CustomizeProfilePage/CustomizeProfile.jsx';

import { ProfileProvider } from './context/ProfileContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isFirstLogin, setIsFirstLogin] = useState(false);

const handleLogIn = (firstLogin = false) => {
    setIsLoggedIn(true);
    setIsFirstLogin(firstLogin);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setIsFirstLogin(false);
    localStorage.removeItem("userData");
    console.log("Logged out ");
  };

return (
 <ProfileProvider>
      <Router>
        <Header isLoggedIn={isLoggedIn} logOut={logOut} />
        <div>
          <Routes>
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route path="/" element={<LogIn onLogin={handleLogIn} />} />
            <Route path="/signup" element={<SignUp onLogin={handleLogIn} />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <LogIn onLogin={handleLogIn} />} />
            <Route path="/settings" element={isLoggedIn ? <CustomizeProfile/> : <LogIn onLogin={handleLogIn} />} />
            <Route path="/customize-profile" element={isFirstLogin ? <CustomizeProfile /> : <LogIn onLogin={handleLogIn} />} />
            <Route path="/library" element={<Library />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LogIn onLogin={handleLogIn} />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ProfileProvider>
  );
}
export default App;
```
The main issue was that the user data, such as the profile picture, was applied globally across all users rather than being tied to a specific user. For instance, changes made to a profile picture would affect every user's profile, not just the currently logged-in user. Despite efforts to resolve this, the code was ultimately removed from the final project and replaced with useEffect and useState. This is definitely something to learn from and will guide future efforts to improve the understanding and proper implementation of useContext.

## Library Page

### Overview
The (`Library`) component is a functional React component that serves as the primary interface for managing a user's library. It integrates several key features, including paginated book retrieval, filtering, and modals for adding and viewing book details. The component efficiently organizes state and logic to provide a cohesive user experience.

---

```
Library.jsx
import React, { useState, useEffect } from 'react';
import Book from '../../components/Book/Book';
import BookDetails from '../../modals/BookDetails/BookDetails';
import AddBookForm from '../../modals/AddBookForm/AddBookForm';
import './Library.css';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = `${REACT_APP_API_URL}`;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBookModal, setNewBookModal] = useState(false);
  const [filters, setFilters] = useState({ category: '', author: '', readingStatus: 'all' });
  const [refreshFilters, setRefreshFilters] = useState(false);
  const booksPerPage = 3;

  const fetchBooks = async () => {
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) throw new Error('Data not found in localstorage (login again?)');
  
      const userData = JSON.parse(userDataString);
      const token = userData.token;
  
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: booksPerPage,
        category: filters.category,
        author: filters.author,
        readingStatus: filters.readingStatus,
      });
  
      const res = await fetch(`${apiUrl}/library/userLibrary?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
  
      const data = await res.json();
      setBooks(data.library); // Backend returns "library" in the response
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  

  useEffect(() => {
    fetchBooks();
  }, [currentPage, filters]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = () => {
    fetchBooks();
    setRefreshFilters(prev => !prev); // Toggle refreshFilters to trigger useEffect in Filter
  };
  const handleUpdate = () => {
    fetchBooks();
    setRefreshFilters(prev => !prev); // Toggle refreshFilters to trigger useEffect in Filter
  };
  const handleBookClick = (book) => setSelectedBook(book);
  const closeSelectedBook = () => setSelectedBook(null);
  const handleAddBook = () => setNewBookModal(true);
  const handleFilterChange = (newFilters) => setFilters(newFilters);

  return (
    <div className="library">
      <h1 className='page-title'>My Library</h1>
      <div className="lib-content">
        <div className="left-div">

          <div className="filters-div">
            <Filter onFilterChange={handleFilterChange} refreshFilters={refreshFilters} />
          </div>
          <div className="profile-div">
            <h2>Go to</h2>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            <Link to="/wishlist">
              <button>Wishlist</button>
            </Link>
          </div>
        </div>

        <div className="books-div">
          <div className="books-div-top">
            <h2>My collection</h2>
            <button className="add-book-btn" onClick={handleAddBook}>
              Add Book
            </button>
          </div>
          <div>
            {books.map((book) => (
              <Book key={book.id} book={book} onClick={() => handleBookClick(book)} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>

        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={closeSelectedBook}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}

        {newBookModal && (
          <AddBookForm
            onAddBook={() => {
              fetchBooks();
              setRefreshFilters(prev => !prev); // Toggle refreshFilters to trigger useEffect in Filter
            }}
            closeModal={() => setNewBookModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Library;
```

### Key Features
1. **Book Management**:
   - Fetches and displays books from a backend API with pagination support.
   - Allows users to view detailed book information, edit and delete books (`BookDetails`) and add new books (`AddBookForm`).

2. **Filtering**:
   - Dynamically filters books based on category, author, and reading status through the `Filter` component.
   - Updates book results when filters are applied.

3. **User Navigation**:
   - Includes quick navigation to "Profile" and "Wishlist" pages via `Link` components.

4. **Dynamic State Management**:
   - React state (`useState`) and lifecycle hooks (`useEffect`) ensure the component is responsive to changes like page navigation or filter updates.

5. **Reusable Components**:
   - Leverages child components like `Book`, `Filter`, and modals, ensuring modularity and reusability across the application.

---

#### Strengths
1. **Modularity**:
   - Splits responsibilities across distinct child components (`Book`, `BookDetails`, `AddBookForm`, and `Filter`), improving maintainability.

2. **Dynamic Data Fetching**:
   - Fetches books from a backend API using query parameters for category, author, and reading status, making the component adaptable to user input.

3. **Error Handling**:
   - Safeguards data fetching with error handling, providing meaningful console feedback for developers.

4. **UI/UX Enhancements**:
   - Pagination and filtering ensures users can easily navigate large book collections.
   - The "Add Book" button and modals offer intuitive interaction for expanding the library.

---

### Areas for Improvement
1. **Error Feedback**:
   - Currently, book fetching errors are logged to the console but not displayed to the user. Including user-facing error messages would enhance clarity.

2. **Pagination Usability**:
   - The pagination interface could include additional controls, such as "First" and "Last" buttons or direct page number links, to improve navigation.

3. **Performance Optimization**:
   - Filtering and pagination could be optimized by caching previously fetched results to reduce redundant API calls.

4. **Responsiveness**:
   - The layout could be better optimized for various screen sizes, particularly the "My Collection" section, ensuring accessibility on smaller devices.

---

### Key Takeaways
The `Library` component is a robust and modular solution for managing a user's book collection. With its dynamic filtering, pagination, and use of modals, it creates an engaging experience. Minor improvements in UI, error visibility in fetching books, and performance could make it even more polished and user-centric. The design effectively balances flexibility and maintainability, making it a strong component for a scalable application.


## Add Book Form

### Overview
The `AddBookForm` component is designed to add books to either the user's library or wishlist. The form dynamically adapts its behavior and visible fields based on the current path, making it reusable in two contexts: `/library` and `/wishlist`. This dynamic behavior enhances code reusability and reduces redundancy, as the same component serves two related but distinct purposes.

---
```
AddBookForm.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AddBookForm.css'
//this is temporary until we decide all the final routing paths etc.
import { REACT_APP_API_URL } from '../../utils/apiConfig';
const apiUrl = ${REACT_APP_API_URL};

const AddBookForm = ({ onAddBook, closeModal }) => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [imageLink, setImageLink] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState(null);
  const [reading, setReadingList] = useState(false);
  const [error, setError] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    // seeing if any of the fields are empty
    let missingFields = [];

    if (!title) missingFields.push('Title');
    if (!authors) missingFields.push('Authors');
    if (!category) missingFields.push('Category');
    if (!language) missingFields.push('Language');

    // if there are missing fields, show an error message
    if (missingFields.length > 0) {
      if (missingFields.length === 1) {
        setError(Please fill in the missing field: ${missingFields[0]});
      } else {
        setError(Please fill in the following fields: ${missingFields.join(', ')});
      }
      return;
    }
    
    setError('');
    //For authorization
    const userDataString = localStorage.getItem("userData")
    if (!userDataString){
      throw new Error("Data not found in localstorage (login again?)")
    }
    //Given data is converted to a JS object
    const userData = JSON.parse(userDataString)
    //Take the id and token from the request
    const id = userData.id

    const categoryArray = category.includes(',')
      ? category.split(',').map(item => item.trim())
      : category;

    const newBook = {
      title,
      authors,
      category: categoryArray,
      language,
      imageLink,
      rating: location.pathname === '/library' ? rating : null,
      review: location.pathname === '/library' ? review : null,
      reading,
      id
    };
    console.log(newBook)
    addBook(newBook);


  };

  const addBook = async (newBook) => {

    //For authorization
    const userDataString = localStorage.getItem("userData")
    if (!userDataString){
      throw new Error("Data not found in localstorage (login again?)")
    }
    
    const userData = JSON.parse(userDataString)
    const token = userData.token

    const path = location.pathname === '/library'
      ? ${apiUrl}/library/userLibrary/addToLibrary
      : ${apiUrl}/library/userWishlist/addToWishlist;


    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' ,
                  "Authorization": Bearer ${token}},
        body: JSON.stringify(newBook),
      });
      if (res.ok) {
        console.log('Book added successfully!');
        onAddBook(newBook); // Call the onAddBook callback
        closeModal();
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const searchBook = async () => {
    try{
      const res = await fetch(https://www.googleapis.com/books/v1/volumes?q=intitle:${title || ''}+inauthor:${authors || ''}&orderBy=relevance&maxResults=10);
      const data = await res.json();
      if (!data.items) {
        throw new Error('No books found');
      } else {
      console.log("data",data);
      const bookData = data.items[0].volumeInfo;
      console.log("book data", bookData);
      setTitle(bookData.title || '');
      setAuthors(bookData.authors[0] || '');
      setLanguage(bookData.language || '');
      setCategory(bookData.categories || '');
      setImageLink(bookData.imageLinks && bookData.imageLinks.thumbnail ? bookData.imageLinks.thumbnail : null);
      setError('');
    }
    } catch (error) {
      setError('No books found from the search');
    }
  };

  const handleStarClick = (rating) => {
    setRating(rating);
  };

return(
  <div className="modal">
    <div className="modal-content">
      <h2>{location.pathname === '/library' ? 'Add to Library' : 'Add to Wishlist'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label><strong>Title: </strong><input type="text" name="title" value={title} maxLength="30" onChange={(e) => setTitle(e.target.value)}/></label>
          <label><strong>Authors: </strong><input type="text" name="authors" value={authors} maxLength="80" onChange={(e) => setAuthors(e.target.value)} /></label>
          <button type="button" onClick={searchBook}>Search</button>
          <label><strong>Language: </strong><input type="text" name="language" value={language} maxLength="30"  onChange={(e) => setLanguage(e.target.value)}/></label>
          <label><strong>category: </strong><input type="text" name="category" value={category} maxLength="60" onChange={(e) => setCategory(e.target.value)} /></label>
          {location.pathname === '/library' && (
            <>
            <label>
              <strong>Add to readinglist: </strong>
              <input type="checkbox" onChange={(e) => setReadingList(e.target.checked)}/></label>
              <label><strong>Rating: </strong>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star ${star <= (hoverRating || rating) ? 'filled' : ''}}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </span>
                  ))}
                </div> </label>
              <label><strong>Review:  </strong><textarea name="review" maxLength="30" onChange={(e) => setReview(e.target.value)}></textarea></label>
            </>
          )}
          <button type="submit">Add Book</button>
        </form>
        <button onClick={closeModal}>Back</button>
    </div>
  </div>
)};

export default AddBookForm; 
```

### Key Features
1. **Dynamic Behavior Based on Path**:
   - The component uses `useLocation` to determine the current path and conditionally displays or processes specific fields (`rating`, `review`, and `readingList`) when on `/library`.
   - The API endpoint is also dynamically set based on the path.

2. **Validation and Error Handling**:
   - Ensures all required fields (`title`, `authors`, `category`, and `language`) are filled before submission.
   - Displays meaningful error messages to guide the user.

3. **External Book Search**:
   - Integrates Google Books API to prepopulate book details, reducing user effort and improving accuracy.

4. **State Management**:
   - Uses `useState` hooks effectively for form inputs and visual feedback (e.g., star ratings, hover states).

5. **Authorization**:
   - Retrieves user information and tokens from local storage to securely interact with backend APIs.

6. **User-Friendly Features**:
   - Includes a star-rating system and a review textarea, enhancing user interaction when adding books to the library.

---

### Strengths
- **Reusability**: The same component works seamlessly across multiple routes, reducing maintenance overhead.
- **Error Feedback**: Provides real-time error feedback for missing fields or search errors, improving user experience.
- **Modular Design**: Separates concerns into functions (`handleSubmit`, `addBook`, `searchBook`), making the code easier to test and debug.
- **Dynamic API Endpoints**: Adapts the backend API paths based on the user's current action.

---

### Areas for Improvement
1. **Code Duplication**:
   - Authorization logic (retrieving token and user data from localStorage) is repeated in both `handleSubmit` and `addBook`. Extracting it into a helper function would improve reusability.

2. **Error Handling**:
   - Error feedback from the backend (e.g., `res.ok` failure) is limited. Providing more detailed messages from the server response would be beneficial.

3. **Performance**:
   - Fetching user data from `localStorage` repeatedly could be optimized by storing it in a context or global state.

4. **Styling**:
   - The styling (e.g., star ratings) could be further enhanced for better visual appeal and responsiveness.

5. **Search Functionality**:
   - The searchBook function only considers the first result from the Google Books API. It could allow the user to select from multiple results.

---

### Key Takeaway
This component demonstrates effective use of React's state management and routing capabilities to create a flexible and user-friendly form. The conditional rendering of fields and functionality based on the path ensures relevance to both contexts (`/library` and `/wishlist`). With minor optimizations in error handling, abstraction, and UI, this component can serve as a robust part of a larger application. 

## A few words from us about the code
In our opinion, some of the code couldve been refactored (into components/hooks for example) but we had very limited time, so our focus was on having all the necessary pages/components functional and ready.




