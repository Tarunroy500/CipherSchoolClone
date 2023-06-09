const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  password: String,
  profilePhoto: {
    type: String,
    default: "https://www.cipherschools.com/static/media/Cipherschools_icon@2x.3b571d743ffedc84d039.png",
  },
});
UserSchema.plugin(plm, { usernameField: "email" });
module.exports = mongoose.model("cipherSchools", UserSchema);
