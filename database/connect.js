//use mongoose
const mongoose =  require('mongoose')

//store the connection link into a variable from env.DATABASE
const connectionstring = process.env.DATABASE


//use connect() to establish connection,if connection success,"then(()+>{})" this part will work
mongoose.connect(connectionstring).then(()=>{
    console.log('MongoDB-Atlas: Connected Sucessfully..');
}).catch(err=>{
    console.log('connection failed',err);
    
})