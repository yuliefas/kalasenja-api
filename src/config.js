// eslint-disable-next-line no-underscore-dangle
const _convertDebug = env => (env === 'ON');

module.exports = {
  node: {
    env: process.env.NODE_ENV || 'development', // consider with sequelize (development, test, production)
  },
  app: {
    port: process.env.APP_PORT || 3000,
    ip: process.env.APP_IP || '0.0.0.0',
    secret: process.env.APP_SECRET || 'secret-key', // use for salt login
    request: {
      timeout: process.env.APP_REQUEST_TIMEOUT || '10s',
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
    baseUrl: process.env.FRONTEND_BASE_URL || 'http://wonderlabs.io',
  },
  postgres: {
    development: {
      url: process.env.POSTGRES_DEVELOPMENT_URL || '',
    },
    test: {
      url: process.env.POSTGRES_TEST_URL || '',
    },
    production: {
      url: process.env.POSTGRES_PRODUCTION_URL || '',
    },
  },
  sentry: {
    url: process.env.SENTRY_URL,
    enable: _convertDebug(process.env.SENTRY_ENABLE),
  },
};
