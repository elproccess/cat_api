const express = require('express'); //Line 1
const cors = require('cors'); //Line
const { ppid } = require('process');
const axios = require('axios');
const { response } = require('express');

const app = express(); //Line 2
app.use(cors()); //Line
app.use(express.json())

const port = process.env.PORT || 3001; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend',async (req, res) => { //Line 9
  await axios
  .get('https://api.thecatapi.com/v1/breeds')
  .then(response => res.send({success : true , response: response.data}))
  .catch(error => res.send({success : false , message: error.message}))
}); 

app.post('/catPage', (req, res) => { //Line 9
  var fileLocation = req.body;
  console.log(fileLocation); 
     //Line 10
  }); 