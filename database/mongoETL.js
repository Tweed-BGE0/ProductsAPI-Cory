const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:3000/products');

let featuresSchema = mongoose.Schema({
  _id: 'number',
  product_id: 'number',
  fabric: 'string',
  canvas: 'string'
});

let relatedSchema = mongoose.Schema({
  product_id: 'number',
  current_product_id: 'number',
  related_product_id: 'number'
});

let skusSchema = mongoose.Schema({
  _id: 'number',
  style_id: 'number',
  size: 'string',
  quantity: 'number'
});

let stylesSchema = mongoose.Schema({
  _id: 'number',
  product_id: 'number',
  name: 'string',
  sale_price: 'number',
  original_price: 'number',
  default_style: 'boolean'
});

let photosSchema = mongoose.Schema({
  _id: 'number',
  style_id: 'number',
  url: 'string',
  thumbnail_url: 'number'
});

let productsSchema = mongoose.Schema({
  _id: 'number',
  name: 'string',
  slogan: 'string',
  description: 'string',
  category: 'string',
  default_price: 'number'
});

let Features = mongoose.model('features');
let Related = mongoose.model('related');
let Skus = mongoose.model('skus');
let Styles = mongoose.model('styles');
let Photos = mongoose.model('photos');
let Products = mongoose.model('products');