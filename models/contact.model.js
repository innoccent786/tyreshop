const mongoose=require('mongoose')
const contactModel=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    message:{type:String},
    status:{type:String},
    date:{type:Date},
})

const Contact=mongoose.model('contacts',contactModel);
module.exports=Contact;