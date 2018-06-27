const multer = require('multer');
const crypto = require('crypto');
const path = require('path')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/images')
  },
  filename: (req, file, callback) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
     	if (err) return cb(err)

      	callback(null, file.originalname)
    });
  }
});

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
module.exports.upload = multer({storage: storage}).single('photo');