const {Pool} = require('pg')

const pool = new Pool({
  host: 'ec2-34-224-25-164.compute-1.amazonaws.com',
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