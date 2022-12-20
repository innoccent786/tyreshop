const Order=require('../models/order.model')
const orderController={
    view:async (req,res)=>{
        const order=await Order.find();
        if(order.length){
            res.json({
                data:order,
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
        const order=await Order.findOne({_id:req.query.id});
        if(order){
            res.json({
                data:order,
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
        const order=await Order.findOneAndUpdate({_id:req.query.id},{status:req.query.status});
        if(order){
            res.json({
                data:order,
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
            phone,
            city,
            postal_code,
            address,
            products,
            country,
            state,
            email,
            payment_method,
            total
            }=JSON.parse(req.body.data);
            const order=new Order({
                name,
                phone,
                city,
                postal_code,
                address,
                products,
                country,
                state,
                email,
                payment_method,
                status:'pending',
                date:new Date(),
                total
        })
        order.save((err,result)=>{
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
        const order=await Order.findOneAndDelete({_id:req.query.id});
        if(order){
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
module.exports=orderController