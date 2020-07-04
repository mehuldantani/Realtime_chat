const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const user = require('../modules/user');
const bcrypt = require('bcrypt');

var jsonParser = bodyParser.json();

const JWT_token_key = "gupshup_secret";

router.post("/signup", jsonParser, (req, res, next) => {
    user.find({ email: req.body.email})
    .exec()
    .then(User => {
        if (User.length >= 1){
            console.log(User);
            return res.status(409).json({
                message: "User already exists."
            })
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else{
                    const adduser = new user({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password : hash,
                        name: req.body.name
                    });
                    adduser
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                          message: "User created"
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

 router.post("/login", jsonParser, (req, res, next) => {
     user.find({email: req.body.email})
     .exec()
     .then(User => {
         if(User.length <1){
           return res.status(401).json({
                messsage: "Auth Failed"
            })
         }
         bcrypt.compare(req.body.password, User[0].password, (err, result)=>{
             if(err){
                  return res.status(401).json({
                     message:"Auth Failed"
                 })
             }
             if(result){
                 const token = JWT.sign({
                     email: User[0].email,
                     user_id : User[0]._id
                 },
                 JWT_token_key,
                 {
                     expiresIn: "1hr"
                 })
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
     .catch()
 })
 

module.exports = router;