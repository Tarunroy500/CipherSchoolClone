var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/profile', function(req, res, next) {
  res.render('profile');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});



module.exports = router;
