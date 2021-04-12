const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../joiSchema');
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');
const {validateReview, isAuthenticated, isReviewCreator} = require('../middleware/middleware');
const RideShare = require('../models/rideShare');
const Review = require('../models/review');



// Create Review Endpoint----------------
router.post('/', isAuthenticated, validateReview,  asyncCatcher(async (req, res) => {
    const {id} = req.params;
    const rideShare = await RideShare.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    rideShare.reviews.push(review);
    await rideShare.save();
    await review.save();
    req.flash("success", "new review was sucessfully added")
    res.redirect(`/rideShares/${id}`);

// Delete Review Endpoint--------------------
}));
router.delete(
    '/:reviewId', isAuthenticated,isReviewCreator,
    asyncCatcher(async (req, res) => {
        const { id, reviewId } = req.params;
        await RideShare.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        req.flash("success", "review was sucessfully deleted")
        res.redirect(`/rideShares/${id}`);
    })
);

    module.exports = router;