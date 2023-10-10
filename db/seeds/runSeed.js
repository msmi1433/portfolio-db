const prodData = require("../data/prod_data");
const seed = require("./seed");
const db = require("../connection");

const runSeed = () => {
  return seed(prodData).then(() => db.end());
};

runSeed();
