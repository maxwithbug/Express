const Express = require('express');
const express = Express();
const { signup, getUser, logOut } = require('../controller/authControlar');
const { signin } = require('../controller/authControlar');
const jwtAuth = require('../middleware/jwtAuth');

const authrout = Express.Router();



authrout.post("/signup",signup); //signup is a controller 
authrout.post("/signin",signin);
authrout.get("/user",jwtAuth,getUser);
authrout.get("/logout",jwtAuth,logOut);



module.exports = authrout;



// {
//     "name":"new2.0",
//     "email":"new@top.com",
//     "password":"new2323",
//     "confirmPassword":"new2323"
// }