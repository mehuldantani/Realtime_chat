const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const user = require('../modules/user');
const bcrypt = require('bcrypt');

//parsing json only
var jsonParser = bodyParser.json();

//token key for Json Web Token
const JWT_token_key = "gupshup_secret";

//router for signup API POST request
router.post("/signup", jsonParser, (req, res, next) => {
    user.find({ email: req.body.email})  //check if user already exist within database
    .exec()
    .then(User => { //if exists then returns status(409)
        if (User.length >= 1){
            console.log(User);
            return res.status(409).json({
                message: "User already exists."
            })
        }
        else{
            //hashing the password, 10 is salting which enalbes to not revert hash to plaintext
            bcrypt.hash(req.body.password, 10, (err, hash) => { 
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else{
                    //creatting user object from Imported user schema
                    const adduser = new user({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password : hash,
                        name: req.body.name
                    });
                    adduser
                    .save()  //add user into database
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                          message: "User created"  //publishing if user added successfully
                        });
                      })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            message: err
                        });
                    })
        
                }
                }
            
            );
        }
    })    


});

//router for login API POST request
 router.post("/login", jsonParser, (req, res, next) => {
     user.find({email: req.body.email})  //check if user exist with provided email in the body
     .exec()
     .then(User => {
         if(User.length <1){
           return res.status(401).json({
                messsage: "Auth Failed"  //return 401 status if email not found in the database
            })
         }
         //compare the password with the one(hashed) stored in the database
         bcrypt.compare(req.body.password, User[0].password, (err, result)=>{
             if(err){
                  return res.status(401).json({
                     message:"Auth Failed"
                 })
             }
             if(result){
                 //generates token for future API calls for security purpose
                 const token = JWT.sign({
                     email: User[0].email,
                     user_id : User[0]._id
                 },
                 JWT_token_key,
                 { //token expires in 1 hour
                     expiresIn: "1hr"
                 })
                 //return Auth Success if email and pw matches in the database.
                 return res.status(200).json({
                     message:"Auth Successful",
                     token: token
                 })
             }
             return res.status(401).json({
                 message:"Auth Failed"
             })
         })
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({
             error: err
         })
     })
 })
 
//exporting the router
module.exports = router;