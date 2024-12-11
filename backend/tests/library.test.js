const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const User = require("../models/userModel");

const books = [
    {
        "title": "The Night Circus",
        "authors": "Erin Morgenstern",
        "language": "English",
        "category": ["Fantasy"],
        "image_link": "https://covers.openlibrary.org/b/id/7818310-L.jpg",
        "rating": 3,
        "review": "Great Book!"
    },
    {
        "title": "Pachinko",
        "authors": "Min Jin Lee",
        "language": "English",
        "category": ["Historical Fiction"],
        "image_link": "https://covers.openlibrary.org/b/id/7995394-L.jpg",
        "rating": 3,
        "review": null
    },
];

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
    const signup = await api.post("/api/users/signup").send({ "username": "Dalenna",
      password: "oG3*8Lr&)sDT",
      email: "dtute0@stumbleupon.com",
      profilePicture: "Fuscia",
      bookwormLevel: "68",
      favoriteGenres: ["Documentary"],
      description: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
    });
    const login = await api.post("/api/users/login").send({ 
      email: "dtute0@stumbleupon.com",
      password: "oG3*8Lr&)sDT" 
    });    
    token = login.body.token;
});

describe("Given there are initially some books saved", () => {
    beforeEach(async () => {
        await User.updateOne(
          { email: "dtute0@stumbleupon.com" },
          { $set: { library: books } }
        );
      });

    it("should return all books as JSON when GET /api/library/userLibrary is called", async () => {
        await api
            .get("/api/library/userLibrary")
            .set("Authorization", "bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should return filtered books as JSON when GET /api/library/userLibrary is called", async () => {
      await api
          .get("/api/library/userLibrary")
          .query({ category: "Fantasy" })
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
  });

    it("should create a new book when POST /api/library/userLibrary/addBookToLibrary is called", async () => {
        const newBook = {
            title: "Sapiens: A Brief History of Humankind",
            authors: "Yuval Noah Harari",
            language: "English",
            category: ["Non-fiction", "History"],
            image_link: "https://covers.openlibrary.org/b/id/8424236-L.jpg",
            rating: null,
            review: null
          };
        await api
            .post("/api/library/userLibrary/addToLibrary")
            .set("Authorization", "bearer " + token)
            .send(newBook)
            .expect(201);
    });

    it("should update one book by ID when PUT /api/library/userLibrary/:bookId is called", async () => {
        const user = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const bookId = user.library[0]._id;
    
        const updatedBook = {
          title: "Updated book information.",
          authors: "Updated Author",
        };
    
        const response = await api
          .put(`/api/library/userLibrary/${bookId}`)
          .set("Authorization", "bearer " + token)
          .send(updatedBook)
          .expect(200)
          .expect("Content-Type", /application\/json/);
    
        console.log("Response body:", response.body);
    
        const updatedUser = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const updatedBookCheck = updatedUser.library.id(bookId);
        console.log("Updated book:", updatedBookCheck);
    
        expect(updatedBookCheck.title).toBe(updatedBook.title);
        expect(updatedBookCheck.authors).toBe(updatedBook.authors);
      });


    it("should delete one book by ID when DELETE /api/library/userLibrary/:id is called", async () => {
        const user = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const bookId = user.library[0]._id;

        console.log("Book ID:", bookId);

        await api
          .delete(`/api/library/userLibrary/${bookId}`)
            .set("Authorization", "bearer " + token)
            .expect(204);

        const updatedUser = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const bookCheck = updatedUser.library.id(bookId);
        expect(bookCheck).toBeNull();
    });

    it("should return categories and authors as JSON when GET /api/library/filter/wish is called", async () => {
      await api
          .get("/api/library/filter/lib")
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
    mongoose.connection.close();
});