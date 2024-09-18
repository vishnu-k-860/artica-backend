const mongoose = require('mongoose')

const itemschema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'users'
    },
    items:[{
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'products'
    },
    productcount:{
        type:Number,
        require:true
    } 
}]
})

const item = mongoose.model("item",itemschema)
module.exports = item