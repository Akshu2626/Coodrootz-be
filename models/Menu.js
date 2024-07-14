const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }
});

module.exports = mongoose.model('Menu', menuSchema);
