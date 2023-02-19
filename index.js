const express = require("express");
const cors = require('cors');
require("./db/config")
const User = require('./db/User');
const Product = require('./db/Products');


const app = express()

app.use(express.json())
app.use(cors());

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

app.post('/add-product', async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "Product not found..." })
    }
})

app.delete('/products/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)


})


app.listen(5000, 'localhost', () => {
    console.log('Server is ON and running on http://localhost:5000')
})