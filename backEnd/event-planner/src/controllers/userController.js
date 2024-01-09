const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {

  console.log("testtt", req.body.username);

  // const existingUser = await User.findOne({ username: req.body.username });
  // if (existingUser) {
  //   return res.status(400).json({ msg: 'Username already exists' });
  // }
  // else {
  //   console.log("test 123");
  // }


  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);


  // const password = 'user_password';
  // const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt

  // Hash the password using pbkdf2Sync
  // const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  // console.log('Hashed Password:', hashedPassword);
  // console.log('Salt:', salt);

  // const user = new User({
  //   username: req.body.username,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   password: hashedPassword,
  //   avatar: req.body.avatar
  // });

  // console.log("user", user);

  // try {
  //   await user.save();

  //   const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1h' });
  //   res.json({ msg: 'User registered successfully', token });

  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send('Server Error');
  // }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


