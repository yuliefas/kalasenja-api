const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const paginate = require('express-paginate');
const timeout = require('connect-timeout');
const cors = require('cors');

const config = require('./config');


/** --- timeout -----------------------------------------------------
 *
 * Times out a request in the Connect/Express application framework
 * docs: https://expressjs.com/en/resources/middleware/timeout.html
 */
app.use(timeout(config.app.request.timeout));

/** --- body parser -----------------------------------------------------
 *
 * Parse incoming request bodies in a middleware before your handlers
 * available under the req.body property.
 * docs: https://www.npmjs.com/package/body-parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

/** --- helmet -----------------------------------------------------
 *
 * Helmet helps you secure your Express apps by setting various HTTP headers.
 * It’s not a silver bullet, but it can help!
 * docs: https://helmetjs.github.io/
 */
app.use(helmet());
// Sets "X-XSS-Protection: 1; mode=block".
app.use(helmet.xssFilter());

/** --- morgan -----------------------------------------------------
 *
 * HTTP request logger middleware for node.js
 * docs: https://www.npmjs.com/package/morgan
 */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

/** --- express paginate -----------------------------------------------------
 *
 * Node.js pagination middleware and view helpers.
 * docs: https://github.com/expressjs/express-paginate
 */
app.use(paginate.middleware());

/** --- cors -----------------------------------------------------
 *
 * CORS is a node.js package for providing a Connect/Express middleware
 * that can be used to enable CORS with various options.
 * docs: https://github.com/expressjs/cors
 */
const corsOptions = {
  optionSuccessStatus: 200, // manage on legacy browsers that always return 204
  preflightContinue: false, // pass the cors preflight response to the next handler
};
app.use(cors(corsOptions));
