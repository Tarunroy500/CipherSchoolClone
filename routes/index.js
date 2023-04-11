var express = require('express');
var router = express.Router();
const UserSchema = require("./users");
const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy({usernameField:'email'},UserSchema.authenticate()));

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
router.post('/register', function(req, res, next) {
  const newUser = new UserSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  });
  UserSchema.register(newUser, req.body.password).then(function (u) {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res, next) {}
);


module.exports = router;
