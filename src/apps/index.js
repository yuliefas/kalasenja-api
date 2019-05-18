const express = require('express');

const router = express();

router.get('/', (req, res, next) => {
  try {
    res.status(200).send('Apps ready');
  } catch (error) {
    next(error);
  }
});
