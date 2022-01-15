const models = require('../models')

// handlers that will call the correct database interaction functions

module.exports = {
  getProductsPage: async(req, res) => {
    try{
      const result = await models.getProductsPage(req.query)
      res.status(200).send(result)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  getProductById: async( req, res) => {
    try{
      const result = await models.getProductById(req.params.product_id)
      res.status(200).send(result)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  getProductStyles: async(req, res) => {
    try{
      const result = await models.getProductStyles(req.params.product_id)
      res.status(200).send(result)
    } catch (err) {
      res.status(400).send(err)
    }
  },
  getRelatedProductsIds: async(req, res) => {
    try{
      const result = await models.getRelatedProductsIds(req.params.product_id)
      res.status(200).send(result)
    } catch (err) {
      res.status(400).send(err)
    }
  }
}