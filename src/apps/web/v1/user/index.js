const express = require('express');
const models = require('./../../../../commons/db/models');

const router = express();

const createUser = require('./controllers/createUser');

router.post('/', createUser.validation, createUser.handler);

router.get('/', async (req, res, next) => {
  try {
    const user = await models.User.findAndCountAll({
      includes: [{
        model: models.Leave,
      }],
      paranoid: true, // if false, data delete will be shown (default true)
    });

    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const leaves = await models.User.findOne({
      attributes: ['id', 'firstName'],
      where: {
        id: req.params.userId,
      },
      includes: [{
        model: models.Leave,
      }],
    });

    res.status(200).send({ leaves });
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const users = await models.User.destroy({
      where: {
        id: req.params.userId,
      },
      force: false, // false is soft delete
    });

    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


module.exports = router;
