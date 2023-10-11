const db = require("../db/connection");

exports.checkStackExists = (stack) => {
  return db
    .query("SELECT * FROM stack WHERE LOWER(stack_name) = $1", [stack])
    .then(({ rows }) => {
      if (!rows.map((row) => row.stack_name.toLowerCase()).includes(stack)) {
        return Promise.reject({
          status: 404,
          msg: "Queried stack does not exist",
        });
      }
      return Promise.resolve;
    });
};
