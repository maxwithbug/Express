const Express = require('express');
const { signup } = require('../controller/signup');
const authrout = Express.Router();

authrout.post("/signup",signup); //signup is a controller 


module.exports = authrout;







