const mongoose=require('mongoose')
const brandModel=new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    date:{type:Date},
})

const Brand=mongoose.model('brands',brandModel);
module.exports=Brand;