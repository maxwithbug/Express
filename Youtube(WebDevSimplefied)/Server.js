const Express = require('express');
const app = Express();
const PORT = 5800;

app.set('view engine','ejs') //for rendaring html

app.use(Express.static("public")) //it will show all the public files 

//simple code for static file (means that will never change) -Built in method

app.get('/',(req,res)=>{ 
    // res.send('default path noob , hehe')
    // res.status(200).json({cool:'status'});
    /*res.download();*/ //for enable downloading the current file 
    // res.status(500).json({message:'Error'});
    res.render('index',{text : 'cat cat cat'}) //rendaring a html page , but we need a view engine (like : ejs)
});




const userRouter = require('./routers/usr');
// const postRouter = require('./routers/posts');
app.use('/user',userRouter); //linking the path with the router , first is actual path then it goes to our router
/*app.use('post',userRouter); */ //you can do a post request also




app.listen(PORT,()=>{
    console.log('server running on ',PORT);
});
