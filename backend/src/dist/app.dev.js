"use strict";

var express = require('express');

var cors = require('cors');

var Songsrouter = require('./routes/Song.routes');

var server = express();
server.use(cors());
server.use(express.json());
server.use('/songs', Songsrouter);
server.get('/', function (req, res) {
  res.send('Moody Player Backend Running');
});
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});
module.exports = server;