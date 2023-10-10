const db = require("../db/connection");

exports.selectAllProjects = () => {
  return db.query(`SELECT * FROM projects;`).then(({ rows }) => rows);
};

exports.selectProjectById = (projectId) => {
  return db
    .query(
      `SELECT * FROM projects
    WHERE project_id = $1;`,
      [projectId]
    )
    .then(({ rows }) => {
      const project = rows[0];
      if (!project) {
        return Promise.reject({
          status: 404,
          msg: "Project ID does not exist",
        });
      } else {
        return project;
      }
    });
};
