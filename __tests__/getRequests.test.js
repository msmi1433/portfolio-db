const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test_data");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET: /projects", () => {
  test("200: returns array", () => {
    return request(app)
      .get("/api/projects")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.projects)).toBe(true);
      });
  });
  test("200: returns array of correctly shaped objects", () => {
    return request(app)
      .get("/api/projects")
      .expect(200)
      .then(({ body }) => {
        body.projects.forEach((project) => {
          expect(project).toHaveProperty("project_id");
          expect(project).toHaveProperty("project_name");
          expect(project).toHaveProperty("project_description");
          expect(project).toHaveProperty("github_link_fe");
          expect(project).toHaveProperty("github_link_be");
          expect(project).toHaveProperty("image");
          expect(project).toHaveProperty("video");
        });
      });
  });
});

describe("GET: /project/:project_id", () => {
  test("200: returns a single object of correct shape", () => {
    return request(app)
      .get("/api/projects/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.project).toEqual({
          project_id: 1,
          project_name: "MSMI News",
          project_description:
            "This project provides the user with an interactive news website, utilising an API created with Express.js and a frontend built with React.\n" +
            "The app allows users to read various news articles, with filtering and sort options available. Users can also interact with articles by voting on them and posting comments. Comments have a votes feature and can be deleted when logged in as the user that posted the comment (user selection is implemented without authentication, currently).",
          github_link_fe: "https://github.com/msmi1433/msmi-news",
          github_link_be: "https://github.com/msmi1433/nc-news-project",
          image: null,
          video: null,
        });
      });
  });
  test("200: returns correct article id", () => {
    return request(app)
      .get("/api/projects/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.project.project_id).toBe(2);
      });
  });
  test("400: errors when incorrect article id given", () => {
    return request(app)
      .get("/api/projects/45")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Project ID does not exist");
      });
  });
  test("404: errors when unsuitable article id given", () => {
    return request(app)
      .get("/api/projects/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid project ID");
      });
  });
});
