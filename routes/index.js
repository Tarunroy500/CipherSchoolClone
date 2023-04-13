var express = require("express");
var router = express.Router();
const UserSchema = require("./users");
const bodyParser = require("body-parser");
const passport = require("passport");
var path = require("path");
const multer = require("multer");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
router.use(bodyParser.urlencoded({ extended: false }));
passport.use(
  new LocalStrategy({ usernameField: "email" }, UserSchema.authenticate())
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); // Set the destination folder for storing the uploaded file
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-"  + file.originalname); // Set the filename for the uploaded file
  },
});

// Initialize the multer upload object
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login");
});
router.get("/followers", function (req, res, next) {
  res.render("followers");
});
router.get("/profile", function (req, res, next) {
  // console.log(req.user);
  res.render("profile", { user: req.user });
});
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.post("/register", function (req, res, next) {
  const newUser = new UserSchema({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    profilePhoto:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F606226799816244316%2F&psig=AOvVaw2L6TrrKe2h_XJwzOBglaTf&ust=1681468697208000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPitiZXVpv4CFQAAAAAdAAAAABAE",
  });
  // password=req.body.password;
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
router.post("/update", async function (req, res) {
  var updatedData = req.body;
  var userId = req.user._id; // assuming you have a user session
  console.log(updatedData.firstName);
  // console.log(req.session.passport.user);

  // Update the user's firstName, lastName, email, and phone in the database using the MongoDB driver
  const User = await UserSchema.findByIdAndUpdate(userId, {
    firstName: updatedData.firstName,
    lastName: updatedData.lastName,
    phone: updatedData.phone,
  });
  res.json({ User: updatedData });
});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// router.get('/changepassword', function (req, res) {
//   res.send("hi")
// });

// router.post('/changepassword', async function (req, res) {
//   // console.log(req.body.oldpassword,req.body.newPassword,req.session.passport.user);
//   let User = await UserSchema.findOne({ email: req.user.email })
//   User.changePassword(req.body.oldpassword,req.body.newPassword,function(){
//     res.redirect("/profile")
//   })

// });
router.post("/upload", upload.single("photo"), async function (req, res, next) {
  console.log(req.user.email);
  var User = await UserSchema.findOne({ email: req.user.email });
  console.log(User);
  console.log(req.file);
  User.profilePhoto = "../images/" + req.file.filename;
  await User.save();
  res.send("images uploaded");
});

module.exports = router;
