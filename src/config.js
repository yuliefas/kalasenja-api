// eslint-disable-next-line no-underscore-dangle
const _convertDebug = env => (env === 'ON');

module.exports = {
  node: {
    env: process.env.NODE_ENV || 'development', // consider with sequelize (development, test, production)
  },
  api: {
    port: process.env.API_PORT || 3000,
    host: process.env.API_IP || '0.0.0.0',
    secret: process.env.API_SECRET || 'secret-key', // use for salt login
    request: {
      timeout: process.env.API_REQUEST_TIMEOUT || '10s',
    },
  },
  aws: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
    enable: _convertDebug(process.env.AWS_ENABLE),
  },
  file: {
    path: '/tmp',
  },
  frontEnd: {
    baseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost',
  },
  postgres: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
  },
  sentry: {
    url: process.env.SENTRY_URL,
    enable: _convertDebug(process.env.SENTRY_ENABLE),
  },
};
