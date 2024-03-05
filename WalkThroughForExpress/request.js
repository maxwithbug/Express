const { error } = require('console')
const http = require('http')
const { hostname } = require('os')
const path = require('path')

//server to server network call
const options ={
    hostname :'fakestoreapi.com',
    path:'/products/1',
    method : 'GET'
}

const apireq =  http.request(options , (apires)=>{
    apires.on('data',(data)=>{
        console.log('data > ' , data.toString());
    })
}) 

apireq.on('error', (error)=>{
    console.log('server error to fatch thngs ' , error);
})

apireq.end()