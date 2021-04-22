var express = require('express');
const db = require('../util/database');
var router = express.Router();

//This is a test comment
/* GET home page. */
router.get('/:account_id', function(req, res, next) {
  //Add SQL to retrieve account balance and history
  var sql = "select * from account where accountID = ?"
  var params = [req.params.account_id]
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    } else if (!rows){
        return;
    } else{
        res.send(rows)
    }
  });
});

module.exports = router;
