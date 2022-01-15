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

// app.get('/', (req, res) => {

// })

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})


// set up routes and querys
/*
Retrieves the list of products.
GET /products
Parameter	Type	Description
page	integer	Selects the page of results to return. Default 1.
count	integer	Specifies how many results per page to return. Default 5.
*/

/*
Product Information
Returns all product level information for a specified product id.

GET /products/:product_id

Parameters

Parameter	Type	Description
product_id	integer	Required ID of the Product requested
*/

/*
Product Styles
Returns the all styles available for the given product.

GET /products/:product_id/styles

Parameters

Parameter	Type	Description
product_id	integer	Required ID of the Product requested
*/

/*
Related Products
Returns the id's of products related to the product specified.

GET /products/:product_id/related

Parameters

Parameter	Type	Description
product_id	integer	Required ID of the Product requested
*/