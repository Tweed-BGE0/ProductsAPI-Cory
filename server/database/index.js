const {Pool} = require('pg')

const pool = new Pool({
  host: '172.31.18.241',
  user: 'postgres',
  database: 'products',
  password: 'password',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0
})

// const pool = new Pool({
//   host: 'localhost',
//   user: 'coryzauss',
//   database: 'Products',
//   password: 'password',
//   port: 5432
// })

module.exports = pool