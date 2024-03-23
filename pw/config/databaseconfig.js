const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/pw"

const databaseconnect =()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((con)=>{console.log(`connected to DB : ${con.connection.host}`)})
    .catch((err)=>{console.log(`error in connecting to DB` , err.message)})
}

module.exports = databaseconnect ;
