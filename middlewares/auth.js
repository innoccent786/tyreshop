const jwt=require('jsonwebtoken')
const User=require('../models/user.model.js')
const authMiddleware={ 
    setHeadersCors: async (req,res,next)=>{
        res.set('Access-Control-Allow-Origin', 'https://elevenstar.sofabespoke.co.uk')
        res.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,access_token, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        res.set("Access-Control-Allow-Methods", "GET,DELETE,HEAD,OPTIONS,POST,PUT");
        res.set('Access-Control-Allow-Credentials', 'true')
       next();
    },
    createJWT:async (req,res)=>{
    const token=jwt.sign({role:req.role,user_id:req.userId},process.env.JWT_SECRET,{expiresIn:'2h'}); 
    const user=await User.findOneAndUpdate({_id:req.userId},{access_token:token});   
    res
        .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        })
        .json({status:200, message: "Success",access_token:token })
    },
    verifyJWT:async (req,res,next)=>{
        const token = req.cookies.access_token;
        console.log(token)
        if (!token) {
            res.json({
                status:403,
                message:"logged Out"
            });
        }
        else{
            try{
                const data = jwt.verify(token, process.env.JWT_SECRET);
                req.userId=data.user_id;
                req.role=data.role;
                next();
            }catch(err){
                res.json({
                    status:403,
                    message:"Loged out"
                });
            }

            
            }// Almost done
        
    },
  
}
module.exports=authMiddleware;
