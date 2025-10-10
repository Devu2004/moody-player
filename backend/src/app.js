const express = require('express');
const cors = require('cors');
const Songsrouter = require('./routes/Song.routes'); // Make sure this path is correct

const server = express();

const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'https://moody-player-frontend-c3sr.onrender.com' 
  ],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

server.use(cors(corsOptions));

server.use(express.json());

server.use('/songs', Songsrouter);

server.get('/', (req, res) => {
  res.send('Moody Player Backend Running');
});

module.exports = server;