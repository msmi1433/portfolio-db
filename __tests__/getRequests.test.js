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
            "This project provides the user with an interactive news website, utilising an API created with Express.js and a frontend built with React. The app allows users to read various news articles, with filtering and sorting options available. Users can also interact with articles by voting on them and posting comments. Comments have a votes feature and can be deleted when logged in as the user that posted the comment (user selection is implemented without authentication, currently).",
          project_link: "https://msmi-news.netlify.app/",
          github_link_fe: "https://github.com/msmi1433/msmi-news",
          github_link_be: "https://github.com/msmi1433/nc-news-project",
          image: "/msmi_news.png",
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

describe("GET: /api/projects/:project_id/stack", () => {
  test("200: returns array of correct stack", () => {
    return request(app)
      .get("/api/projects/1/stack")
      .expect(200)
      .then(({ body }) => {
        expect(body.stack).toEqual([
          "JavaScript",
          "PSQL",
          "Express",
          "React",
          "Node",
        ]);
      });
  });
  test("400: errors when project does not exist", () => {
    return request(app)
      .get("/api/projects/5/stack")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Project ID does not exist");
      });
  });
  test("404: errors when unsuitable article id given", () => {
    return request(app)
      .get("/api/projects/banana/stack")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid project ID");
      });
  });
});
describe("GET: projects filtered by stack", () => {
  test("200: returns projects of a specific stack", () => {
    return request(app)
      .get("/api/projects?stack=typescript")
      .expect(200)
      .then(({ body }) => {
        expect(body.projects).toEqual([
          {
            github_link_be: null,
            github_link_fe: "https://github.com/msmi1433/Bookclub",
            project_link: null,
            project_description:
              "Shelf Indulgence is an app-based solution to book clubs, providing users with a digital space to connect with like-minded readers and share their love of literature. The app allows users to create and join book clubs which house a number of features, aiming to replicate the 'real-world' book club experience. Shelf Indulgence was built during the final group project phase of the Northocders bootcamp, and I am planning to refine/add new features to the app moving forward.",
            project_id: 2,
            project_name: "Shelf Indulgence",
            video:
              "https://www.youtube.com/embed/U90IccAHrEU?si=kVtAPF94sJ7SzXon",
            image: null,
          },
        ]);
      });
  });
  test("400: errors when queried stack does not exist", () => {
    return request(app)
      .get("/api/projects?stack=c")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Queried stack does not exist");
      });
  });
});
