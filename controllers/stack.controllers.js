const { selectProjectStack } = require("../models/stack.model");
const { selectProjectById } = require("../models/projects.models");

exports.getProjectStack = (req, res, next) => {
  const { project_id } = req.params;
  selectProjectById(project_id)
    .then(() => {
      return selectProjectStack(project_id);
    })
    .then((stack) => {
      res.status(200).send({ stack });
    })
    .catch((err) => {
      next(err);
    });
};
