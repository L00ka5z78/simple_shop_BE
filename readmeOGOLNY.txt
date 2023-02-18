remember to have mongodb compass running directly on your computer


// const connectDB = async () => {
                                                                        //connection to mongodb compass. creating new schema for our table

//     mongoose.connect("mongodb://localhost:27017/e-comm");            //connect to e-comm database
//     const productSchema = new mongoose.Schema({});                   // new schema
//     const product = mongoose.model("products", productSchema);       // new model for products table in e-comm database
//     const data = await product.find();
//     console.log(data);


mongoose                              // mongodb connection
    .connect("mongodb://localhost:27017/e-commerce")
    .then(() => {
        console.log("MongoDB Compass connected");
    })
    .catch((err) => {
        console.log(err.message);
    });
// }