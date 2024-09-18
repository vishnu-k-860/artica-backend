const multer = require('multer')

const storage = multer.diskStorage({
 destination:(req,file,callback)=>{
 callback(null,'./uploads')
},
 filename:(req,file,callback)=>{
    const filename = `image -${Date.now()}-${file.originalname}`
    callback(null,filename)
 }
})


const filefilter = (req,file,callback)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' ){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error('This file format is not supported..'))
    }
}


const multerconfig = multer({
    storage,filefilter
})

module.exports = multerconfig

