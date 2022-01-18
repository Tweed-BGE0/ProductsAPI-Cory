const fs = require('fs');
const readline = require('readline');
const pool = require('./index.js')
const db = require('../models')
const parse = require('./csvLineParse.js')



async function processLineByLine(path, tableName, columnNames) {
  const fileStream = fs.createReadStream(`${path}`);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  var readHeader = false
  var counter = 0;
  var query = `INSERT INTO ${tableName}(${columnNames.join(',')}) VALUES `;
  console.log(query)

  for await (const line of rl) {
    if (!readHeader) {
      readHeader = true;
      continue;
    }

    if (counter >= 65000) {
      query = query.slice( 0, query.length -1)
      db.connectAndQuery(query)
      query = `INSERT INTO ${tableName}(${columnNames.join(',')}) VALUES `;
      counter = 0;
      console.log('BATCHED styles')
    }
    //tried to write as modular as possible to easily use on other transfers, but still have to custom split and build temp
    let split = parse(line)

    var id = split[0]
    var product_id = split[1]
    var name = split[2]
    var sale_price = split[3].replace(/'/g,'')
    var original_price = split[4]
    var default_style = split[5]
    
    counter++;
    var temp = `(${id}, '${product_id}', '${name}', ${sale_price}, '${original_price}', '${default_style}'),`
    if (split.length <= 6) {
      query += temp
    } else {
     console.log('PROBLEMO:', temp)
    }
  }
  if (counter !==0) {
    query = query.slice( 0, query.length -1)
    db.connectAndQuery(query);
    console.log('last BATCHED style')
  }
}

processLineByLine('../../Data/styles.csv', 'styles', ['id', 'product_id', 'name', 'sale_price', 'original_price','default_style']);

