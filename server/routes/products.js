const controllers = require('../controllers')
var router = require('express').Router();

// route these endpoints to the correct controller


router.get('/', controllers.getProducts);

router.get('/:product_id', controllers.getById);

router.get('/:product_id/styles', controllers.getStyles);

router.get('/:product_id/related', controllers.getRelated);


module.exports = router;
