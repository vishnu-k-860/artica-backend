const products = require('../models/productsschema');
const carts = require('../models/itemschema');

// Add to cart
exports.addtocarts = async (req, res) => {
    
    try {
        const { userid } = req.params;
        const { productid, productcount } = req.body;
        console.log(productid,productcount);
        
        const existinguser = await carts.findOne({ userid });


        if (existinguser) {
            const itemindex = existinguser.items.find(p => p.productid == productid);
            console.log(itemindex);

            if (itemindex) {
                itemindex.productcount += 1;
            } else {
                existinguser.items.push({ productid, productcount });
            }

            await existinguser.save();
            return res.status(200).json(existinguser);

        } else {
            const newcart = await carts.create({
                userid,
                items: [{ productid, productcount }]
            });

            await newcart.save();
            return res.status(201).json(newcart);
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log('Error in add to cart:', error);
    }
};



exports.getfromcart = async (req,res)=>{
    
    try {
        const { userid } = req.params;
        const existinguser = await carts.findOne({ userid }).populate('items.productid','producttitle productimage productdescription productprice')

       if(existinguser){
        
        res.status(200).json(existinguser)
    } else{
        res.status(400).json('empty') 

    }
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
    }
}

exports.removefromcart = async (req,res)=>{
    try {
        const {userid} = req.params;
        const {productid} = req.body 
       
         const existinguser = await carts.findOne({userid})
         if(existinguser){
            existinguser.items = existinguser.items.filter(i=>i.productid != productid)
            existinguser.save()
         }
         res.status(200).json(existinguser)
         console.log('item removed');
         
        
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
               
    }
}