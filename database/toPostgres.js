const fs = require('fs')

const lineReader = require('readline')

//scan thru && identify errors or correct errors/inconsistant data
// run data thru schemas and store in database
 var read = lineReader.createInterface({
  input: fs.createReadStream('/Users/coryzauss/Projects/sdc/Data/products.csv', 'utf8')
})

read.on('line', (line) => {
  console.log(line)
  // streams one complete line at a time from the csv files
})


