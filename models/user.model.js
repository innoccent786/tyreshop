const mongoose=require('mongoose')
const userModel=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    access_token:{type:String},
})

const User=mongoose.model('users',userModel);
module.exports=User;