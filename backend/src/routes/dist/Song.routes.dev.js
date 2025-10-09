"use strict";

var express = require('express');

var multer = require('multer');

var router = express.Router();

var uploadFile = require('../services/Storage.service');

var upload = multer({
  storage: multer.memoryStorage()
});

var songModel = require('../models/Song.model');

router.post('/songs', upload.single('audio'), function _callee(req, res) {
  var fileData, song;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          console.log(req.file);
          _context.next = 4;
          return regeneratorRuntime.awrap(uploadFile(req.file));

        case 4:
          fileData = _context.sent;
          console.log(fileData);
          _context.next = 8;
          return regeneratorRuntime.awrap(songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: fileData.url,
            mood: req.body.mood
          }));

        case 8:
          song = _context.sent;
          res.status(201).json({
            message: 'Songs created!',
            song: song
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/', function _callee2(req, res) {
  var mood, songs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          mood = req.query.mood;
          _context2.next = 3;
          return regeneratorRuntime.awrap(songModel.find({
            mood: mood
          }));

        case 3:
          songs = _context2.sent;
          res.status(200).json({
            message: 'Songs fetched!',
            songs: songs
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;