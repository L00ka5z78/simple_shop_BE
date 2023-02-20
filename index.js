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

app.post('/add-product', verifyToken, async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
});

// display all products

app.get('/products', verifyToken, async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "Product not found..." })
    }
});

//delete product

app.delete('/products/:id', verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result)
});

// get one product

app.get("/products/:id", verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ "result": "Record not found." })
    }
})
// update product

app.put("/products/:id", verifyToken, async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id }, //get products id
        { $set: req.body }  /**  $set  operator replaces the value of a field with the specified value. standard way to update data */
    );
    res.send(result)
})

// search for products api

app.get("/search/:key", verifyToken, async (req, res) => {
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

function verifyToken(req, res, next) {
    console.log(req.headers['authorization'])
    let token = req.headers['authorization'];
    if (token) {
        token = token.split('  ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res
                    .status(401)
                    .send({ result: "Invalid token!" })
            } else {
                next();
            }
        })
    } else {
        res
            .status(403)
            .send({ result: "Provide a token..." })
    }

}

//     let token = req.headers['authorization']
//     if (token) {
//         token = token.split(' ')[1]
//         console.warn(token)
//         Jwt.verify(token, jwtKey, (err, success) => {
//             if (err) {
//                 res.send("Invalid token")
//             } else {
//                 next()
//             }
//         })
//     } else {
//         res.send("Provide a token...")
//     }
// }



app.listen(5000, 'localhost', () => {
    console.log('Server is ON and running on http://localhost:5000')
})


/**$or - performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of them
 * $regex  - provides regular expression capabilities for pattern matching strings in queries. 
 * 
 *     // console.log(req.headers['authorization'])  //gets authorization token 

 * 
 *         token = token.split(' ')[1] //gets second element in array
[
  'bearer',                                     <---- first one index 0
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.      1lsbHkiLCJlbWFpbCI6ImtlbGx5QGJhLmNvbSIsIl9pZCI6IjYzZjMyNmU1MWRjYWQ1YzI5ZDZjODkzZCIsIl9fdiI6MH0sImlhdCI6MTY3Njg3OTU4OSwiZXhwIjoxNjc2ODg2Nzg5fQ.PXBWsAMzKd6xeCxecYY7BhQLZ1ugwbOUvBsD3wHPBQ0'          <---- second one index 1
]
 * 
 */
