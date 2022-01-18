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
      console.log('BATCHED related')
    }
    //tried to write as modular as possible to easily use on other transfers, but still have to custom split and build temp
    let split = parse(line)

    var id = split[0]
    var current_product_id = split[1]
    var related_product_id = split[2]

    counter++;
    var temp = `(${id}, '${current_product_id}', '${related_product_id}'),`

    if (split.length <= 3 && related_product_id !== '0') {
      query += temp
    } else {
     console.log('PROBLEMO:', temp)
    }
  }
  if (counter !==0) {
    query = query.slice( 0, query.length -1)
    db.connectAndQuery(query);
    console.log('last BATCHED related')
  }

}

processLineByLine('../../Data/related.csv', 'related', ['id', 'current_product_id', 'related_product_id']);
