"use strict";

var express = require('express');

var multer = require('multer');

var router = express.Router();

var uploadFile = require('../services/Storage.service');

var upload = multer({
  storage: multer.memoryStorage()
});

var songModel = require('../models/Song.model');

router.post('/', upload.single('audio'), function _callee(req, res) {
  var fileData, song;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (req.file) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'No file uploaded'
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(uploadFile(req.file));

        case 5:
          fileData = _context.sent;
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
            message: 'Song created!',
            song: song
          });
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Error creating song:", _context.t0);
          res.status(500).json({
            message: 'Internal Server Error',
            error: _context.t0.message
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.get('/', function _callee2(req, res) {
  var mood, songs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          mood = req.query.mood;
          console.log("Received mood for search:", mood);

          if (mood) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Mood query parameter is required.'
          }));

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(songModel.find({
            mood: new RegExp(mood, 'i')
          }));

        case 7:
          songs = _context2.sent;
          console.log('Songs found in DB:', songs);

          if (!(songs.length === 0)) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            message: 'No songs found for this mood.',
            songs: []
          }));

        case 11:
          res.status(200).json({
            message: 'Songs fetched!',
            songs: songs
          });
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching songs:", _context2.t0);
          res.status(500).json({
            message: 'Internal Server Error',
            error: _context2.t0.message
          });

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
module.exports = router;