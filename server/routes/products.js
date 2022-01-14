const controllers = require('../controllers')
var router = require('express').Router();


router.get('/', controllers.getProductsPage);

router.get('/:product_id', controllers.getProductById);

router.get('/:product_id/styles', controllers.getProductStyles);

router.get('/:product_id/related', controllers.getRelatedProductsIds);


module.exports = router;
