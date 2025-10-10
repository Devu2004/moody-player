"use strict";

var express = require('express');

var cors = require('cors');

var Songsrouter = require('./routes/Song.routes'); // Make sure this path is correct


var server = express();
var corsOptions = {
  origin: ['http://localhost:5173', 'https://moody-player-frontend-c3sr.onrender.com'],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true
};
server.use(cors(corsOptions));
server.use(express.json());
server.use('/songs', Songsrouter);
server.get('/', function (req, res) {
  res.send('Moody Player Backend Running');
});
module.exports = server;