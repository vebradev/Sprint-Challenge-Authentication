const server = require("./../api/server");
const request = require("supertest");
const db = require("./../database/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
});

describe("SERVER ENDPOINTS:", () => {
  it("[GET] /api/jokes - returns 401 if no authorization header is present", () => {
    return request(server)
      .get("/api/jokes")
      .expect(401);
  });

  it("[POST] /api/register - returns 500 on empty POST body", () => {
    return request(server)
      .post("/api/register")
      .expect(500);
  });

  it("[POST] /api/login - returns 401 on wrong credentials", () => {
    return request(server)
      .post("/api/login")
      .send({
        username: "password",
        password: "username"
      })
      .then(res => {
        expect(res.status).toEqual(401);
      });
  });

  it("[POST] /api/register - returns 201 on success register", () => {
    return request(server)
      .post("/api/register")
      .send({
        username: "testy",
        password: "testy"
      })
      .then(res => {
        expect(res.body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          password: expect.any(String),
          username: expect.any(String)
        }));
      });
  });
});
