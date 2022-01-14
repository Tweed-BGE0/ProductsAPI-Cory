const controllers = require('./controllers')
var router = require('express').Router();

// route these endpoints to the correct controller


router.get('/products', controllers.getProducts);

router.get('/products/:product_id', controllers.getById);

router.get('/products/:product_id/styles', controllers.getStyles);

router.get('/products/:product_id/related', controllers.getRelated);


module.exports = router;
