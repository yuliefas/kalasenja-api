const express = require('express');

const router = express.Router();

const ping = require('./ping');
const leave = require('./leave');
const user = require('./user');

router.use('/ping', ping);
router.use('/leaves', leave);
router.use('/users', user);

module.exports = router;
