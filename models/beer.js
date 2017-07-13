const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  style: { type: String },
  percentage: { type: String },
  description: { type: String },
  image: [{ type: String }]
});

module.exports = mongoose.model('Beer', beerSchema);
