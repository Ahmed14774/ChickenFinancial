var express = require('express');
const db = require('../util/database');
var router = express.Router();

//This is a test comment
/* GET home page. */
router.get('/:account_id', function(req, res, next) {
  //Add SQL to retrieve account balance and history
  var sql = "select * from account where accountID = ?"
  var params = [req.params.account_id]
  var userID = 0;
  var accountName = "";
  var numEgg = 0;
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    } else if (!row){
        return;
    } else{
        userID = row.userID;
        accountName = row.name;
        numEgg = row.numEgg;
    }
  });

  var sql1 = "select * from transfer where origin = ? or target = ?"
  db.all(sql1, params, (err, rows) => {
      if(err) {
        res.status(400).json({"error": err.message})
        return;
      } else if (!rows){
        return;
      } else {
        res.send(rows)
      }
  });

});

module.exports = router;
