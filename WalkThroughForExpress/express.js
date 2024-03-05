const Express = require('express');
const express = Express();

const PORT = process.env.PORT || 5002
console.log(PORT);

express.get('/',(req , res)=>{
    res.send('hello World !')
});

express.listen(PORT , ()=>{
    console.log('server running on ', PORT);
})

