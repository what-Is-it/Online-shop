const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  article: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
});

const productItem = model("products", productSchema);
module.exports = productItem;
