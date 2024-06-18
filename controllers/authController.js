const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", pwd: "" };

  // incorrect email
  if (err.message === "Account does not exist!") {
    errors.email = "Account does not exist!";
    return errors.email;
  }
  // incorrect password
  if (err.message === "Incorrect password") {
    errors.pwd = "Incorrect password";
    return errors.pwd;
  }

  // duplicate error codes
  if (err.code === 11000) {
    errors.email = "Email is already taken!";
    return errors.email;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "ghotona-chitro bangladesh", {
    expiresIn: maxAge,
  });
};

module.exports.post_register = async (req, res) => {
  const { firstName, lastName, email, pwd } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, pwd });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // Keep httpOnly: true for security
    res.status(201).json({ token, user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.post_login = async (req, res) => {
  const { email, pwd } = req.body;

  try {
    const user = await User.login(email, pwd);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      token,
      user: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    console.log(`${user.firstName} ${user.lastName} logged in.`);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
