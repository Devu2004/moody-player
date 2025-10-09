const express = require('express')
const multer = require('multer')
const router = express.Router();
const uploadFile = require('../services/Storage.service')
const upload = multer({storage:multer.memoryStorage()})
const songModel = require('../models/Song.model')

router.post('/songs',upload.single('audio'),async (req,res)=>{
    console.log(req.body);
    console.log(req.file);
    const fileData = await uploadFile(req.file)
    console.log(fileData);
    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })
    res.status(201).json({
        message:'Songs created!',
        song:song
    })
    
})

router.get('/', async (req,res) => {
  const { mood } = req.query;
  const songs = await songModel.find({ mood: mood });
  res.status(200).json({ message: 'Songs fetched!', songs });
});

module.exports = router