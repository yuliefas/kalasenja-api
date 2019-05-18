const { postgres } = require('./../../../config');

/**
 *
 * - Configuration
 * docs: http://docs.sequelizejs.com/manual/tutorial/models-definition.html
 * - Application wide model options
 * docs: http://docs.sequelizejs.com/manual/installation/getting-started.html
 */
module.exports = {
  // docs: https://github.com/sequelize/cli/blob/HEAD/docs/README.md
  development: {
    url: postgres.development.url,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
  },
  test: {
    url: postgres.test.url,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
  },
  production: {
    url: postgres.production.url,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  },
};
