const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: [true, "Please enter an email address."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email address."],
  },
  pwd: {
    type: String,
    require: [true, "Please enter a password"],
    minlength: [8, "Minimum password length is 8 characters"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.pwd = await bcrypt.hash(this.pwd, salt);
  next();
});

userSchema.statics.login = async function (email, pwd) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(pwd, user.pwd);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Account does not exist!");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
