const mongoose = require('mongoose');

let features = mongoose.Schema({
  _id: 'number',
  product_id: 'number',
  fabric: 'string',
  canvas: 'string'
});

let related = mongoose.Schema({
  product_id: 'number',
  current_product_id: 'number',
  related_product_id: 'number'
});

let skus = mongoose.Schema({
  _id: 'number',
  style_id: 'number',
  size: 'string',
  quantity: 'number'
});

let styles = mongoose.Schema({
  _id: 'number',
  product_id: 'number',
  name: 'string',
  sale_price: 'number',
  original_price: 'number',
  default_style: 'boolean'
});

let photos = mongoose.Schema({
  _id: 'number',
  style_id: 'number',
  url: 'string',
  thumbnail_url: 'number'
});

let products = mongoose.Schema({
  _id: 'number',
  product_id: 'number',
  fabric: 'string',
  canvas: 'string'
});