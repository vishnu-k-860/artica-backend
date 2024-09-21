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
        const{aud,given_name,family_name,email,picture} = req.body        
        if(!aud || !given_name || !family_name || !email){
            res.status(400).json("Login Failed")
        }else{
            const existuser = await users.findOne({googleid:aud})
            if(!existuser){
                const newuser = new users({
                    firstname:given_name,
                    lastname:family_name,
                    Email:email,
                    phone:"",
                    address:"",
                    password:"",
                    profilepic:picture,
                    role:"",
                    googleid:aud
                })
                await newuser.save()
                const token = jwt.sign({id: newuser._id},"supersecretkey1234")
                res.status(200).json({user:newuser,token})                
             }else{
                const token = jwt.sign({id: existuser._id},"supersecretkey1234")
                res.status(200).json({user:existuser,token})  
             }
        }        
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
    }
}


exports.editProfile = async(req,res)=>{
    try {
        console.log('inside editprofile');
        
        const{id} = req.params
        const{firstname,phonenumber,address} = req.body
        console.log(firstname,phonenumber,address);
        
        if(!firstname || !phonenumber || !address){
            alert('please log in..')
        }else{
            const updateprofile = await users.findByIdAndUpdate({_id:id},{firstname,phonenumber,address},{new:true})
            await updateprofile.save()
            res.status(200).json(updateprofile) 
        }
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
          
    }
}