const express = require('express');
const axios = require('axios');
const cors = require('cors');
const productsRoutes = require('./routes/products.js');

const PORT = process.env.PORT || 8080 ;

const app = express();
module.exports.app = app

app.use(express.json());

//routes
app.use('/products', productsRoutes);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})


