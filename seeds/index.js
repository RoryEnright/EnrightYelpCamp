const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63f918d006088490e8c77d33",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sapiente, ducimus alias laboriosam nostrum sed eligendi incidunt numquam inventore. Accusantium earum nam sit qui et officia harum vel tenetur ad",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/dnk3ate0o/image/upload/v1678224242/YelpCamp/i9diowuvqwvezcuzaqmh.jpg",
          filename: "YelpCamp/i9diowuvqwvezcuzaqmh",
        },
        {
          url:
            "https://res.cloudinary.com/dnk3ate0o/image/upload/v1678739675/YelpCamp/tr8w4nfwfg5m4asgjik6.jpg",
          filename: "YelpCamp/tr8w4nfwfg5m4asgjik6",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
