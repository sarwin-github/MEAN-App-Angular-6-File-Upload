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

const gcs = require('multer-google-storage');

const storageGoogle = gcs.storageEngine({
    filename: function( req, file, callback ) {
        crypto.pseudoRandomBytes(16, (err, raw) => {
         	if (err) return cb(err)

          	callback(null, file.originalname)
        });
    },
    bucket      : 'elite-bedrock-162205.appspot.com', // Required : bucket name to upload
    projectId   : 'elite-bedrock-162205', // Required : Google project ID
    keyFilename : './public/javascript/gs-storage.json',
	  acl         : 'publicread' // Optional : Defaults to private
              
});

//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
module.exports.upload = multer({storage: storageGoogle }).single('photo');