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





index.js before KWT auth


const express = require("express");
const cors = require('cors');
require("./db/config")
const User = require('./db/User');
const Product = require('./db/Products');
constJwt = require("jsonwebtoken");

constjwtKey = 'e-comm';

const app = express()

app.use(express.json())
app.use(cors());

//crud operations

app.post("/register", async (req, res) => {
    const user = new User(req.body);    //User is a model for User table for rbdatabse
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result)
})
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {  //if password and email is present proceed findOne else NO USER found

        const user = await User.findOne(req.body).select("-password"); //find 1user in req.body without password 
        if (user) {  //if user is present display user otherwise send message AS AN OBJECT
            res.send(user);
        } else {
            res.send({ result: "No User found " })
        }
    } else {
        res.send({ result: "No User found " })
    }
});

// create product

app.post('/add-product', async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
});

// display all products

app.get('/products', async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "Product not found..." })
    }
});

//delete product

app.delete('/products/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
});

// get one product

app.get("/products/:id", async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "Record not found." })
    }
})
// update product

app.put("/products/:id", async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id }, //get products id
        { $set: req.body }  /**  $set  operator replaces the value of a field with the specified value. standard way to update data */
    );
    res.send(result)
})

// search for products api

app.get("/search/:key", async (req, res) => {
    const result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  // we are fetching querry parameter
            },
            {
                company: { $regex: req.params.key }
            },
            {
                price: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    res.send(result)
})


app.listen(5000, 'localhost', () => {
    console.log('Server is ON and running on http://localhost:5000')
})


/**$or - performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of them
 * $regex  - provides regular expression capabilities for pattern matching strings in queries. 
 */
