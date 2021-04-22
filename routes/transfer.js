var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { restart } = require('nodemon');
const db = require('../util/database');

/* GET a transfer by ID. */
router.get('/:transfer_id', function(req, res, next) {

  // Create and run query
  query = "SELECT * FROM transfer WHERE transferID = ?";
  
  db.get(query, [req.params.transfer_id], function (err, row) {

    // If error, return
    if (err) {
      res.status(400).json({ "Error": err.message });
      return;
    }

    // If success, return data
    res.json({
      "transaction": row
    })
  });
});

/* Create new transfer. */
router.post('/', function(req,res) {
  // Create transfer
});

/* Edit a transfer. */
router.put('/:transfer_id', function(req, res) {
  // Transfer can only be edited if it hasn't been authorized
  // VULN: allow users to change account IDs to accounts they don't own (per Aaron)
});

/* Delete a transaction. */
router.delete('/:transfer_id', function(req, res) {
  // Transfer can only be deleted if it hasn't been authorized

})

module.exports = router;
