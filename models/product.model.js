const mongoose=require('mongoose');
const productModel=new mongoose.Schema({
    tyre_name:{type:String},
    tyre_size:{type:Object},
    brand:{type:String},
    pattern:{type:String},
    load_index:{type:Number},
    speed_rating:{type:String},
    trad_dept:{type:String},
    category:{type:String},
    image:{type:String},
    date:{type:Date},
    discount:{type:String},
    quantity:{type:Number},
    price:{type:String},
    description:{type:String}
}) 
const Product=mongoose.model('products',productModel);
module.exports=Product;