const userModel = require("../model/userSchema");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt')


const signup = async (req,res,next)=>{
    const {name,email,password,confirmPassword} = req.body; //grtting those things in req body
    console.log(name,email,password,confirmPassword); //printing the information that we get
        try {
            const userInfo = userModel(req.body);
            const result = await userInfo.save() ;
        
            //form validation(Server side)
            if(!name || !email || !password || !confirmPassword){
                return res.status(400).json({
                    sucess:false,
                    massage: " every field should be filled "
                })
            }
            //validating email
            const validEmail = emailValidator.validate('email')
            if(!validEmail){
                return res.status(400).json({
                    sucess:false,
                    massage: " email id already exsists "
                })
            }
            //
            if(password!==confirmPassword    ){
                return res.status(400).json({
                    sucess:false,
                    massage: " password and confirmPassword should be same "
                })
            }
            //for the sucess  
            return res.status(200).json({
                //static data
                sucess : true ,
                data :result
            })
        } catch (error) {
            if(error === 11000){
                return res.status(400).json({
                    sucess : false,
                    message : 'Account already registered with the provided email id '
                });
            }
            return  res.status(400).json({
                sucess : false,
                message : error.message
            });
        }
}



/*signin */
const signin = async (req, res,next)=>{
    try {
            const {email,password}=req.body;
            console.log({email,password})
            //form validation(Server side)
        if( !email || !password ){
            return res.status(400).json({
                sucess:false,
                massage: " every field should be filled "
            })
        }
        //looking up in DB
        const user = await userModel
        .findOne ({
            email
        })
        .select('+password'); //getting password Explicitly because of ( password : {select : false} ) field in userSchema , without Explicit call anyone can't get the pass from DB
    
        if(!user || !( await bcrypt.compare(password ,user.password))){
            console.log(user);
            return res.status(400).json({
                sucess:false,
                massage: " invalid credentials , don't matching the user "
            })
        }
        //makling cookie
        const token = user.jwtTokan();
        user.password = undefined

        const cookieOption = {
            maxAge : 24*60*60*1000,
            httpOnly : true //restricting the clint side access of the cookie for safety perpose
        }
        res.cookie("token",token,cookieOption)
        res.status(200).json({
            sucess:true,
            data:user
        })

    } catch (error) {
        return  res.status(400).json({
            sucess : false,
            message : error.message
        });
    }

}

//gettinfg user
const getUser = async(req,res,next) =>{

    const userId = req.user.id

    try {
        const user = await userModel.findById(userId)
        return res.status(200).json({
            sucess : true,
            data : user
        })
    } catch (error) {   
        return res.status(400).json({
            sucess : false,
            data : error.message
        })
    }
}

//loging out the user 
const logOut =(req, res )=>{
    
    try {
        const cookieOption ={
            expires : new Date(),
            httpOnly : true 
        }
        res.cookie('token',null,cookieOption) //setting the token -> null
        res.status(200).json({
            sucess : true,
            message : "user loged out "
        })
    } catch (error) {
        res.status(200).json({
            sucess : false,
            message : error.massage
        })
    }
}


//path for mongoDB checking http://localhost:5050/api/auth/signup
module.exports = {
    signup,
    signin,
    getUser,
    logOut,
}