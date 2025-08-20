const express= require('express');
const app = express();


app.use("/user", (req, res) => {
    res.send("hahahahahha!");

});

// but this will only match GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName:"Avdesh", lastName:"Singh"});

});

app.post("/user", (req, res) => {
    //savind data to DB
    res.send("Data successfully saved to the database!");

});


app.delete("/user", (req, res) => {
    res.send("deleated request successfully!");
});

//this will only match all the HTTP  methode API calls to /test
app.use("/test" ,(req,res) => {
    res.send("Hello from the server!");

});



app.listen(7777, () => {
    console.log("server is successfully listeng on port 7777");
});