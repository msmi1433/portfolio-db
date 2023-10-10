const format = require("pg-format");
const db = require("../connection");

const seed = ({ projectData, stackData }) => {
  return db
    .query(`DROP TABLE IF EXISTS projects;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS stack;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS project_stack;`);
    })
    .then(() => {
      const projectTablePromise = db.query(`
        CREATE TABLE projects (
            project_id SERIAL PRIMARY KEY,
            project_name VARCHAR,
            project_description VARCHAR,
            github_link_fe VARCHAR,
            github_link_be VARCHAR,
            image VARCHAR,
            video VARCHAR
        );`);

      const stackTablePromise = db.query(`
        CREATE TABLE stack (
            stack_id SERIAL PRIMARY KEY,
            stack_name VARCHAR
        );`);

      return Promise.all([projectTablePromise, stackTablePromise]);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE project_stack (
            project_stack_id SERIAL PRIMARY KEY,
            project_id INT REFERENCES projects(project_id),
            stack_id INT REFERENCES stack(stack_id)
        );`);
    })
    .then(() => {
      const insertProjectsQueryStr = format(
        "INSERT INTO projects (project_name, project_description, github_link_fe, github_link_be, image, video) VALUES %L;",
        projectData.map(
          ({ name, description, githubLinkFe, githubLinkBe, image, video }) => [
            name,
            description,
            githubLinkFe,
            githubLinkBe,
            image,
            video,
          ]
        )
      );
      const projectsPromise = db.query(insertProjectsQueryStr);

      const insertStackQueryStr = format(
        "INSERT INTO stack (stack_name) VALUES %L;",
        stackData
      );
      const stackPromise = db.query(insertStackQueryStr);
      return Promise.all([projectsPromise, stackPromise]);
    })
    .then(() => {
      const projectStackQueryStr = format(
        "INSERT INTO project_stack (project_id, stack_id) VALUES %L;",
        [
          [1, 1],
          [1, 4],
          [1, 7],
          [1, 8],
          [1, 9],
          [2, 2],
          [2, 3],
          [2, 5],
          [2, 6],
          [2, 8],
        ]
      );
      return db.query(projectStackQueryStr);
    });
};

module.exports = seed;
