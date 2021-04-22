var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { restart } = require('nodemon');
const db = require('../util/database');
const { check, validationResult } = require('express-validator');

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
    // Check that transfer belongs to user
    // If success, return data
    res.json({
      "transaction": row
    })
  });
});

/* Create new transfer. */
router.post('/', [
    check('origin', 'Must provide origin account.').isNumeric(),
    check('target', 'Must provide target account.').isNumeric(),
    check('amount', 'Must provide transfer amount.').isNumeric(),
  ], 
  function(req,res) {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ "Errors": errors.array() });
    }

    // TODO: get user_ID from session
    userID = 1;

    query_select = "SELECT userID FROM account WHERE accountID = ?";

    // Check that user owns origin account
    db.get(query_select, [req.body.origin], function (err, result) {
      console.log(result);
      if (err) {
        res.status(400).json({ "Error": err.message });
        return;
      } else {
        if (result.userID != userID) {
          res.json({ "Error": "User does not own origin account." });
          return;
        } else {

          // Check that user owns target account
          db.get(query_select, [req.body.target], function (err, result) {
            if (err) {
              res.status(400).json({ "Error": err.message });
              return;
            } else {
              if (result.userID != userID) {
                res.json({ "Error": "User does not own target account." });
                return;
              } else {

                // Insert the data into the database
                query_insert = "INSERT INTO transfer (origin, target, date, amount, authorized, comment) VALUES (?, ?, ?, ?, ?, ?)";
                transfer_values = [
                  origin = req.body.origin,
                  target = req.body.target,
                  date = new Date(),
                  amount = req.body.amount,
                  authorized = 0,
                  comment = req.body.comment,
                ]
                db.run(query_insert, transfer_values, function (err) {
                  if (err) {
                    res.status(400).json({ "Error": err.message });
                    return;
                  } else {
                    res.json({ 
                      "Success": "Successfully added transfer.",
                      "transfer_id": this.lastID
                    });
                  }
                });
              }
            }
          });
        }
      }
    });
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
