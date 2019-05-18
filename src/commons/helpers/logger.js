/* eslint-disable max-len */
/**
 * I'm suggest using Winston as our logger
 * Ref: https://github.com/winstonjs/winston/tree/2.x
 * level
 * - (winston.config.cli.levels) for cli and npm levels
 *    - error: LeveledLogMethod;
 *    - warn: LeveledLogMethod;
 *    - help: LeveledLogMethod;
 *    - data: LeveledLogMethod;
 *    - info: LeveledLogMethod;
 *    - debug: LeveledLogMethod;
 *    - prompt: LeveledLogMethod;
 *    - http: LeveledLogMethod;
 *    - verbose: LeveledLogMethod;
 *    - input: LeveledLogMethod;
 *    - silly: LeveledLogMethod;
 *  - (winston.config.syslog.levels) for syslog levels only
 *    - emerg: LeveledLogMethod;
 *    - alert: LeveledLogMethod;
 *    - crit: LeveledLogMethod;
 *    - warning: LeveledLogMethod;
 *    - notice: LeveledLogMethod;
 *
 * transports
 *  It is possible to use multiple transports of the same type e.g. winston.transports.File when you construct the transport.
 *  We can use multiple transport at once.
 *  docs: https://github.com/winstonjs/winston#multiple-transports-of-the-same-type
 */
const {
  createLogger, format, transports, config,
} = require('winston');

const {
  combine, timestamp, prettyPrint,
} = format;

const logger = createLogger({
  level: config.syslog.levels,
  format: combine(
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.File({ // record in log/errors
      filename: 'log/errors.log',
      level: 'info',
    }),
    new transports.Console({ // show in console
      level: 'info',
    }),
  ],
});

module.exports = logger;
