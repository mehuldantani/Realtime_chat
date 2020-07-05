const express = require('express');
const mongoose = require('mongoose');
const userrouter = require('./api/routes/user')
const app = express();

//to connect to the database using mongoose
var url = "mongodb://localhost:27017/gupshup";
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connection
    .once("open",() => {
        console.log("and successfully connected to the Database.")
    })
    .on("error",(error)=>{
        console.log(error);
    })

    //directing request with "/user" API request to userrouter
app.use("/user",userrouter);
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin',"*"),
    res.header('Access-Control-Allow-Methods',"GET,POST"),
    res.header('Access-Control-Allow-Headers',"content-type"),
    next();
})
//exporting the app
module.exports = app;