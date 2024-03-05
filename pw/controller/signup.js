const signup =(req,res,next)=>{
    const {name , email , password , confirmpassword}= req.body; //grtting those things in req body
    console.log(name , email , password , confirmpassword); //printing the information that we get
    return res.status(200).json({
        //static data
        sucess : true ,
        data :{

        }

    })
}


module.exports = {
    signup
}