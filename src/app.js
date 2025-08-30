const express= require('express');
const connectDB = require ("./config/database");
const app = express();
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require("bcrypt");

app.use(express.json());
//add user
app.post('/signup', async (req,res)=>{
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

app.post('/login', async (req,res) => {

    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login Successful!!!");
        }
        else{
            throw new Error("Invalid credentials");
        }
        
    }catch(err){
        res.status(400).send("ERROR:"+ err.message);
    }
});
// get user by email
app.get('/user', async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        console.log(userEmail);   
        const user = await User.findOne({emailId: userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        };
    

    // try{
    //     const user = await User.find({emailId:userEmail})
    //     if(user.length === 0){
    //         res.status(404).send("User not found");
    //     }else{
    //         res.send(user);
    //     }
        
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});
// feed Api = get/feed - get all user from database
app.get('/feed', async (req,res)=>{

    try{
        const user = await User.find({});
        res.send(user);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }

})
// delete user by userId
app.delete('/user', async (req, res) => {
    const userId = req.body.userId; 
    try{
         const user = await User.findByIdAndDelete({ _id: userId});

        // const user = await User.findByIdAndDelete(userId); 
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})
//update data of user
app.patch('/user/:userId', async (req,res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try{
         const ALLOWED_UPDATES = [
        "userId",
        "photoUrl", 
        "about", 
        "gender", 
        "age",
        "skills"
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        throw new Error("Update not allowed!");
    }
    if(data?.skills.length > 10){
        throw new Error("Skills can not be more than 10");
    }

        const user = await User.findByIdAndUpdate({ _id: userId}, data, {
            ReturnDocument: "after",
            runValidators: true,
        });
        console.log(user);
        res.send("user updated successfully");
    }catch(err){
        res.status(400).send("UPDATE FAILED: "+ err.message);   
    }

});
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

