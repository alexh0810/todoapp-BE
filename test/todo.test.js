const request = require("supertest");
const app = require("../src/app");
const todos = require("../src/models/todos");


// Test signup route
describe("test signup route", () => {
    test("Should have token returned as body when user is created", async () => {
        const res = await request(app).post("/api/v1/signup").send({
            email: "test_signup1@gmail.com",
            password: "123456"
        }); 
        expect(res.body).toHaveProperty("token");
    })
})

// Test signin route
describe("test signin route", () => {
    test("Should have token returned as body when user is signed in", async () => {
        const res = await request(app).post("/api/v1/signin").send({
            email: "test_signup1@gmail.com",
            password: "123456"
        }); 
        expect(res.body).toHaveProperty("token");
    })
})
