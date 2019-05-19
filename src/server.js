/* eslint-disable no-console */
const app = require('./app');
const config = require('./config');
const { sequelize } = require('./commons/db/models');

const logger = require('./commons/helpers/logger');

const connectDb = sequelize.authenticate();

connectDb.then(() => {
  console.log('===========================');
  console.log('Connection Postgres success');
  console.log('===========================');

  app.listen(config.api.port, config.api.host, () => {
    console.log('===========================');
    console.log(`API_PORT: ${config.api.port}`);
    console.log(`API_HOST: ${config.api.host}`);
    console.log('===========================');
  });
}).catch((error) => {
  logger.error(error);
  process.exit();
});
