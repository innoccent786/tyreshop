const Contact=require('../models/contact.model')
const contactController={
    view:async (req,res)=>{
        const contact=await Contact.find();
        if(contact.length){
            res.json({
                data:contact,
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
    viewOne:async (req,res)=>{
        const contact=await Contact.findOne({_id:req.query.id});
        if(contact){
            res.json({
                data:contact,
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
    
    updateStatus:async (req,res)=>{
        const contact=await Contact.findOneAndUpdate({_id:req.query.id},{status:req.query.status});
        if(contact){
            res.json({
                data:"success",
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
    
    save:async (req,res)=>{
        const {
            name,
            email,
            message,

            }=JSON.parse(req.body.data);
            const contact=new Contact({
                name,
                email,
                message,
                status:'pending',
                date:new Date() 
        })
        contact.save((err,result)=>{
            if(err){
                res.json({
                    data:"error",
                    status:404
                })
            }
            else{
                res.json({
                    data:"Success",
                    status:200
                })
            }
        })
    },
    
    delete:async (req,res)=>{
        const contact=await Contact.findOneAndDelete({_id:req.query.id});
        if(contact){
            res.json({
                status:200,
                data:"success!"
            })    
        }
        else{
            res.json({
                status:404,
                data:"error"
            })
        }
    }
}
module.exports=contactController