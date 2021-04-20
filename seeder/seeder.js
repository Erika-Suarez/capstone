const mongoose = require('mongoose');
const RideShare = require('../models/rideShare');

mongoose.
connect('mongodb://localhost:27017/rideShareCapstone', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));


    const sampleData = [
        {
        companyName: "Envoy",
        image: "https://images.unsplash.com/photo-1594535182308-8ffefbb661e1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cmljJTIwY2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: " a community-based electric car sharing service and platform, providing electric vehicles as an exclusive amenity to apartments, hotels, and workplaces.",
        accessibility: "Limitted",
        price: "$$",
        submittedBy: "60725811ebf02e7218eb1829",
        },
        {
        companyName: "MTA Metro Rail", 
        image: "https://images.pexels.com/photos/5746207/pexels-photo-5746207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "", 
        accessibility: "Fair",
        price: "$",
        submittedBy: "60725811ebf02e7218eb1829",
        
        },

        {
        companyName: "Bird",
        image: "https://images.pexels.com/photos/2727413/pexels-photo-2727413.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Bird partners with cities across the globe to develop programs that maximize the positive impact of micromobility. ",
        accessibility: "Limitted",
        price: "$", 
        submittedBy: "60725811ebf02e7218eb1829",
        },

        {
        companyName: "Metro Bike Share", 
        image:"https://images.unsplash.com/photo-1590273018519-ba2db69e124c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjU4fHxsb3MlMjBhbmdlbGVzJTIwY29tbXV0ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Metro Bike Share is now available in Downtown Los Angeles! With up to 1000 self-service bikes and up to 65 stations available 24 hours a day and 365 days a year, Metro Bike Share offers convenient round-the-clock access to a fleet of bicycles for short trips and to get to transit on your schedule.", 
        accessibility: "Limitted",
        price: "$$$",
        submittedBy: "60725811ebf02e7218eb1829",
        },

        {
        companyName: "CIRCUIT", 
        image: "https://images.pexels.com/photos/3787149/pexels-photo-3787149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Circuit makes transportation easier, greener and more enjoyable. Circuit is a free, local, shuttle service. It’s a fun and easy way to get around and best of all - you guessed it - it's free to ride!.shuttles operate Sunday through Thursday from 10 a.m. to 9:00 p.m. and Friday and Saturday from 10:00 a.m. to 10:00 p.m.", 
        accessibility: "Limitted",
        price: "$",
        submittedBy: "60725811ebf02e7218eb1829",
        },

    

    ];

    // We first clear our database and then add in our restaurant sample
const seedDB = async () => {
	await RideShare.deleteMany({});
	const res = await RideShare.insertMany(sampleData)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});
