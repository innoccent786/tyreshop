const express=require('express');
const User=require('../models/user.model')
const authController={    
    login:async (req,res,next)=>{
        const {email,password}=JSON.parse(req.body.data);
        const user=await User.findOne({email:email,password:password});
        console.log(user)
        if(user){
          req.userId=user._id  
        next();
    }
        else
        res.json({
            status:203,
            message:"Invalid Login!"
        })
    },
    isLoggedIn:async (req,res)=>{
        res.json({status:200,loggedIn:true})
    },
    logout:async (req,res,next)=>{
        res.clearCookie('access_token',{
            httpOnly:true,
            secure:false
        }).send(200).json({
            message:"Logout successfully! "
        })
    }
}
module.exports=authController;