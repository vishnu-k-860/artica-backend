//use mongoose..
const mongoose = require('mongoose')

//create a schema for users as a object of mongoose using schema method..
const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
       type:String,
    },
    address:{
        type:String,
    },
    password:{
        type:String,
    },
    profilepic:{
        type:String
    },
    role:{
        type:Number,
        default:0
    },
    googleid:{
        type:String
    }
})

const users = mongoose.model("users",userschema)
module.exports = users