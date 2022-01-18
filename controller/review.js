const Review = require('../model/review');
const campground = require('../model/campground');

module.exports.postReview = async (req, res) => {
    const campgrounds = await campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campgrounds.reviews.push(review);
    await review.save();
    await campgrounds.save();
    req.flash('success', 'Review Added');
    res.redirect(`/campgrounds/${campgrounds._id}`)
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Review Deleted');
    res.redirect(`/campgrounds/${id}`)
}