const jwt = require('jsonwebtoken');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

require('../DB/conn');
const User = require("../Model/schema");

router.get('/', (req,res) => {
    res.send(`Hello world`);
});

router.post('/register', async (req, res) => {
    const { name, email, phone, Password, cPassword} = req.body;
    
    if(!name || !email || !phone || !Password ||! cPassword) {
        return res.status(422).json({error:"Please fill in all details"});
    }
    //console.log(name);
    //console.log(req.body);
    //res.json({message: req.body});
    //res.send("ABCDEFG");
    try{
        const userExist = await User.findOne({email:email});

        if (userExist){
            return res.status(422).json({error:"Email already exists"});
        }

        const user = new User({name, email, phone, Password, cPassword});

        await user.save();

        res.status(201).json({message:"User registered successfully"});

        
    }catch(err){
        console.log(err);
    }
    
});

//login

router.post('/signin', async (req,res) => {
   
    try {
        let token;
        const {email, Password} = req.body;

        if(!email || !Password){
            return res.status(400).json({error:"Invalid Details"});
        }
        const userLogin = await User.findOne({email:email});

        console.log(userLogin);
        if(!userLogin){
            res.json({error:"Invalid login credentials"});
        }
        else {
            res.json({message:"Sign-in is successful"});
        }

        if (userLogin) {
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 2589200000),
                httpOnly:true
            });
        };
        

    }catch (err) {
        console.log(err);
        

    }
});

module.exports = router;

