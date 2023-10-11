const db = require("../db/connection");

exports.selectProjectStack = (projectId) => {
  return db
    .query(
      `SELECT stack.stack_name FROM project_stack
  JOIN projects ON projects.project_id = project_stack.project_id
  JOIN stack ON stack.stack_id = project_stack.stack_id
  WHERE projects.project_id = $1`,
      [projectId]
    )
    .then(({ rows }) => {
      return rows.map((stack) => stack.stack_name);
    });
};
