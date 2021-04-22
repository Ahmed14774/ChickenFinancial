var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { restart } = require('nodemon');
const db = require('../util/database')

/* GET a transfer by ID. */
router.get('/:transfer_id', function(req, res, next) {
  res.render('index', { title: 'Account' });
});

/* Create new transfer. */
router.post('/', function(req,res) {
  // Create transfer
});

/* Edit a transfer. */
router.put('/:transfer_id', function(req, res) {
  // Transfer can only be edited if it hasn't been authorized
  // VULN: allow users to change account IDs to accounts they don't own
});

/* Delete a transaction. */
router.delete('/:transfer_id', function(req, res) {
  // Transfer can only be deleted if it hasn't been authorized

})

module.exports = router;
