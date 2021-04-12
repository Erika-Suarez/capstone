const AppError  = require('../utilities/AppError');
const RideShare = require('../models/rideShare');
const {rideShareSchema, reviewSchema} = require('../joiSchema')

const Review = require("../models/review");

//MIDDLEWARE FOR AUTHENTICATING CREATOR

module.exports.isReviewCreator = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/rideShares/${id}`);
	}
	next();
};


 module.exports.isCreator = async (req, res, next) => {
	const { id } = req.params;
	const rideShare = await RideShare.findById(id);
	if (!rideShare.submittedBy.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/rideShares/${id}`);
	}
	next();
};

//MIDDLEWARE -------------------------------------

module.exports.validateRideShare = (req, res, next) => { 
    const {error} = rideShareSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((e) => e.message).join(",");
        throw new AppError(msg, 404);
    } else {
        next();
    }
   
};
module.exports.isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in to do that');
		return res.redirect('/login');
	}
	next();
};
// routes from reviews routes folder 

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};