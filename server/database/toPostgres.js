const fs = require('fs');
const lineReader = require('readline');
const pool = require('./index.js')



//scan thru && identify errors or correct errors/inconsistant data
// run data thru schemas and store in database
 var read = lineReader.createInterface({
  input: fs.createReadStream('/Users/coryzauss/Projects/sdc/Data/products.csv', 'utf8')
})

read.on('line', (line) => {
  let split = line.split(',')
  console.log(split)
  // pool.query


  // streams one complete line at a time from the csv files
})


/*
create: function ({body}) {
    connection = db.connection();
    return new Promise(function(resolve, reject) {
      let sql = `INSERT INTO messages(user_name, text_value, room_name ) VALUES ("${body.username}", "${body.message}", "${body.roomname}" )`;
      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
          connection.end();
        } else {
          console.log('insert sucessful');
          resolve(result);
          connection.end();
        }
      });
    });
  }
};


id serial,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price INT,
  PRIMARY KEY(id)
*/
