const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'users'
    },
    paymentid:{
        type:String,
        require:true
    },
    orders:[],
    amount:{
        type:String,
        require: true
    }


})

const order = mongoose.model("order",orderschema)
module.exports = order