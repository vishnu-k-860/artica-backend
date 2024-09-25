require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router/router')
require('./database/connect')

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)
server.use('/uploads',express.static('./uploads'))


const port = 4000 || process.env.PORT 

server.get('/',(req,res)=>{
    res.send(`<h1>server is running</h1>`)
})

server.listen(port,()=>{
    console.log(`server running on port ${port} and waiting for client request `);
    
})

