const mongoose = require("mongoose");
const RideShare = require("../models/rideShare");

mongoose
  .connect("mongodb://localhost:27017/rideShareCapstone", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((error) => handleError(error));

const sampleData = [
  {
    companyName: "Envoy",
    image: [
      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619813523/Laci%20Capstone/ipz5ivgteh0gh2vkgbri.png",
        filename: "Laci Capstone/ipz5ivgteh0gh2vkgbri",
      },

      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619812919/Laci%20Capstone/lfu8rhgrip469qa7mr32.png",
        filename: "Laci Capstone/lfu8rhgrip469qa7mr32",
      },
    ],
    description:
      " a community-based electric car sharing service and platform, providing electric vehicles as an exclusive amenity to apartments, hotels, and workplaces.",
    accessibility: "Limitted",
    price: "$$",
    submittedBy: "60725811ebf02e7218eb1829",
  },
  {
    companyName: "MTA Metro Rail",
    image: [
      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619813523/Laci%20Capstone/ipz5ivgteh0gh2vkgbri.png",
        filename: "Laci Capstone/ipz5ivgteh0gh2vkgbri",
      },

      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619812919/Laci%20Capstone/lfu8rhgrip469qa7mr32.png",
        filename: "Laci Capstone/lfu8rhgrip469qa7mr32",
      },
    ],
    description: "",
    accessibility: "Fair",
    price: "$",
    submittedBy: "60725811ebf02e7218eb1829",
  },

  {
    companyName: "Bird",
    image: [
      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619813523/Laci%20Capstone/ipz5ivgteh0gh2vkgbri.png",
        filename: "Laci Capstone/ipz5ivgteh0gh2vkgbri",
      },

      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619812919/Laci%20Capstone/lfu8rhgrip469qa7mr32.png",
        filename: "Laci Capstone/lfu8rhgrip469qa7mr32",
      },
    ],
    description:
      "Bird partners with cities across the globe to develop programs that maximize the positive impact of micromobility. ",
    accessibility: "Limitted",
    price: "$",
    submittedBy: "60725811ebf02e7218eb1829",
  },

  {
    companyName: "Metro Bike Share",
    image: [
      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619813523/Laci%20Capstone/ipz5ivgteh0gh2vkgbri.png",
        filename: "Laci Capstone/ipz5ivgteh0gh2vkgbri",
      },

      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619812919/Laci%20Capstone/lfu8rhgrip469qa7mr32.png",
        filename: "Laci Capstone/lfu8rhgrip469qa7mr32",
      },
    ],
    description:
      "Metro Bike Share is now available in Downtown Los Angeles! With up to 1000 self-service bikes and up to 65 stations available 24 hours a day and 365 days a year, Metro Bike Share offers convenient round-the-clock access to a fleet of bicycles for short trips and to get to transit on your schedule.",
    accessibility: "Limitted",
    price: "$$$",
    submittedBy: "60725811ebf02e7218eb1829",
  },

  {
    companyName: "CIRCUIT",
    image: [
      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619813523/Laci%20Capstone/ipz5ivgteh0gh2vkgbri.png",
        filename: "Laci Capstone/ipz5ivgteh0gh2vkgbri",
      },

      {
        url:
          "https://res.cloudinary.com/dm26y9unl/image/upload/v1619812919/Laci%20Capstone/lfu8rhgrip469qa7mr32.png",
        filename: "Laci Capstone/lfu8rhgrip469qa7mr32",
      },
    ],
    description:
      "Circuit makes transportation easier, greener and more enjoyable. Circuit is a free, local, shuttle service. It’s a fun and easy way to get around and best of all - you guessed it - it's free to ride!.shuttles operate Sunday through Thursday from 10 a.m. to 9:00 p.m. and Friday and Saturday from 10:00 a.m. to 10:00 p.m.",
    accessibility: "Limitted",
    price: "$",
    submittedBy: "60725811ebf02e7218eb1829",
  },
];

// We first clear our database and then add in our restaurant sample
const seedDB = async () => {
  await RideShare.deleteMany({});
  const res = await RideShare.insertMany(sampleData)
    .then((data) => console.log("Data inserted"))
    .catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
  mongoose.connection.close();
});
