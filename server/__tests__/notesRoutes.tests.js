/* eslint-env mocha */
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const token = process.env.TEST_USER_TOKEN;

describe("REST API Todo Notes Routes", () => {
  describe("Sending a get request to /ap1/v1/todos/notes without being logged in", () => {
    it("Should respond with a 403 code", (done) => {
      request(app).get("/api/v1/todos/notes").expect(403, done);
    });
  });
});

describe("REST API Todo Notes Routes", () => {
  describe("Sending a get request to /ap1/v1/todos/notes as a logged user", () => {
    it("Should respond with a 201 code", (done) => {
      request(app)
        .get("/api/v1/todos/notes")
        .set({ Authorization: `Bearer ${token}` })
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});
