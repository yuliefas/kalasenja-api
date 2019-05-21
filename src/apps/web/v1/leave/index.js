const express = require('express');
const moment = require('moment');
const models = require('./../../../../commons/db/models');

const router = express();

router.post('/', async (_req, res, next) => {
  try {
    const user = await models.User.findOne({
      where: {
        firstName: 'Yuli',
      },
    });

    const leaveRange = [
      moment.utc('2019-05-23').format('YYYY-MM-DD'), // lower 2019-05-22 (new Date(Date.UTC(2019,04,22)))
      moment.utc('2019-05-25').format('YYYY-MM-DD'), // lower 2019-05-22
    ];

    const leaveTimeRange = [
      moment.utc('2019-05-22 08:00').format(), // lower 2019-05-22 08:00:00+00
      moment.utc('2019-05-22 12:00').format(), // upper 2019-05-22 12:00:00+00
    ];

    // -- SELECT * FROM "Leaves" WHERE "leaveTimeRange" @> TIMESTAMPTZ '2019-05-22 11:59:00+00'

    const leaves = await models.Leave.create({
      UserId: user.id,
      leaveRange,
      leaveTimeRange,
    });

    res.status(200).send({ leaves });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const leaves = await models.Leave.findAndCountAll({
      includes: [{
        model: models.User,
      }],
    });

    res.status(200).send({ leaves });
  } catch (error) {
    next(error);
  }
});

router.get('/:leaveId', async (req, res, next) => {
  try {
    const leaves = await models.Leave.findOne({
      where: {
        id: req.params.leaveId,
      },
    });

    res.status(200).send({ leaves });
  } catch (error) {
    next(error);
  }
});

router.delete('/:leaveId', async (req, res, next) => {
  try {
    const leaves = await models.Leave.destroy({
      where: {
        id: req.params.leaveId,
      },
    });

    res.status(200).send({ leaves });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


module.exports = router;
