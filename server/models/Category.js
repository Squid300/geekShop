const mongoose = require('mongoose');

const { Schema } = mongoose;
const Product = require('./Product');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  products: [Product.schema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
