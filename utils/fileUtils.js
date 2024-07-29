const fs = require('fs');

const readJsonFile = (filePath) => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};
