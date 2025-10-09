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
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Internal Server Error',
            error: _context.t0.message
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
router.get('/songs', function _callee2(req, res) {
  var mood, songs;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          mood = req.query.mood;
          _context2.next = 4;
          return regeneratorRuntime.awrap(songModel.find({
            mood: mood
          }));

        case 4:
          songs = _context2.sent;
          res.status(200).json({
            message: 'Songs fetched!',
            songs: songs
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: 'Internal Server Error',
            error: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;