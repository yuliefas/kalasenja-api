const express = require('express');
const codes = require('http-status-codes');

const router = express();

router.get('/', async (_req, res, next) => {
  try {
    return res.status(codes.OK).send('Api web v1 ready!');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
