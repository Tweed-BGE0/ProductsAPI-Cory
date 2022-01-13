const pool = require('../database');

// module.exports = {
//   create:  () => {
//     return new Promise((resolve, reject) => {
//       let sql = 'INSERT INTO ? VALUES (?)'
//     })
//   }
// }


/*
// interact with db here
 post: ({body}) => {

    return new Promise ((resolve, reject) => {
      let sql = 'INSERT INTO cows (cow_name, cow_description) VALUES ( ?, ? )'
      db.query(sql, [`${body.name}`,`${body.description}`], (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results);
          console.log('your cow has entered the matrix');
        }
      })
    })
  },
  */