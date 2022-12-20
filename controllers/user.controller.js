const User=require('../models/user.model')
const userController={
    view:async (req,res)=>{
        const user=await User.findOne({_id:req.userId});
        if(user){
            res.json({
                data:user,
                status:200
            })
        }
        else{
            res.json({
                data:"Not Found!",
                status:404
            })
        }
    },
    update:async (req,res)=>{
        const {email,name,password}=JSON.parse(req.body.data);
        const user=await User.findOneAndUpdate({_id:req.userId},{
            email,
            name,
            password
        })
        if(user){
            res.json({
                data:user,
                status:200
            })
        }
        else{
            res.json({
                data:"error",
                status:404
            })
        }
    }
}
module.exports=userController