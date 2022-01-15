const pool = require('../database');

//functions to interact and query with database

module.exports = {
  connectAndQuery: async (query) => {
    try{
      const client = await pool.connect()
      await client.query(query)
      await client.release();
    } catch(err) {
      console.log(' query failed', err)
      throw new Error('query failed')
    }
  },
  getProductsPage: async({page, count}) => {null},
  getProductById: async(id) => {
    const client = await pool.connect()
    try{
      const query = 'SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price FROM products WHERE products.id = $1;'
      const features = 'SELECT features.feature, features.value FROM features WHERE features.product_id = $1'
      const productInfo = await client.query(query, [id])
      const featureInfo = await client.query(features, [id])
      productInfo.rows[0].features = featureInfo.rows
      return productInfo.rows[0];
    } catch(err) {
      console.log(' query failed', err)
      throw new Error('query failed')
    } finally {
      await client.release();
      console.log('closed')
    }
  },
  getProductStyles: async(id) => {null},
  getRelatedProductsIds: async(id) => {null}
}


/*
, features.feature, features.value

JOIN features ON products.id = features.product_id

*/


