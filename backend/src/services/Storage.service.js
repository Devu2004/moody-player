const ImageKit = require("imagekit");
const dotenv = require("dotenv");
var mongoose = require('mongoose')

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer, 
        fileName:(new mongoose.Types.ObjectId()).toString(),
        folder:'Moody-player-songs'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
}
module.exports = uploadFile;




