var express = require('express');
var router = express.Router();

router.use('/user', require('./user'));
router.use('/supplier', require('./supplier'));
router.use('/ticket', require('./ticket'));

module.exports = router;
