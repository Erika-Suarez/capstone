const RideShare = require('../models/rideShare');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const {id} = req.params;
    const rideShare = await RideShare.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    rideShare.reviews.push(review);
    await rideShare.save();
    await review.save();
    req.flash("success", "new review was sucessfully added")
    res.redirect(`/rideShares/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await RideShare.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review was sucessfully deleted")
    res.redirect(`/rideShares/${id}`);
};