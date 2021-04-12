const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;


const RideShareSchema = new Schema({
    companyName: String,
    description: String,
    accessibility: String,
    image: String,
    price: String,
	submittedBy: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},

    reviews: 
	[
        {
			type: Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
});
   

RideShareSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});



module.exports = mongoose.model("RideShare", RideShareSchema);

