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
        companyName: "Electrial Vehicle",
        image: "https://images.unsplash.com/photo-1594535182308-8ffefbb661e1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cmljJTIwY2Fyc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "",
        accessibility: "Limitted",
        price: "None",
        submittedBy: "60725811ebf02e7218eb1829",
        },
        {
        companyName: "MTA Metro Rail", 
        image: "https://images.pexels.com/photos/5746207/pexels-photo-5746207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "", 
        accessibility: "Accessable",
        price: "None",
        submittedBy: "60725811ebf02e7218eb1829",
        
        },

        {
        companyName: "Electrical Scooters",
        image: "https://images.pexels.com/photos/2727413/pexels-photo-2727413.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: " ",
        accessibility: "poor",
        price: "", 
        submittedBy: "60725811ebf02e7218eb1829",
        },

        {
        companyName: "E- Bikes", 
        image:"https://images.unsplash.com/photo-1585160029224-3294e0aaa857?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzJ8fGVsZWN0cmljJTIwYmlrZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: ".", 
        accessibility: "Good",
        price: "",
        submittedBy: "60725811ebf02e7218eb1829",
        },

        {
        companyName: "CIRCUIT", 
        image: "https://images.pexels.com/photos/3787149/pexels-photo-3787149.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Circuit makes transportation easier, greener and more enjoyable. We’re building on-demand, last-mile shuttle services for cities around the US ", 
        accessibility: "",
        price: "",
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
