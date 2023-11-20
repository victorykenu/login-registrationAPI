const mongoose = require('mongoose');

// Replace 'your-database-uri' with your MongoDB connection URI
const dbURI = 'mongodb://localhost/blockmolders';

mongoose
  .connect(dbURI)
  .then((e) => {
    console.log(`${e.modelNames()} DB succesfully connected...`);
  })
  .catch((err) => {
    console.error(`Couldnt connect to ${e.modelNames()} DB...`);
  });
module.exports = mongoose;