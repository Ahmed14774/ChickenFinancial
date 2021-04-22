var express = require('express');
const db = require('../util/database');
const jwt = require('jsonwebtoken');
var router = express.Router();
module.exports = router;
var TOKEN_SECRET='youllneverfindthiskey';

/* POST /api/v2/auth/login */
router.post('/login', function(req, res, next) {

  // Get username and password
  var authUser = req.body.username;
  var authPass = req.body.password;

  // Check for credentials
  var sql0 = 'SELECT * FROM user WHERE userName = ? AND password = ?';
  var params0 = [authUser, authPass];

  db.get(sql0, params0, function (err, rows) {
    if (err) {
      console.log("Error at the beg");
      res.render('index', { title: 'Error' });
      return;
    }
    else if(!(rows)) {
      res.render('index', { title: 'Error' });
      return;
    }
    else {
      // Set the JWT tokens
      const token = jwt.sign({username: authUser}, TOKEN_SECRET, { expiresIn: '1800s' });
      res.json(token);
      //res.render('index', { title: 'Success' });
    }
  }); // End of db.get
}); // End of POST login


/* POST /api/v2/auth/refresh */
router.post('/refresh', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST /api/v2/auth/logout */
router.post('/logout', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET  /api/v2/auth/history/{userID} */
router.get('/history/:userID', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

/* POST /api/v1/auth/login */
router.post('/login', function(req, res, next) {

  // Get username and password
  var authUser = req.body.username;
  var authPass = req.body.password;

  // Check for credentials
  sql0 = "SELECT * FROM user WHERE userName = '" + authUser + "' AND password = '" + authPass + "';";

  db.get(sql0, function (err, rows) {
    if (err) {
      res.render('index', { title: 'Error' });
      return;
    }
    else if(!(rows)) {
      res.render('index', { title: 'Error' });
      return;
    }
    else {
      // Set the JWT tokens

      res.render('index', { title: 'Success' });
    }
  }); // End of db.get
}); // End of POST login


/* POST /api/v1/auth/refresh */
router.post('/refresh', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST /api/v1/auth/logout */
router.post('/logout', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET  /api/v1/auth/history/{userID} */
router.get('/history/:userID', function(req, res, next) {
  res.render('index', { title: 'Express' });
});