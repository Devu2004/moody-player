const express = require('express');
const cors = require('cors');
const Songsrouter = require('./routes/Song.routes');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/songs', Songsrouter);

server.get('/', (req, res) => {
  res.send('Moody Player Backend Running');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server