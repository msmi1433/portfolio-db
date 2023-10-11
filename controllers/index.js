const {
  customErrorHandler,
  psqlErrorHandler,
} = require("./errorHandlers.controller");
const { getAllProjects, getProjectById } = require("./projects.controller");
const { getProjectStack } = require("./stack.controllers");

module.exports = {
  psqlErrorHandler,
  customErrorHandler,
  getAllProjects,
  getProjectById,
  getProjectStack,
};
