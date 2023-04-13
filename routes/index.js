const express = require("express");
const router = express.Router();
const UserSchema = require("./users");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

router.use(bodyParser.urlencoded({ extended: false }));
passport.use(
  new LocalStrategy({ usernameField: "email" }, UserSchema.authenticate())
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images", (err) => {
      if (err) {
        console.error(err);
        return cb(err);
      }
    });
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname, (err) => {
      if (err) {
        console.error(err);
        return cb(err);
      }
    });
  },
});

// Initialize the multer upload object
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", (req, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/followers", async (req, res, next) => {
  // let loggedinUser= await userSchema.findOne({username:req.session.passport.user})
  let allUser = await UserSchema.find();
  // console.log(allUser);
  res.render("followers", { allUser });
});

router.get("/profile", (req, res, next) => {
  try {
    res.render("profile", { user: req.user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/register", (req, res, next) => {
  try {
    res.render("register");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const newUser = new UserSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    });
    await UserSchema.register(newUser, req.body.password);
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  (req, res, next) => {}
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

router.post('/changepassword', async function (req, res) {
  // console.log(req.body.oldpassword,req.body.newPassword,req.session.passport.user);
  let User = await UserSchema.findOne({ email: req.user.email })
  User.changePassword(req.body.oldpassword,req.body.newPassword,function(){
    res.redirect("/profile")
  })

});
router.post("/upload", upload.single("photo"), async function (req, res, next) {
  console.log(req.user.email);
  var User = await UserSchema.findOne({ email: req.user.email });
  console.log(User);
  console.log(req.file);
  User.profilePhoto = "../images/" + req.file.filename;
  await User.save();
  res.redirect("/profile");
});

module.exports = router;
