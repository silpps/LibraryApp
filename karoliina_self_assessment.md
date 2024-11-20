# Self-Assessment
Since this Sprint included lots of new components and code, I am only including the 6 parts that I found most interesting or learned the most from.

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

## Example 3:

### Solution:

### Key Improvements:


   
## Example 4: 

### Solution:



### Lessons Learned:
