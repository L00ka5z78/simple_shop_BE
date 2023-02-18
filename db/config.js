const mongoose = require('mongoose');    // mongodb connection

// mongoose.connect("mongodb://localhost:27017/e-commerce");

mongoose
    .connect("mongodb://localhost:27017/e-commerce")
    .then(() => {
        console.log("MongoDB Compass connected");
    })
    .catch((err) => {
        console.log(err.message);
    });