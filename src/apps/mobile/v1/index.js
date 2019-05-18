const express = require('express');

const router = express();

router.get('/ping', (_req, res, next) => {
  try {
    res.status(200).send('Api mobile v1 ready!');
  } catch (error) {
    next(error);
  }
});


module.exports = router;
