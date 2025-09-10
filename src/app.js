const express= require('express');
const connectDB = require ("./config/database");
const app = express();
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());


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

app.get("/profile", userAuth, async(req,res) => {

    try{

    const user = req.user;

    res.send(user);
}
    catch (err){
        res.status(400).send("ERROR:"+ err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {

    const user = req.user;

    //Sending a connection request 
    console.log("Sending connection request");
    res.send(user.firstName +"sent the connection request!");
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

