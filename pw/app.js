const Express = require('express');
const app = Express()
const authrouter = require('./router/authrout')

app.use(Express.json()) //telling that the data is json , without this server will not be able to run
app.use('/api/auth',authrouter)

app.get('/',(req ,res )=>{
    res.status(200).json({title : 'default page'});
    
});
app.get('/about',(req ,res )=>{
    res.send('this is about page')
    
});


module.exports = app