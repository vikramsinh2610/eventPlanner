const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('../config/config');

exports.register = async (req, res) => {

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).json({ msg: 'Username already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  });

  try {
    await user.save();

    const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1h' });
    res.json({ msg: 'User registered successfully', token });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {

  // Check if the username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // Create and sign a JWT
  const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1h' });

  res.json({ token });
};
