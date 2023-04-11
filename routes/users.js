const mongoose = require('mongoose')
const plm=require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/cipherSchools");


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
});
UserSchema.plugin(plm,{usernameField:'email'})
module.exports = mongoose.model("cipherSchools",UserSchema);