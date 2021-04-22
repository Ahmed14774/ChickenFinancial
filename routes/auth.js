var express = require('express');
var router = express.Router();
module.exports = router;


/* POST /api/v2/auth/login */
router.post('/api/v2/auth/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST /api/v2/auth/refresh */
router.post('/api/v2/auth/refresh', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST /api/v2/auth/logout */
router.post('/api/v2/auth/logout', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET  /api/v2/auth/history/{userID} */
router.get('/api/v2/auth/history/userID', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

