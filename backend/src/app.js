const express = require('express')
const Songsrouter = require('./routes/Song.routes')
const cors = require('cors')

const server = express()

server.use(cors())
server.use(express.json())
server.use('/',Songsrouter)

module.exports = server