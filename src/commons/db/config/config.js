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
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    host: postgres.host,
    port: postgres.port,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    define: {
      timestamps: true,
    },
  },
  test: {
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    host: postgres.host,
    port: postgres.port,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    define: {
      timestamps: true,
    },
  },
  production: {
    username: postgres.username,
    password: postgres.password,
    database: postgres.database,
    host: postgres.host,
    port: postgres.port,
    dialect: 'postgres',
    migrationStorage: 'sequelize',
    seederStorage: 'sequelize',
    // ssl: true,
    // dialectOptions: {
    //   ssl: true,
    // },
    define: {
      timestamps: true,
    },
    //   pool: {
    //     max: 100, // default max pool size 100
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000,
    //   },
  },
};
