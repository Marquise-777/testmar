const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const { isLoggedin, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controller/campground')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })

// router.route('/') //Fancy way to restructure route
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedin, campgrounds.renderNewForm);


router.post('/', isLoggedin, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit', isLoggedin, isAuthor, catchAsync(campgrounds.renderEdit))

router.put('/:id', isLoggedin, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.postUpdate))

router.delete('/:id', isLoggedin, isAuthor, catchAsync(campgrounds.deleteCamp))

module.exports = router;