require('dotenv').config();

const mongoose = require('mongoose');


// DB URL from .env file  

let DB_URL = process.env.MONGO_URL;
mongoose
  .connect(DB_URL, {
    usenewurlparser: true,
    useunifiedtopology: true,
  })
  .then(() => {
    console.log(`connection successful `);
  })
  .catch((err) => {
    console.log(process.env.MONGO_URL);
    console.log(`error connecting to MONGO_URL`, err);
  });

  
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to mongo db'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;