const pool = require('../database');

module.exports= {
  connectAndQuery: async (query) => {
    try{
      const client = await pool.connect()
      await client.query(query)
      await client.release();
    } catch(err) {
      console.log(' query failed', err)
      throw new Error('query failed')
    }
  }
}

// module.exports = {
//   create:  () => {
//     return new Promise((resolve, reject) => {
//       let sql = 'INSERT INTO ? VALUES (?)'
//     })
//   }
// }


