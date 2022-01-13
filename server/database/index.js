const {Pool} = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'coryzauss',
  database: 'Products',
  password: 'password',
  port: 5432
})

module.exports = pool