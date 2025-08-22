const express= require('express');
const connectDB = require ("./config/database");
const app = express();
const User = require('./models/user');


app.post('/signup', async (req,res)=>{
    
    const user = new User({
        firstName: "Avdesh",
        lastName: "Singh",
        emailId: "avdesh@singh.com",
        password: "avdesh123",
    });
    try{
        await user.save();
    res.send("User added successfully!");

    }catch(err){
        console.log(err);
        res.status(400).send("Error saving the user:"+ err.message);
    }
    
})

connectDB()
    .then(()=>{
     console.log("Database connection established...");
     app.listen(7777, () => {
        console.log("server is successfully listeng on port 7777");
    });
})
    .catch(err =>{
         console.log("Database can not connected...");

});

