// const Express = require('express')
// const server = Express()
const server = require('./app')
const PORT = process.env.PORT||5000





server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})