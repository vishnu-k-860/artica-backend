const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    productid:{
        type:String,
        required:true,
        unique:true
    },
    productimage:{
        type:String,
        required:true
    },
    producttitle:{
        type:String,
        required:true
    },
    productdescription:{
        type:String,
        required:true
    },
    productcategory:{
        type:String,
        required:true
    },
    productprice:{
        type:String,
        required:true
    }
    

})

const products = mongoose.model("products",productschema)
module.exports = products