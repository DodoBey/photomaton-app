const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail")
const Joi = require("joi")
const crypto = require('crypto');

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const findUser = asyncHandler(async (req, res) => {

  const searchPattern = new RegExp(req.body.userName, 'gi')
  const user = await User.find({ userName: { $regex: searchPattern } })
  if (user) {
    res.json({ user })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

const forgotPassword = asyncHandler(async (req, res) => {

  const schema = Joi.object({ email: Joi.string().email().required() });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400)
    throw new Error("Email must be valid", 400)
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400)
    throw new Error("User With This Email Adress Does Not Exist")
  }

  let token = await Token.findOne({ userId: user._id, firstName: user.firstName });
  if (!token) {
    token = await new Token({
      userId: user._id,
      firstName: user.firstName,
      token: crypto.randomBytes(32).toString('hex'),
    }).save()
  }

  const link = `${process.env.BASE_URL}/resetpassword/${user._id}/${token.token}`
  await sendEmail(user.email, "Your Password Reset Request", `<h3>Dear ${user.firstName}</h3> <p>Your password reset link is: ${link}</p><p>If you don't request this, please don't take any action.</p>`);

  res.send("You will receive the password reset link in a few minutes. Please don't forget to check you spam.")
})

const resetPassword = asyncHandler(async (req, res) => {

  const schema = Joi.object({ password: Joi.string().required() });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.userId)
  if (!user) {
    res.status(400)
    throw new Error('Invalid Link or Expired')
  };

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token
  })

  if (!token) {
    res.status(400)
    throw new Error('Invalid Link or Expired')
  }

  user.password = req.body.password
  await user.save();
  await token.delete()

  res.send('Password reset succesfully')
})


module.exports = { registerUser, authUser, forgotPassword, resetPassword, findUser };
