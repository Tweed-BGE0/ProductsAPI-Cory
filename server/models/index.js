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
  getProductsPage: async() => {null},
  getProductById: async(id) => {
    const client = await pool.connect()
    try{
      console.log(id)
      const query = 'SELECT id, name, slogan, description, category, default_price FROM products WHERE id = $1 JOIN features;'
      const {rows} = await client.query(query, [id])
      return rows;
    } catch(err) {
      console.log(' query failed', err)
      throw new Error('query failed')
    } finally {
      await client.release();
      console.log('closed')
    }

  },
  getProductStyles: async() => {null},
  getRelatedProductsIds: async() => {null}
}



