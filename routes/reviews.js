const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../joiSchema');

const asyncCatcher = require('../utilities/asyncCatcher');
const {
    validateReview,
     isAuthenticated,
      isReviewCreator,
    } = require('../middleware/middleware');
const RideShare = require('../models/rideShare');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');



// Create Review Endpoint----------------
router.post('/', isAuthenticated,
 validateReview,
  asyncCatcher(reviews.createReview)
);
// Delete Review Endpoint--------------------
router.delete(
    '/:reviewId',
    isAuthenticated,
    isReviewCreator,
    asyncCatcher(reviews.deleteReview)
);
   
    module.exports = router;