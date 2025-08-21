const express= require('express');

const app = express();
app.use("/", (err, req, res, next)=>{
    if(err){
        //log your error
        res.status(500).send("something went wrong");
    }
});
app.get("/getUserData",(req, res) => {
    // try{
            //logic of DB call and get user data
    throw new Error("hdvfhsdh")
    res.send("User Data  Sent");

    // }
    // catch(err){
    //     res.status(500).send("Some Error contact support team");
    // }

});

app.use("/", (err, req, res, next)=>{
    if(err){
        //log your error
        res.status(500).send("something went wrong");
    }
});

app.listen(7777, () => {
    console.log("server is successfully listeng on port 7777");
});
