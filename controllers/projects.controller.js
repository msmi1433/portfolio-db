const {
  selectAllProjects,
  selectProjectById,
} = require("../models/projects.models");

exports.getAllProjects = (req, res, next) => {
  selectAllProjects()
    .then((projects) => {
      res.status(200).send({ projects });
    })
    .catch((err) => next(err));
};

exports.getProjectById = (req, res, next) => {
  const { project_id } = req.params;
  selectProjectById(project_id)
    .then((project) => {
      res.status(200).send({ project });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
