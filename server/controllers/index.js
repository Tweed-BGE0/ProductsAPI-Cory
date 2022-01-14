const models = require('../models')

// handlers that will call the correct database interaction functions

module.exports = {
  getProductsPage: async() => {null},
  getProductById: async( req, res) => {
    try{
      const result = await models.getProductById(req.params.product_id)
      res.send(result)
    } catch (err) {
      res.send(err)
    }
  },
  getProductStyles: async() => {null},
  getRelatedProductsIds: async() => {null},
}