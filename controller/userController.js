const users = require("../models/userschema")
const { passwordHashing, comparepassword } = require('../helpers/authhelper')
const jwt = require('jsonwebtoken')
const sendemail = require("../helpers/sendmail")

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
        const{firstname,phonenumber,address,profilepic} = req.body
        const uploadimage = req.file?req.file.filename:profilepic

        console.log(firstname,phonenumber,address);

            const updateprofile = await users.findByIdAndUpdate({_id:id},{firstname,phonenumber,address,profilepic:uploadimage},{new:true})
            await updateprofile.save()
            res.status(200).json(updateprofile) 
        
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
          
    }
}


//forget password

exports.forgetpassword = async(req,res)=>{
    const {email} = req.body

    try {
        const user = await users.findOne({Email:email})
        if(!user){
            res.status(404).json("user not found")
        }else{
            const resettoken = jwt.sign({id:user._id},"supersecretkey1234",{expiresIn:'30m'})
            const baseurl = process.env. BASE_URL
            const resetlink = `${baseurl}/resetpassword/${resettoken}`

            await sendemail(email,resetlink,user.firstname)
            res.status(200).json("Email sent successfully")
        }
    } catch (error) {
        res.status(500).json("Error in json controller")
        console.log(error);
    }
}

// save password

exports.savepassword = async(req,res)=>{
    const {token , password} =req.body
    try {
        const decode = jwt.verify(token,"supersecretkey1234")
        console.log(decode);
        
       const user = await users.findById(decode.id)
       if(!user){
         res.status(404).json('user not found')
       }else{
        const hashedpassword = await passwordHashing(password)
        user.password = hashedpassword
        user.save()
        res.status(200).json('Password Updated')
       }
    } catch (error) {
        if(error.name == 'TokenExpiredError'){
            res.status(406).json("Invalid token")
        }
        res.status(500).json("Error in json controller")
        console.log(error); 
    }

}

exports.showuser = async(req,res)=>{
   try {
    
    const user = await users.find({role :{ $ne :1}})
    if(user == 0){
        res.status(404).json("user not found")
    }else{
        res.status(200).json(user) 
    }
   } catch (error) {
    res.status(500).json("Error in json controller")
    console.log(error); 
   } 
}