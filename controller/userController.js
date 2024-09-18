const users = require("../models/userschema")
const { passwordHashing, comparepassword } = require('../helpers/authhelper')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try {
        const{ firstname,lastname,Email,phonenumber,address,password}=req.body
        if(!firstname || !lastname || !Email || !phonenumber || !address || !password ){
            res.status(401).json("Please fill the form..")
        }else{
        const existinguser = await users.findOne({Email})
        if(existinguser){
            res.status(406).json('Already exist')
        }else{
            const hashedpassword = await passwordHashing(password)
            const newUser = new users({
                firstname,lastname,Email,phonenumber,address,password:hashedpassword,profilepic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    } catch (error) {
        res.status(500).json("Error in json controller",error)
        
    }
}

exports.login = async(req,res)=>{
  const {Email,password} = req.body
    if(!Email || !password){
        res.status(401).json('please enter the details')
    }else{
      const existinguser = await users.findOne({Email})
        if(!existinguser){
          res.status(404).json('incorrect email')
        }else{
             const match = await comparepassword(password,existinguser.password)
             if(!match){
                res.status(404).json('incorrect password')
             }else{
                const token = jwt.sign({id: existinguser._id},"supersecretkey1234")
                res.status(200).json({existinguser,token})
             }
           }
        }
    } 
   
exports.googleRegister = async(req,res)=>{
    try {
        const{id,firstname,lastname,Email,profilepic} = req.body
        if(!id || !firstname || !lastname || !Email){
            res.status(400).json("Login Fialed")
        }else{
            const existuser = await users.findOne({googleid:id})
            if(!existuser){
                const newuser = new users({
                    firstname,lastname,Email,phone:"",address:"",password:"",profilepic:"",role:"",googleid:id
                    })


                await newuser.save()
                const token = jwt.sign({id: newuser._id},"supersecretkey1234")

                res.status(200).json({newuser,token})

                
             }else{
                const token = jwt.sign({id: existuser._id},"supersecretkey1234")
                res.status(200).json({existuser,token})  

             }
        }
        
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
        
 
    }
}