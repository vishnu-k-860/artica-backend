const products = require('../models/productsschema')


 // for adding products
exports.products = async(req,res)=>{
    
 try {
    const productimage = req.file.filename
    const{productid,productcategory,producttitle,productdescription,productprice} = req.body
    console.log(productid,productcategory,productimage,producttitle,productdescription,productprice);

    if(!productid || !productcategory || !productimage || !producttitle || !productdescription || !productprice){
        res.status(404).json("Please fill the form..")
        
  
    }else{
        const existingproduct = await products.findOne({productid})
        if(existingproduct){
            res.status(406).json('Already exist')

        }else{
            const newProdut = new products({
                productid,productcategory,productimage,producttitle,productdescription,productprice
            })
            await newProdut.save()
            res.status(200).json(newProdut) 
        }
         
    }
 } catch (error) {
    res.status(500).json("Error in json controller",error)
 }
}

//for display products
exports.productdisplay = async(req,res)=>{

   try {
    const productexist = await products.find()
     if(productexist){
      res.status(200).json(productexist)

   }
   } catch (error) {
    res.status(500).json("Error in json controller",error)
   }
}

//for update products
exports.productupdate = async(req,res)=>{
    
    try {
        const {id} = req.params
        const{productid,productcategory,producttitle,productdescription,productprice,productimage} = req.body
        const uploadimage = req.file?req.file.filename:productimage

        const updateproduct = await products.findByIdAndUpdate({_id:id},{productid,productcategory,productimage:uploadimage,producttitle,productdescription,productprice},{new:true})
        await updateproduct.save()
        res.status(200).json(updateproduct) 
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
          
    }
}

//for delete products
exports.productdelete = async(req,res)=>{
    
    try {
        const {id} = req.params

        const deleteproduct = await products.findByIdAndDelete({_id:id})
        res.status(200).json(deleteproduct)
        // console.log(deleteproduct);
        
    } catch (error) {
        res.status(500).json("Error in json controller",error)    
    }
}




