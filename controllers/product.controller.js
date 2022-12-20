const Brand = require('../models/brand.model');
const Product=require('../models/product.model')
const productController={
    view:async (req,res)=>{
        const product=await Product.find();
        if(product.length){
            res.json({
                data:product,
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
    viewQuery:async (req,res)=>{
        const {width,height,diameter,type}=req.query
        console.log(width,height,diameter,type)
        const product=await Product.find({
            $and:[
                width!='all'?{['tyre_size.width']:width}:{},
                height!='all'?{['tyre_size.height']:height}:{},
                diameter!='all'?{['tyre_size.diameter']:diameter}:{},
                type!='all'?{['tyre_size.type']:type}:{}
            ]
    });
        if(product.length){
            res.json({
                data:product,
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
        const product=await Product.findOne({_id:req.query.id});
        if(product){
            res.json({
                data:product,
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
        const {
            tyre_name,
            tyre_size,
            brand,
            pattern,
            load_index,
            speed_rating,
            trad_dept,
            category,
            image,
            discount,
            price,
            description
            }=JSON.parse(req.body.data);
            const product=await Product.findOneAndUpdate({_id:req.query.id},{
            tyre_name,
            tyre_size,
            brand,
            pattern,
            load_index,
            speed_rating,
            trad_dept,
            category,
            discount,
            price,
            description,
            image:req.file?req.file.filename:image,
        })
        if(product){
            res.json({
                data:"success",
                status:200
            })
        }
        else{
            res.json({
                data:"error",
                status:404
            })
        }
    },
    save:async (req,res)=>{
        const {
            tyre_name,
            tyre_size,
            brand,
            pattern,
            load_index,
            speed_rating,
            trad_dept,
            category,
            description,
            discount,
            price          
            }=JSON.parse(req.body.data);
            const product=new Product({
            tyre_name,
            tyre_size,
            brand,
            pattern,
            load_index,
            speed_rating,
            trad_dept,
            category,
            image:req.file.filename,
            date:new Date(),
            discount,
            price,
            description
        })
        product.save((err,result)=>{
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
        const product=await Product.findOneAndDelete({_id:req.query.id});
        if(product){
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
    },
    saveBrand:async (req,res)=>{
        const {
            name  
            }=JSON.parse(req.body.data);
            const brand=new Brand({
            name,
            image:req.file.filename,
            date:new Date(),
        })
        brand.save((err,result)=>{
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
    viewBrand:async (req,res)=>{
        const brand=await Brand.find();
        if(brand.length){
            res.json({
                data:brand,
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


}
module.exports=productController