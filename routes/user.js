var express = require('express');
const db = require('../util/database');
var router = express.Router();


//PATH: /api/v2/user/
//DESC: Returns a complete list of accounts for single userID authenticated with a JWT token.
//NOTE:  
router.get('/', function(req, res, next) {
 
  //Check if JWT token is valid
    //If yes query DB and return account information
    //Else redirect user to login page. 

});


// PATH: /api/v1/user/{UserID} (depricated)
// DESC: Returns a complete list of accounts connected to userID
// NOTE: userID parameter is vulnerable to IDOR
router.get('/:userID', function(req, res, next){
 
  var query = "SELECT * FROM account WHERE userID = ?";
  var value = req.params.userID;
  
  db.get(query, value, (err, results)=>{
    
    //DEBUG STATEMENT 
    console.log(results);

    if(err){
      res.redirect('error', {message: err});
    }
    else{
      res.json(results);
    }
  })
});


module.exports = router;
                    