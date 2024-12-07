const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const books = [
    {
        "title": "The Night Circus",
        "authors": "Erin Morgenstern",
        "descrption": "The Night Circus is a phantasmagorical fairy tale set near an ahistorical Victorian London in a wandering magical circus that is open only from sunset to sunrise.",
        "language": "English",
        "category": ["Fantasy"],
        "image_link": "https://covers.openlibrary.org/b/id/7818310-L.jpg",
        "rating": 3,
        "review": "Great Book!"
    },
    {
        "title": "Pachinko",
        "authors": "Min Jin Lee",
        "descrption": "This is a dexcription",
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
    const result = await api.post("/api/users/signup").send({ "username": "Dalenna", "password": "oG3*8Lr&)sDT", "email": "dtute0@stumbleupon.com", "profilePicture": "Fuscia", "bookwormLevel": "68", "favoriteGenres": ["Documentary"], "description": "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est." });
    token = result.body.token;
});

describe("Given there are initially some jobs saved", () => {
    beforeEach(async () => {
        await Book.deleteMany({});
        await Promise.all([
            api
                .post("/api/books")
                .set("Authorization", "bearer " + token)
                .send(books[0]),
            api
                .post("/api/tours")
                .set("Authorization", "bearer " + token)
                .send(books[1]),
        ]);
    });

    it("should return all jobs as JSON when GET /api/jobs is called", async () => {
        await api
            .get("/api/books")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    it("should create a new book when POST /api/books is called", async () => {
        const newBook = {
            "title": "Sapiens: A Brief History of Humankind",
            "authors": "Yuval Noah Harari",
            "descrption": "2014 loreasölkdfjfdsägkljfdg",
            "language": "English",
            "category": ["Non-fiction, History"],
            "image_link": "https://covers.openlibrary.org/b/id/8424236-L.jpg",
            "rating": null,
            "review": null
          };
        await api
            .post("/api/books")
            .set("Authorization", "bearer " + token)
            .send(newBook)
            .expect(201);
    });

    it("should return one book by ID when GET /api/books/:id is called", async () => {
        const book = await Book.findOne();
        await api
            .get("/api/books/" + book._id)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    // it("should update one job by ID when PUT /api/jobs/:id is called", async () => {
    //     const job = await Job.findOne();
    //     const updatedJob = {
    //         title: "Updated job information.",
    //         type: "Part-Time",
    //     };
    //     const response = await api
    //         .put(`/api/jobs/${job._id}`)
    //         .set("Authorization", "bearer " + token)
    //         .send(updatedJob)
    //         .expect(200)
    //         .expect("Content-Type", /application\/json/);

    //     console.log("Response body:", response.body);

    //     const updatedJobCheck = await Job.findById(job._id);
    //     console.log("Updated job:", updatedJobCheck);

    //     expect(updatedJobCheck.title).toBe(updatedJob.title);
    //     expect(updatedJobCheck.type).toBe(updatedJob.type);
    // });


    // it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
    //     const job = await Job.findOne();
    //     await api
    //         .delete("/api/jobs/" + job._id)
    //         .set("Authorization", "bearer " + token)
    //         .expect(204);
    //     const jobCheck = await Job.findById(job._id);
    //     expect(jobCheck).toBeNull();
    // });
});

afterAll(() => {
    mongoose.connection.close();
});