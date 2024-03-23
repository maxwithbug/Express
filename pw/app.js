const Express = require('express');
const app = Express()
const authrouter = require('./router/authrout')
const databaseconnect = require('./config/databaseconfig')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


databaseconnect();

// app.use(bodyParser.json())// (body-parser) does same work like app.use(Express.json()) 
app.use(Express.json()) //telling that the data is json , without this server will not be able to run
app.use(cookieParser()) 

app.use('/api/auth/',authrouter)

app.get('/',(req ,res )=>{
    res.status(200).json({title : 'default page'});
    
});
app.get('/about',(req ,res )=>{
    res.send('this is about page')
    
});


module.exports = app