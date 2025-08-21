const express= require('express');
const app = express();

app.use("/user", (req, res, next) => {
    console.log("handling the rout user!!");
    next();
    // res.send("Response!!");
    
}, (req,res,next) => {
    console.log("handling the rout user 2!!");
    // res.send("2nd Response!!");
    next()

},(req,res,next) => {
    console.log("handling the rout user 3!!");
    // res.send("3nd Response!!");
    next()

},(req,res,next) => {
    console.log("handling the rout user 4!!");
    // res.send("4nd Response!!");
    next()

});


app.listen(7777, () => {
    console.log("server is successfully listeng on port 7777");
});