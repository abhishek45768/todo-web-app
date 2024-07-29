const { v4: uuidv4 } = require('uuid');

const create = ({ title, description }) => {
  const date = new Date();
  return {
    id: uuidv4(),
    title,
    description,
    completed: false,
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
  };
};

module.exports = {
  create,
};
