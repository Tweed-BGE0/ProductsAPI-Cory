const fs = require('fs')
const path = require('path');


//scan thru && identify errors or correct errors/inconsistant data
// run data thru schemas and store in database


var chunks = 0;

const streamData = fs.createReadStream('/Users/coryzauss/Projects/sdc/Data/products.csv', 'utf8');

streamData.on('data', function(chunk) {
  chunks++
  console.log(chunks)
})

