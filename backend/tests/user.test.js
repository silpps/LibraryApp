const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

const userData = {
    username: "Dalenna", 
    password: "oG3*8Lr&)sDT", 
    email: "dtute0@stumbleupon.com", 
    profilePicture: "Fuscia", 
    bookwormLevel: "68", 
    favoriteGenres: ["Documentary"], 
    description: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
};

beforeAll(async () => {
    await User.deleteMany({});
});

afterAll(() => {
    mongoose.connection.close();
});

describe("User Routes", () => {
    describe("POST /bookhive/signup", () => {
        it("Should signup a new user with valid credentials", async () => {
            const result = await api.post("/bookhive/signup").send(userData);

            expect(result.status).toBe(201);
        });

        it("Should return error with invalid credentials", async () => {
            const invalidUserData = {
                username: "Dalenna", 
                password: "invalidpassword", 
                email: "dtute0@stumbleupon.com", 
                profilePicture: "Fuscia", 
                bookwormLevel: "68", 
                favoriteGenres: ["Documentary"], 
                description: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est."
            };

            const result = await api.post("/bookhive/signup").send(invalidUserData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });

    describe("POST /bookhive/login", () => {
        it("Should login a user with valid credentials", async () => {
            await api.post("/bookhive/signup").send(userData);
            const loginData = {
                email: "dtute0@stumbleupon.com",
                password: "oG3*8Lr&)sDT",
            };

            const result = await api.post("/bookhive/login").send(loginData);

            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("token");
        });

        it("should return an error with invalid credentials", async () => {
            const userData = {
                email: "test@example.com",
                password: "invalidpassword",
            };

            const result = await api.post("/bookhive/login").send(userData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });
});