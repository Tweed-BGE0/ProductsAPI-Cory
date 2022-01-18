const fs = require('fs');
const readline = require('readline');
const pool = require('./index.js')
const db = require('../models')
const parse = require('./csvLineParse.js')




async function processLineByLine(path, tableName, columnNames) {
  console.log(path)
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
    var feature = split[2]
    var value = split[3]

    counter++;
    var temp = `(${id}, '${product_id}', '${feature}', '${value}')`
    if (split.length <= columnNames.length) {
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

processLineByLine('../../Data/features.csv', 'features', ['id', 'product_id', 'feature', 'value']);


/*
  // var temp = `(`

    // for (var i = 0; i < columnNames.length; i++) {
    //   if (split[i] !== null){console.log( typeof split[i].replace(/'/g, ""))}
    //   if (typeof split[i] !== 'number') {
    //     temp += `'${split[i]}',`
    //   } else {
    //     temp += split[i] + ','
    //   }
    //   if ( i === columnNames.length -1) {
    //     temp = temp.slice(0, temp.length-1);
    //     temp += ')'
    //   }

    // }
    // counter++
    // console.log(temp)

    */