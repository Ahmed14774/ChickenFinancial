var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET /api/v1/user/{UserID} (depricated)  //Get User Profile & Account List Based on Parameter */
//Returns a complete list of accounts connected with the userID variable.
//Vulnerbale to IDOR
router.get('/api/v1/user/:userID', function(req, res, next){

  //Get userID from URL

  //Query SQL database for transactions
  //SELECT * FROM Account WHERE userID =  
  //var query = "SELECT * FROM Account WHERE userID = ?";
  //var value = req.url.userID;
  res.render('error', {message: 'test'});


});

module.exports = router;
                    