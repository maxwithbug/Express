const Express = require("express");
const app = Express();
const PORT = 5650;

app.get('/',(req,res)=>{
    res.send("default page by suman ")
})

app.listen(PORT ,()=>{
    console.log(`server running on ${PORT}`);
})