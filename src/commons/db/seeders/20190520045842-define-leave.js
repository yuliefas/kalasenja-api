const moment = require('moment');
const uuidv4 = require('uuid/v4');

const start = moment().add(1, 'days').startOf('day').format();
const end = moment().add(4, 'days').endOf('day').format();

const generateRange = arr => `[${arr[0]}, ${arr[1]})`; // '[2019-05-23,2019-05-25)'

const leaves = UserId => ([{
  id: uuidv4(),
  UserId,
  leaveRange: generateRange([
    moment.utc(start).format('YYYY-MM-DD'), // lower (new Date(Date.UTC(2019,04,22)))
    moment.utc(end).format('YYYY-MM-DD'), // upper
  ]),
  leaveTimeRange: generateRange([
    moment.utc(start).format(), // lower 2019-05-22 08:00:00+00 (UTC)
    moment.utc(end).format(), // upper 2019-05-22 12:00:00+00
  ]),
  createdAt: new Date(),
  updatedAt: new Date(),
},
]);


// docs: http://docs.sequelizejs.com/manual/raw-queries.html#replacements
module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.query('SELECT * FROM "Users" WHERE "firstName" = :firstName LIMIT 1', {
    replacements: { firstName: 'Yuli' },
    type: queryInterface.sequelize.QueryTypes.SELECT,
  })
    .then(Users => Users[0]) // get one
    .then(User => queryInterface.bulkInsert('Leaves', leaves(User.id), {})),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Leaves', null, {}),
};
