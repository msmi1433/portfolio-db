const {
  customErrorHandler,
  psqlErrorHandler,
} = require("./errorHandlers.controller");
const { getAllProjects, getProjectById } = require("./projects.controller");

module.exports = {
  psqlErrorHandler,
  customErrorHandler,
  getAllProjects,
  getProjectById,
};
