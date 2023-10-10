const testData = require("../data/test_data");
const seed = require("./seed");
const db = require("../connection");

const runSeed = () => {
  return seed(testData).then(() => db.end());
};

runSeed();
