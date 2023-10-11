const db = require("../db/connection");

exports.selectAllProjects = (stack = undefined) => {
  if (stack) {
    return db
      .query(
        `
    SELECT projects.project_name, projects.project_description, projects.project_id,
    projects.github_link_be, projects.github_link_fe, projects.image, projects.video FROM project_stack
    JOIN projects ON project_stack.project_id = projects.project_id
    JOIN stack ON project_stack.stack_id = stack.stack_id
    WHERE LOWER(stack_name) = $1`,
        [stack]
      )
      .then(({ rows }) => {
        return rows;
      });
  } else {
    return db.query("SELECT * FROM projects").then(({ rows }) => {
      return rows;
    });
  }
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
