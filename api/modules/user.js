const mongoose = require('mongoose');

//creating user scehma for Users in mongodb
const userschema = mongoose.Schema({
 _id :mongoose.Types.ObjectId,
 email:{ type: String,
        required: true,
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
 password: {type: String, required: true},
 name: {type: String, required : true}
})

//exporting the schema
module.exports = mongoose.model('User_master', userschema);