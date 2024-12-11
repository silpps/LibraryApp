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
    describe("POST /api/users/signup", () => {
        it("Should signup a new user with valid credentials", async () => {
            const result = await api.post("/api/users/signup").send(userData);

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

            const result = await api.post("/api/users/signup").send(invalidUserData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });

    describe("POST /api/users/login", () => {
        it("Should login a user with valid credentials", async () => {
            await api.post("/api/users/signup").send(userData);
            const loginData = {
                email: "dtute0@stumbleupon.com",
                password: "oG3*8Lr&)sDT",
            };

            const result = await api.post("/api/users/login").send(loginData);

            expect(result.status).toBe(200);
            expect(result.body).toHaveProperty("token");
        });

        it("should return an error with invalid credentials", async () => {
            const userData = {
                email: "test@example.com",
                password: "invalidpassword",
            };

            const result = await api.post("/api/users/login").send(userData);

            expect(result.status).toBe(400);
            expect(result.body).toHaveProperty("error");
        });
    });

    describe("PUT /api/users/change-password", () => {
        let token = null;
      
        beforeAll(async () => {
          // Signup the user and get the token for login
          const signup = await api.post("/api/users/signup").send(userData);
          const loginData = {
            email: "dtute0@stumbleupon.com",
            password: "oG3*8Lr&)sDT",
          };
          const login = await api.post("/api/users/login").send(loginData);
          token = login.body.token;
        });
      
        it("should change the password when the current password is correct", async () => {
          const passwordChangeData = {
            currentPassword: "oG3*8Lr&)sDT",
            newPassword: "NewValidPassword123", 
          };
      
          const result = await api
            .put("/api/users/change-password")
            .set("Authorization", `Bearer ${token}`)
            .send(passwordChangeData);
      
          expect(result.status).toBe(200);
          expect(result.body.message).toBe("Password changed successfully.");
        });
      
        it("should return an error if the current password is incorrect", async () => {
          const passwordChangeData = {
            currentPassword: "incorrectPassword", 
            newPassword: "NewValidPassword123", 
          };
      
          const result = await api
            .put("/api/users/change-password")
            .set("Authorization", `Bearer ${token}`)
            .send(passwordChangeData);
      
          expect(result.status).toBe(400);
          expect(result.body.message).toBe("Current password is incorrect.");
        });
      
        it("should return an error if the new password is invalid (e.g., too weak)", async () => {
          const passwordChangeData = {
            currentPassword: "oG3*8Lr&)sDT", 
            newPassword: "123",
          };
      
          const result = await api
            .put("/api/users/change-password")
            .set("Authorization", `Bearer ${token}`)
            .send(passwordChangeData);
      
          expect(result.status).toBe(400);
        });
      
        it("should return an error if the user is not authenticated", async () => {
          const passwordChangeData = {
            currentPassword: "oG3*8Lr&)sDT",
            newPassword: "NewValidPassword123",
          };
      
          const result = await api
            .put("/api/users/change-password")
            .send(passwordChangeData);
      
          expect(result.status).toBe(401);
        });
      });
});