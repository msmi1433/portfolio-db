const {
  selectAllProjects,
  selectProjectById,
} = require("../models/projects.models");
const { checkStackExists } = require("./utils.controller");

exports.getAllProjects = (req, res, next) => {
  const { stack } = req.query;

  if (stack) {
    checkStackExists(stack)
      .then(() => {
        selectAllProjects(stack).then((projects) => {
          res.status(200).send({ projects });
        });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    selectAllProjects()
      .then((projects) => {
        res.status(200).send({ projects });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.getProjectById = (req, res, next) => {
  const { project_id } = req.params;
  selectProjectById(project_id)
    .then((project) => {
      res.status(200).send({ project });
    })
    .catch((err) => {
      next(err);
    });
};
