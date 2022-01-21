const fs = require('fs');
const readline = require('readline');
const pool = require('./index.js')
const db = require('../models')
const parse = require('./csvLineParse.js')

async function processLineByLine() {
  console.log('START')
  const fileStream = fs.createReadStream('../../Data/products.csv', 'utf8');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var readHeader = false
  var counter = 0;
  var query = 'INSERT INTO products(id, name, slogan, description, category, default_price) VALUES ';

  for await (const line of rl) {

    // Each line in input.txt will be successively available here as line.
    if (!readHeader) {
      readHeader = true;
      continue;
    }

    if (counter >= 65000) {
      console.log('LOOP', query.slice(0, 300))
      query = query.slice( 0, query.length -1)
      try{
        const client = await pool.connect()
        console.log('connected')
        await client.query(query)
        await client.release();
        console.log('Batched products')
      } catch(err) {
        console.log('query failed', err)
        throw new Error('failure')
      }
      query = 'INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ';
      counter = 0;
    }
    let l = line
    l.replace(/'/g, "\\'");
    let split = parse(l.replace('"default_price": ', ''));

    var id = split[0]
    var name =  split[1].replace(/'/g, "''")
    var slogan = split[2].replace(/'/g, "''")
    var description = split[3].replace(/'/g, "''")
    var category = split[4].replace(/'/g, "''")
    var default_price = split[5]

    counter++;
    var temp = `(${id}, '${name}', '${slogan}', '${description}', '${category}', ${default_price}),`
    if (split.length <= 6) {
      // if problem skip record
      query += temp
    } else {
      console.log('PROBLEMO:', temp)
    }
  }
  if (counter !==0) {
    query = query.slice( 0, query.length -1)
     // console.log('QUERY', query)
      try{
        const client = await pool.connect()
        await client.query(query)
        await client.release();
        console.log('last BATCHED product')
      } catch(err) {
        console.log(' q failed', err)
        throw new Error('failure')
      }
      query = 'INSERT INTO products(id, name, slogan, description, category, default_price) VALUES ';
      counter = 0;
  }

}

processLineByLine();



