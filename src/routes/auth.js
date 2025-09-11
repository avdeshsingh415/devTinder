const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {userAuth} = require('../middlewares/auth');



authRouter.post('/signup', async (req,res)=>{
    try{
    // Validation of data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body; 


    // encript the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Create a new instance of the user modal
 

    const user = new User({firstName, lastName, emailId, password: passwordHash,});
    
        await user.save();
    res.send("User added successfully!");

    }catch(err){
        console.log(err);
        res.status(400).send("ERROR:"+ err.message);
    }
    
});

authRouter.post('/login', async (req,res) => {

    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){
            const token = await user.getJWT();

            res.cookie("token", token, {
                 expires: new Date(Date.now() + 8 * 3600000)
                });

            res.send("Login Successful!!!");
        }
        else{
            throw new Error("Invalid credentials");
        }
        
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);
    }
});


module.exports = authRouter;