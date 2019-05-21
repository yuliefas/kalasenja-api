const uuidv4 = require('uuid/v4');

const Users = [
  {
    id: uuidv4(), firstName: 'Yuli', createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: uuidv4(), firstName: 'Efa', createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: uuidv4(), firstName: 'Suryantoro', createdAt: new Date(), updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', Users, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
