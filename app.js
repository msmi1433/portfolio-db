const express = require("express");
const cors = require("cors");
const app = express();

const {
  getAllProjects,
  getProjectById,
  customErrorHandler,
  psqlErrorHandler,
  getProjectStack,
} = require("./controllers");

app.get("/api/projects", getAllProjects);
app.get("/api/projects/:project_id", getProjectById);
app.get("/api/projects/:project_id/stack", getProjectStack);

app.use(customErrorHandler);
app.use(psqlErrorHandler);

module.exports = app;
