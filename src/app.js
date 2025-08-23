const express= require('express');
const connectDB = require ("./config/database");
const app = express();
const User = require('./models/user');
const e = require('express');

app.use(express.json());

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
app.get('/user', async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const user = await User.find({emailId:userEmail})
        if(user.length === 0){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
        
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});
app.get('/feed',(req,res)=>{

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

