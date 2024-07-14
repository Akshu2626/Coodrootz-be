// models/BaseSchema.js
const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema({
    isAdmin: { type: String, default: 'user' }
}); // _id: false to avoid duplicate _id fields in extended schemas

module.exports = baseSchema;
