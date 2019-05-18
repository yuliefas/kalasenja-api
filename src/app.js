const express = require('express');

const app = express();
const Raven = require('raven');
const http = require('http-status-codes');

const { AppError, NotFoundError } = require('./commons/helpers/errors');

const logger = require('./commons/helpers/logger');

const config = require('./config');


/** --- sentry -----------------------------------------------------
 *
 * Sentry is an Open-source error tracking that helps you monitor and fix crashes in real time.
 * docs: https://docs.sentry.io/clients/node/integrations/express/
 * docs: https://docs.sentry.io/clients/node/usage/
 * docs: https://docs.sentry.io/
 */
if (config.sentry.enable) {
  Raven.config(config.sentry.url).install();
}

/**
 * include add on middleware here
 */
require('./middleware');

/** --- routes ----------------------------------------------------- */
const web = require('./apps/web');
const mobile = require('./apps/mobile');

app.get('/', (req, res) => res.status(200).jsend.success('Kalasenja Api Ready'));

app.use('/web/v1', web.v1);
app.use('/mobile/v1', mobile.v1);

function errorHandler(err, req, res, next) {
  if (!err && !req.timedout) {
    next();
  }

  if (req.timedout) {
    return res.status(http.REQUEST_TIMEOUT).send(err);
  }

  if (err instanceof AppError) {
    // error 500 will capture in sentry
    if (err.errorCode === http.INTERNAL_SERVER_ERROR && config.sentry.enable) {
      Raven.captureException(err, { req });
    }
    logger.log('error', err);
    return res.status(err.errorCode).send(err);
  }

  const error = new AppError(err);
  logger.log('error', error);
  Raven.captureException(error, { req });
  return res.status(error.errorCode).send(error);
}

app.use(errorHandler, (_req, res) => {
  const error = new NotFoundError('Endpoint not found');

  return res.status(error.errorCode).send(error);
});

module.exports = app;
