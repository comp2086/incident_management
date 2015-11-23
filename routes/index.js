var express = require('express');
var router = express.Router();

//grab the index controller
var indexController = require('../controller/index');

/* GET home page. */
router.get('/', indexController.home);

module.exports = router;
