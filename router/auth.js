const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send('Hello')

});

//sign up api

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please filled the required details" })

    }
    try {

        const userExist = await User.findOne({ email: email });
        if (userExist) {

            return res.status(422).json({ error: "Email already exist" });
        }
        const user = new User({ name, email, phone, work, password, cpassword });

        //password hash
        

        await user.save();

        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
    }
})

//login api
router.post('/login', async (req, res) => {


    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please filled the data" })

        }
        const userLogin = await User.findOne({ email: email });

        if (!userLogin) {
            res.status(400).json({ error: "User error" })
        } else {
            res.json({ message: "Login Success" });
        }


    } catch (error) {
        console.log(error);
    }
})

module.exports = router;