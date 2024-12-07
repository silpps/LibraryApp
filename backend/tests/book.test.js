const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const { Book } = require("../models/bookModel");
const User = require("../models/userModel");

const books = [
    {
        "title": "The Night Circus",
        "authors": "Erin Morgenstern",
        "description": "The Night Circus is a phantasmagorical fairy tale set near an ahistorical Victorian London in a wandering magical circus that is open only from sunset to sunrise.",
        "language": "English",
        "category": ["Fantasy"],
        "image_link": "https://covers.openlibrary.org/b/id/7818310-L.jpg",
        "rating": 3,
        "review": "Great Book!"
    },
    {
        "title": "Pachinko",
        "authors": "Min Jin Lee",
        "description": "This is a description",
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
    const signup = await api.post("/bookhive/signup").send({ "username": "Dalenna", "password": "oG3*8Lr&)sDT", "email": "dtute0@stumbleupon.com", "profilePicture": "Fuscia", "bookwormLevel": "68", "favoriteGenres": ["Documentary"], "description": "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est." });
    const login = await api.post("/bookhive/login").send({ "email": "dtute0@stumbleupon.com", "password": "oG3*8Lr&)sDT" });    
    token = login.body.token;
});

describe("Given there are initially some books saved", () => {
    beforeEach(async () => {
        await User.updateOne(
          { email: "dtute0@stumbleupon.com" },
          { $set: { library: books } }
        );
      });

    it("should return all books as JSON when POST /bookhive/library/userLibrary is called", async () => {
        await api
            .post("/bookhive/library/userLibrary")
            .set("Authorization", "bearer " + token)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should create a new book when POST /bookhive/library/userLibrary/addBookToLibrary is called", async () => {
        const newBook = {
            "title": "Sapiens: A Brief History of Humankind",
            "authors": "Yuval Noah Harari",
            "description": "2014 loreasölkdfjfdsägkljfdg",
            "language": "English",
            "category": ["Non-fiction", "History"],
            "image_link": "https://covers.openlibrary.org/b/id/8424236-L.jpg",
            "rating": null,
            "review": null
          };
        await api
            .post("/bookhive/library/userLibrary/addBookToLibrary")
            .set("Authorization", "bearer " + token)
            .send(newBook)
            .expect(201);
    });

    it("should update one book by ID when PUT /bookhive/library/:id is called", async () => {
        const user = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const bookId = user.library[0]._id;
    
        const updatedBook = {
          title: "Updated book information.",
          authors: "Updated Author",
        };
    
        const response = await api
          .put(`/bookhive/library/${bookId}`)
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


    it("should delete one book by ID when DELETE /bookhive/library/:id is called", async () => {
        const user = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const bookId = user.library[0]._id;

        console.log("Book ID:", bookId);

        await api
            .delete("/bookhive/library/" + bookId)
            .set("Authorization", "bearer " + token)
            .expect(204);

        const updatedUser = await User.findOne({ email: "dtute0@stumbleupon.com" });
        const bookCheck = updatedUser.library.id(bookId);
        expect(bookCheck).toBeNull();
    });
});

afterAll(() => {
    mongoose.connection.close();
});