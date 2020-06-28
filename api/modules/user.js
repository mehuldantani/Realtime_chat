const mongoose = require('mongoose');

const userschema = mongoose.Schema({
 _id :mongoose.Types.ObjectId,
 email:{ type: String, required: true},
 password: {type: String, required: true},
 name: {type: String, required : true}
})

module.exports = mongoose.model('User_master', userschema);