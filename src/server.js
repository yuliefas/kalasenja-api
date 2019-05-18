/* eslint-disable no-console */
const app = require('./app');
const config = require('./config');
// const {
//   sequelize,
// } = require('./commons/db/models');

// const logger = require('./commons/helpers/logger');

// const connectDb = sequelize.authenticate();

app.listen(config.app.port, config.app.ip, () => {
  console.log('========================');
  console.log(`APP_PORT: ${config.app.port}`);
  console.log(`APP_IP: ${config.app.ip}`);
  console.log('========================');
});
// connectDb.then(() => {
//   app.listen(config.app.port, config.app.ip, () => {
//     console.log('========================');
//     console.log(`APP_PORT: ${config.app.port}`);
//     console.log(`APP_IP: ${config.app.ip}`);
//     console.log('========================');
//   });
// }).catch((error) => {
//   logger.error(error);
//   process.exit();
// });
