const Joi = require("joi");

module.exports.rideShareSchema = Joi.object({
  rideShare: Joi.object({
    companyName: Joi.string().required(),
    description: Joi.string().required(),
    accessibility: Joi.string().required(),
    // image: Joi.string().required(),
    price: Joi.string().required(),
  }).required(),
  selectedImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
