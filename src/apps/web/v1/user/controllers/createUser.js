const { body, validationResult } = require('express-validator/check');
const { BadRequestError } = require('./../../../../../commons/helpers/errors');

const models = require('./../../../../../commons/db/models');

const handler = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new BadRequestError(errors.array()[0].msg, { validations: errors.array() });
    }

    const users = await models.User.create({ firstName: req.body.firstName });

    return res.status(200).send({ users });
  } catch (error) {
    return next(error);
  }
};

// https://express-validator.github.io/docs/check-api.html
const validation = [
  body('firstName', 'First Name doesn\'t exists').exists(),
];

module.exports = {
  handler,
  validation,
};
