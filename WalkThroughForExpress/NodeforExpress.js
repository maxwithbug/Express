const http = require("http");
const Express = require('express');
const { hostname } = require("os");
const path = require("path");
const { rejects } = require("assert");
const express = Express();

const PORT = 5020;

// const server = http.createServer((req, res) => {
//     if (req.url === "/") {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Welcome to Node JS server by Suman pakira ");
//     } else if (req.url === "/about") {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("About Page!");
//     } else if (req.url === "/contact") {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Contact Page!");
//     } else if (req.url === "/product") {
//         const options ={
//             hostname :'fakestoreapi.com',
//             path:'/products/1',
//             method : 'GET'
//         }
        
//         const apireq =  http.request(options , (apires)=>{
//             apires.on('data',(data)=>{
//                 res.statusCode = 200;
//                 res.setHeader("Content-Type", "application/json");
//                 res.end(JSON.stringify(data));
//             })
//         }) 
        
//         apireq.on('error', (error)=>{
//             console.log('server error to fatch thngs ' , error);
//         })
        
//         apireq.end()
//     } else {
//         res.statusCode = 500;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("Server Error!");
//     }
// });

// server.listen(PORT, () => {
//     console.log("Server listening on port > " + PORT);
// });





/*Same thing in Expresss */
try {
express.get('/',(req,res)=>{
    res.statusCode = 200
    res.setHeader('content type','text/plain')
    apireq.send('default page ');
});
express.get('/about',(req,res)=>{
    res.statusCode = 200
    res.setHeader('content type','html')
    apireq.send('About Page! ');
});
express.get('/contact',(req,res)=>{
    res.statusCode = 200
    res.setHeader('content type','text/plain')
    apireq.send('content page ');
});
    try{
        express.get('/product',async(req,res)=>{

            const option = {
                hostname : 'fakestoreapi.com',
                path : 'product/1',
                method :'GET'
            }
            const apiresponse = await new Promise((resolve, reject)=>{
                const req = http.request(option,(apires)=>{
                    apires.on('data',(data)=>{
                        resolve(data)
                    });
                    apires.on('error',(error)=>{
                        resolve(error)
                    });
                });
            });
            req.end()
            res.statusCode = 200
            res.setHeader('content type','application/json')
            apireq.send(apiresponse.toString());
        });
    }catch(error){
        console.log('error in fatching product',error);
    }
} catch (error) {
    console.log('server error ');
}



express.listen(PORT,()=>{
    console.log('server is working on' , PORT);
})