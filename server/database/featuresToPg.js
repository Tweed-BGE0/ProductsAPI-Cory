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
      console.log('BATCHED features')
    }
    //tried to write as modular as possible to easily use on other transfers, but still have to custom split and build temp
    let split = parse(line)

    var id = split[0]
    var product_id = split[1]
    var fabric = split[2]
    var canvas = split[3]

    counter++;
    var temp = `(${id}, '${product_id}', '${fabric}', '${canvas}'),`
    if (split.length <= 4) {
      query += temp
    } else {
     console.log('PROBLEMO:', temp)
    }
  }
  if (counter !==0) {
    query = query.slice( 0, query.length -1)
    db.connectAndQuery(query);
    console.log('last BATCHED features')
  }

}

processLineByLine('/Users/coryzauss/Projects/sdc/Data/features.csv', 'features', ['id', 'product_id', 'fabric', 'canvas']);