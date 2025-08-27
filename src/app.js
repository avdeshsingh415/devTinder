const express= require('express');
const connectDB = require ("./config/database");
const app = express();
const User = require('./models/user');
const e = require('express');
const { ReturnDocument } = require('mongodb');

app.use(express.json());
//add user
app.post('/signup', async (req,res)=>{
 

    const user = new User(req.body);
    try{
        await user.save();
    res.send("User added successfully!");

    }catch(err){
        console.log(err);
        res.status(400).send("Error saving the user:"+ err.message);
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
app.patch('/user', async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user = await User.findByIdAndUpdate({ _id: userId}, data, {
            ReturnDocument: 'after',
        });
        console.log(user);
        res.send("user updated successfully");
    }catch(err){
        res.status(400).send("something went wrong");   
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

