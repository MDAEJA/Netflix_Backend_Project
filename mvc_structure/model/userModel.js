// create an schema for user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        minLength : [3,"InVALID NAME"]
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
     password : {
        type : String,
        required : true,
        minLength : [3,"InVALID PASSWORD!!!"],
        manLength : [10,"InVALID PASSWORD!!!"]
     }
},{timestamps:true})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;