require('dotenv').config()
const server = require('./src/app')
const connectToDB = require('./src/db/db')

connectToDB()
server.listen(3000,()=>{
    console.log(200);
})