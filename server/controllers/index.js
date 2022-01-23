const models = require('../models')

// handlers that will call the correct database interaction functions

module.exports = {
  getProductsPage: async(req, res) => {
    console.log(req)
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
  },
  verifyLoader: async(req, res) => {
    var key = 'loaderio-7e635ee72bbb8fad0b1b5d979bbdb159'
    res.send(key)
  }
}