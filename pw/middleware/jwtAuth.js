const JWT = require('jsonwebtoken')



const jwtAuth = (req,res,next)=>{

    const token  = (req.cookies && req.cookies.token) || null
    console.log( token);
    if(!token){
        return  res.status(400).json({
            sucess : false,
            message : "not authorized"
        })
    }
    try {
        const payload = JWT.verify(token , process.env.SECRET)
        req.user({id:payload.id ,email:payload.email })
    } catch (error) {
        return res.status(400).json({
            sucess : false,
            data : error.message
        })
    }

    next() // it's very important. Otherwise the process will continue inside the jwtAuth or and can't get outside from its own.
}

module.exports = jwtAuth