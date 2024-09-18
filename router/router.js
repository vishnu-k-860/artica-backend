const express = require('express')
const userController = require("../controller/userController")
const productController = require("../controller/productController")
const jwtAuthorization = require("../middleware/jwtMiddleware")
const multerconfig = require('../middleware/multerMiddleware')
const cartController = require("../controller/cartController")

const router = new express.Router()
//register 
router.post('/user/register',userController.register)
//login
router.post('/user/login',userController.login)
//add product
router.post('/admin/addproduct',jwtAuthorization,multerconfig.single('productimage'),productController.products)
//view product
router.get('/admin/productdetails',productController.productdisplay)
//edit product
router.put('/admin/productupdate/:id',jwtAuthorization,multerconfig.single('productimage'),productController.productupdate)
//delete product
router.delete('/admin/deleteproduct/:id',jwtAuthorization,productController.productdelete)

//addtocart
router.post('/user/addtocart/:userid',cartController.addtocarts)

//display from cart
router.get('/user/displayfromcart/:userid',cartController.getfromcart)

//deletefromcart
router.post('/user/deletefromcart/:userid',jwtAuthorization,cartController.removefromcart)
module.exports = router 

//googlelogin

router.post('/user/googlelogin',userController.googleRegister)
module.exports = router 
