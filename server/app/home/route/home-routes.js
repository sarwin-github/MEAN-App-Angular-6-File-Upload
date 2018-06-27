const express   = require('express');
const router    = express();

const homeController = require('../controller/home-controller');

/* Get The home page with list of fitness option */
router.route('/').get(homeController.getHome);
router.route('/').post(homeController.uploadImage);
router.route('/list').get(homeController.getImageList);

module.exports = router;
