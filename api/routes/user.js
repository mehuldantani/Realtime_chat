const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('../modules/user');
const bcrypt = require('bcrypt');

var jsonParser = bodyParser.json()

router.post("/signup", jsonParser, (req, res) => {
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
            .then(res =>{
                return res.status(201).json({
                    message: 'User Created'
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

});

module.exports = router;