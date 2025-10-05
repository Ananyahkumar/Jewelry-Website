const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  typeOfJewelry: { type: String, required: true },
  preferredMetal: { type: String, required: true },
  budgetRange: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Design', designSchema);