const express = require('express');
const app = express();
const PORT = 3000 ;
const cors = require('cors');
const axios = require('axios');



app.use(express.json())

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})

module.exports = {
  pool:
}