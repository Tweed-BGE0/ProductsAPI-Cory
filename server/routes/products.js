const controllers = require("../controllers");
var router = require("express").Router();

router.get("/", controllers.getProductsPage);

router.get("/:product_id", controllers.getProductById);

router.get("/:product_id/styles", controllers.getProductStyles);

router.get("/:product_id/related", controllers.getRelatedProductsIds);

router.get(
  "/loaderio-7e635ee72bbb8fad0b1b5d979bbdb159/",
  controllers.verifyLoader
);

module.exports = router;
