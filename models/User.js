// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const baseSchema = require('./BaseSchema');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});

userSchema.add(baseSchema); // Extend base schema

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
