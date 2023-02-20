const express = require("express");
const cors = require('cors');
require("./db/config")
const User = require('./db/User');
const Product = require('./db/Products');
const Jwt = require("jsonwebtoken");

const jwtKey = 'e-commerce';

const app = express()

app.use(express.json())
app.use(cors());

//crud operations

app.post("/register", async (req, res) => {
    const user = new User(req.body);    //User is a model for User table for rbdatabse
    let result = await user.save();
    result = result.toObject();
    delete result.password

    Jwt.sign({ result }, jwtKey, {
        expiresIn: "2h"
    }, (err, token) => {
        if (err) {
            res.send({ result: "something went wrong, please try again later..." });
        }
        res.send({ result, auth: token })
    })

    // res.send(result) 34
})

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {  //if password and email is present proceed findOne else NO USER found

        const user = await User.findOne(req.body).select("-password"); //find 1user in req.body without password 
        if (user) {                 //if user is present display user otherwise send message AS AN OBJECT

            Jwt.sign({ user }, jwtKey, {
                expiresIn: "2h"
            }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong, please try again later..." });
                }
                res.send({ user, auth: token })
            })
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
