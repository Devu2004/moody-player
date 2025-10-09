const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    audio:String,
    mood:String
})

const song = mongoose.model('Song',songSchema)

module.exports = song