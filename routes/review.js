const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router({mergeParams: true});
const { validateReview,isLoggedin,isReviewAuthor } = require('../middleware');
const reviews = require('../controller/review');

router.post('/:id/reviews',isLoggedin, validateReview, catchAsync(reviews.postReview))

router.delete('/:id/review/:reviewId',isLoggedin,isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;