// dependencies
const mongoose = require("mongoose")
const {Schema} = mongoose
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    name : {
        type : String ,
        require :[true , 'user name is required'],
        minLength:[5 ,'name must be atlest 5 charectors'],
        maxLength:[50,'name must be less then 50 charectors'],
        trim : true,
    },
    email : {
        type : String,
        require :[true , 'user email is required'],
        unique:[true,'already registered'],
        lowercase : true ,
    },
    password : {
        type : String,
        select : false , //The field's value is not fetched from the database when using query methods like find, findOne, etc.
    },
    confirmPassword:{
        type : String,
        select : false , //The field's value is not fetched from the database when using query methods like find, findOne, etc.
    },
    forgotPassword :{
        type : String,
    },
    forPasswordExpiryDate:{
        type :Date ,
    }
},{
    timestamps: true
});
//increpting Password using some existing middleware in mongoose ( pre) and with the help of our (bcrypt)
userSchema.pre('save',async function(next){  //before anything will be save in DB the function will execute 
    if(!this.isModified('password')){  //checking the password is modified or not 
        return next();
    }else{
        this.password = await bcrypt.hash(this.password , 10 ) //genarating in 10 random hash values
        return next();
    }
})

//custom methods for JWT(jsonwebtoken) tokan for (cookie)
userSchema.methods={
    jwtTokan(){
        return JWT.sign(
            {id:this.id , email:this.email },
            process.env.SECRET,
            {expiresIn :"24"} // Note the change from 'expirsIn' to 'expiresIn'
        )
    }
}
const userModel = mongoose.model('user',userSchema);
module.exports = userModel;