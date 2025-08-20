const express= require('express');
const app = express();


// but this will only match GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({firstName:"Avdesh", lastName:"Singh"});

});



app.listen(7777, () => {
    console.log("server is successfully listeng on port 7777");
});