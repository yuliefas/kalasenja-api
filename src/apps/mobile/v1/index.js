const express = require('express');

const router = express.Router();

const ping = require('./ping');

router.use('/ping', ping);

module.exports = router;
