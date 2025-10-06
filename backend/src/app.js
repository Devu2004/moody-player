const express = require('express')
const Songsrouter = require('./routes/Song.routes')

const server = express()

server.use(express.json())

server.use('/',Songsrouter)

module.exports = server