# Self-Assessment
Since this Sprint included lots of new components and code, I am only including the 5 parts that I found most interesting or learned the most from.

## Example 1: Re-usable Form component to cater to different needs

### Problem: 
The first version of the form had sections from title to review, which was perfect for library. However, other uses required the rating and review options to be disabled so the user could not set a rating or review to them. We wanted to use the same component instead of makeing multiple almost similar ones.

```
// AddBookForm.jsx
<label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
<label>Author: <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)} /></label>
<label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
<label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
<label>Rating: <input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/></label>
<label>Review: <textarea name="review" onChange={(e) => setReview(e.target.value)}></textarea></label>
<button type="submit">Add Book</button>
                    
```

### Solution:
Adding prop allowRatingAndReview to the AddBookForm component. If it was set true (which is the case for library only), it will only then showcase the Rating and Review Fields.

```
// AddBookForm.jsx
<label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
<label>Author: <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)} /></label>
<label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
<label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
{allowRatingAndReview && (
<>
<label>Rating:<input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/> </label>
<label>Review:<textarea name="review" onChange={(e) => setReview(e.target.value)}></textarea></label>
</>
)}
```

### Key Improvements:
Making the form component more flexible and usable in many different cases within the code. 

## Example 2: Wrong rating data

### Problem: 
When wishlist or readinglist book was added, it would make the rating 0.

```
// AddBookForm.jsx
onAddBook({
        id: Date.now(), 
        title,
        author,
        category,
        language,
        year: parseInt(year, 10),
        rating,
        review,
      });
```

### Solution:
Set review and rating null in code when creating a book for wishlist or readinglist.

```
// AddBookForm.jsx
    if (!allowRatingAndReview) {

    onAddBook({
      id: Date.now(), 
      title,
      author,
      category,
      language,
      year: parseInt(year, 10),
      rating : null,
      review : null,
    });
    } else {
      onAddBook({
        id: Date.now(), 
        title,
        author,
        category,
        language,
        year: parseInt(year, 10),
        rating,
        review,
      });
    }
```
### Lessons Learned:
- Importance of testing with different data/user input: If you test various cases, you'll find things to debug.
- Debugging skills: problem solving and learning how to work around different issues. Seeing how simple fixes can be.


## Example 3: Pagination and Filtering in a Library Component

### Solution:

The Library component implements dynamic filtering and pagination for books.
Pagination splits the book collection into pages of 4 items each.
Filters allow users to refine results by genre and author.
Pagination updates dynamically based on the filtered books.

### Key Improvements:

Dynamic Pagination:
- Automatically calculates the number of pages using Math.ceil() based on the total books.
- The currentPage state ensures smooth navigation across pages.
- 
```
//Library.jsx
const totalPages = Math.ceil(books.length / booksPerPage);

const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};
```

Flexible Filtering:

- Filters by genre or author, or resets both with a single button.
- Filters update dynamically whenever the allBooks list changes.

```
useEffect(() => {
  setBooks(
    allBooks.filter((book) => {
      return (
        (!genreFilter || book.category === genreFilter) &&
        (!authorFilter || book.author === authorFilter)
      );
    })
  );
}, [allBooks, genreFilter, authorFilter]);

```
  
Provides an intuitive way to reset filters and display all books.


```
<button onClick={() => {
    setGenreFilter('');
    setAuthorFilter('');
}}>Reset Filters</button>
```

### Lessons learned:
- State Management for Filters: Managing multiple filters (genre and author) requires careful state management. Using useEffect to update the filtered books state after applying filters prevents unnecessary renders and ensures the UI is always in sync with the data.
- Pagination Logic: When implementing pagination, it's essential to compute the correct range of items to display based on the current page and total pages. The calculation of indexOfLastBook and indexOfFirstBook helps achieve this.

## Example 4: Modularity in Adding and Viewing Book Details

### Solution:

Separate Components: Uses modular components like AddBookForm and BookDetails for specific tasks.
Dynamic Rendering: Conditionally renders modals for adding or viewing details of books, reducing clutter.

### Key Improvements:

Adding New Books:
- Opens a modal with AddBookForm to add new books.
- Dynamically updates the book list and filters after addition.
  
```
//Library.jsx
const addNewBook = (newBook) => {
  if (newBook) {
      setAllBooks([...allBooks, newBook]);
      setNewBookModal(false);
  }
};
```

Viewing Book Details:
- Opens BookDetails modal when a book is selected.
- Enables delete functionality directly from the modal.
```
const handleBookClick = (book) => {
  setSelectedBook(book);
};

<BookDetails
    book={selectedBook}
    onClose={closeSelectedBook}
    onDelete={handleDelete}
/>
```

Modal Management:

- Uses boolean states like newBookModal to toggle modals cleanly.
    
```
const handleAddBook = () => {
  setNewBookModal(true);
};

 ```
### Lesson learned:

- Modal Management for Form Inputs: Managing modal visibility (for adding a new book) with a simple boolean state (newBookModal) is an effective and straightforward approach. However, ensuring that all form fields are properly cleared when the modal is closed can help avoid prefilled data issues on reopening.

- Conditional Rendering of Components: The conditional rendering pattern ({selectedBook && <BookDetails />} ) used to show components only when necessary (like showing the book details when a book is selected) improves performance and user experience by keeping the UI clean and only rendering necessary data.


## Example 5: Edit Profile Button - Mobile vs. Desktop

### Problem: 
We wanted the display of the buttons to be a little different on desktop vs mobile. Desktop all buttons are on the bottom of the page meanwhile on mobile the edit profile button should be right beneath the profile card.

## Solution:
Using two buttons, hiding one of them depending on what the screensize is.

```
    return (
      <div className="profile-page">
        <div className="profile-card-div">
          <ProfileCard username={username} description={description} />
          <Link to="/settings">
          <button className="editbutton">Edit Profile</button>
          </Link>
        </div>
        <div className="recently-added-div">
          <RecentBooks />
        </div>
            <div className="profile-buttons-div">
            <Link to="/settings" className="editbutton-desktop">
              <button>Edit Profile</button>
            </Link>
            <button className = "wishlist-button" onClick={goToWishlist}>Wishlist</button>
            <button className= "library-button" onClick={goToLibrary}>Library</button>
            <button className= "readinglist-button" onClick={goToReadingList}>Reading List</button>
            </div>
      </div>
    );
  };
```

Desktop Button is hidden on smaller screens.


```
// Profile.css
.editbutton {
    display: none;
}

...
@media (max-width: 768px) {
    ...

    .editbutton-desktop{
        display: none;
    }

    .editbutton {
        display: flex;
    }
}

 ```

### Lessons Learned:
- Use of Media Queries to Toggle Button Visibility: Properly using media queries to hide or show elements based on screen width is essential for creating responsive designs. In this case, toggling the visibility of the .editbutton and .editbutton-desktop ensures the edit button is always accessible in a user-friendly manner, regardless of device size.
- Ensuring Usability Across Devices: The visibility toggle of the edit button ensures that the user interface adapts well to different screen sizes and doesn't overwhelm the user with unnecessary buttons. The mobile version of the edit profile button remains close to the profile card, while the desktop version keeps the UI cleaner with the button placed alongside other navigation options on the bottom.
