const uploader = require('../middleware/multer-image-upload');
const Images   = require('../model/images');

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// This will make a get request and render the index page for logging in a professional or client
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.getHome = (req, res) => {
	res.status(200).json({ 
		success: true, 
		message: 'You are about to upload an image'
	});
};


// create a promise for creating path for image
let uploadImage = (req, res) => {
	return new Promise((resolve, reject) => {
		let path = '';

		uploader.upload(req, res, err => {
			if(err) reject(err);
				else resolve(req.file.path);
		});
	});
};


// http post for uploading image
module.exports.uploadImage = (req, res) => {
	uploadImage(req, res)
		.then(result => result)
		.then(result => {
			let imageData = new Images();

			let imagePath = result.split('/');

			imageData.location  = result.toString();
			imageData.imageName = imagePath[3];

			return imageData.save((images) => {
				res.status(200).json({ 
				  sucess  : true, 
				  message : 'Successfully added a new image.'
				});	
			});
		})
	.catch(err => {
		return res.status(500).json({ 
		  sucess  : false, 
		  error   : err, 
		  message : 'Server error.'
		});
	});
}

// get list of image
module.exports.getImageList = (req, res) => {
	let query = Images.find({}).select({'__v': 0});

	query.exec((err, images) => {
		if(err){
		  return res.status(500).json({ 
		    sucess  : false, 
		    error   : err, 
		    message : 'Server error.'
		  });
		} 

		let imageList = images.length > 0 ? images : "List of images is currently empty."

		res.status(200).json({
		  success : true, 
		  message : 'Successfully fetched the list of images.',
		  images  : imageList,
		});
	});
}