const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Connected to MongoDb');
  })
  .catch((err)=>{
    console.log('Error: ',err);
  })
}

module.exports = connectToDB