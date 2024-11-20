# Self-Assessment
## Example 1: Re-usable Form component to cater to different needs

### Problem: 
The first version of the form had sections from title to review, which was perfect for library. However, other uses required the rating and review options to be disabled so the user could not set a rating or review to them. We wanted to use the same component instead of makeing multiple almost similar ones.

// AddBookForm.jsx
//                <form onSubmit={onAddBook}>
                    <label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
                    <label>Author: <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)} /></label>
                    <label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
                    <label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
                    <label>Rating: <input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/></label>
                    <label>Review: <textarea name="review" onChange={(e) => setReview(e.target.value)}></textarea></label>
                    <button type="submit">Add Book</button>
                    </form>
                    <button onClick={closeModal}>Close</button>
### Solution:
Adding prop allowRatingAndReview to the AddBookForm component. If it was set true (which is the case for library only), it will only then showcase the Rating and Review Fields.

// AddBookForm.jsx
//           <label>Title: <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/></label>
          <label>Author: <input type="text" name="author" onChange={(e) => setAuthor(e.target.value)} /></label>
          <label>Genre: <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /></label>
          <label>Publishing year: <input type="text" name="year" onChange={(e) => setYear(e.target.value)}/></label>
          {allowRatingAndReview && (
            <>
              <label>Rating:<input type="number" name="rating" min="1" max="5" onChange={(e) => setRating(e.target.value)}/> </label>
              <label>Review:<textarea name="review" onChange={(e) => setReview(e.target.value)}></textarea></label>
            </>
          )}

### Key Improvements:
Making the component more flexible and usable in many different settings. This however created a little problem that I will be discussing in example 2.

## Example 2: Wrong rating data

### Problem:

### Solution:



### Lessons Learned:

## Example 1:

### Solution:

### Key Improvements:


   
## Example 2: 

### Solution:



### Lessons Learned:
