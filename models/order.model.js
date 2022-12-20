const mongoose=require('mongoose')
const orderModel=new mongoose.Schema({
    name:{type:String},
    phone:{type:String},
    city:{type:String},
    postal_code:{type:String},
    address:{type:String},
    country:{type:String},
    state:{type:String},
    payment_method:{type:String},
    status:{type:String},
    products:{type:[{id:mongoose.Schema.Types.ObjectId,quantity:Number}]},
    date:{type:Date},
    email:{type:String},
    total:{type:String}
})

const Order=mongoose.model('orders',orderModel);
module.exports=Order;