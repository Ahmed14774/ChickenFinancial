var express = require('express');
var router = express.Router();

//This is a test comment
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
