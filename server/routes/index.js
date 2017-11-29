const express = require('express');
const router = express.Router();

// const dbtest = require('./dbtest');
const eventsRoutes = require('./events');

router.use('/', eventsRoutes);

module.exports = router;