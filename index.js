const express = require("express");
const cors = require('cors');
require("./db/config")
const User = require('./db/User');


const app = express()

app.use(express.json())
app.use(cors());

app.post("/register", async (req, res) => {
    const user = new User(req.body);    //User is a model for User table fo rbdatabse
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
})

//************************15 */

app.listen(5000, 'localhost', () => {
    console.log('Server is ON and running on http://localhost:5000')
})