const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadFile = require('../services/Storage.service');
const upload = multer({ storage: multer.memoryStorage() });
const songModel = require('../models/Song.model');

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileData = await uploadFile(req.file);
    const song = await songModel.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url,
      mood: req.body.mood
    });

    res.status(201).json({ message: 'Song created!', song });
  } catch (err) {
    console.error("Error creating song:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { mood } = req.query;
    console.log("Received mood for search:", mood);

    if (!mood) {
        return res.status(400).json({ message: 'Mood query parameter is required.' });
    }

    const songs = await songModel.find({ mood: new RegExp(mood, 'i') });
    console.log('Songs found in DB:', songs);
    
    if (songs.length === 0) {
        return res.status(200).json({ message: 'No songs found for this mood.', songs: [] });
    }

    res.status(200).json({ message: 'Songs fetched!', songs: songs });
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;