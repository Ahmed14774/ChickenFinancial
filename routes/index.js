var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { restart } = require('nodemon');
const app = require('../app');
const db = require('../util/database')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
