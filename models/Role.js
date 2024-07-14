// models/Role.js
const mongoose = require('mongoose');
const baseSchema = require('./BaseSchema');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  menus: [
    {
      type: String,
      required: true,
    },
  ],
});

roleSchema.add(baseSchema); // Extend base schema

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
