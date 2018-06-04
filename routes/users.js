var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//get ryan's info
router.get('/ryan',function(req, res, next) {
	res.send("Ryan is a project manager");
});

module.exports = router;
