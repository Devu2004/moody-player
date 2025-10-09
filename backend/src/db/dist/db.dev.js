"use strict";

var mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    console.log('Connected to MongoDb');
  })["catch"](function (err) {
    console.log('Error: ', err);
  });
}

module.exports = connectToDB;