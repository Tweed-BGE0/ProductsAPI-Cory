const fs = require('fs')
//scan thru && identify errors or correct errors/inconsistant data
// run data thru schemas and store in database

//
const streamData = fs.createReadStream(__dirname, '../Data/products.csv', utf8);

streamData.on('data', function(chunk) {
  console.log(chunk)

})