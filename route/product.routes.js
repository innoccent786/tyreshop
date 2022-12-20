const express =require('express')
const Router=express.Router()
const productController=require('../controllers/product.controller')
const authMiddleware=require('../middlewares/auth')


Router.post('/save',authMiddleware.verifyJWT,productController.save)
Router.delete('/delete',authMiddleware.verifyJWT,productController.delete)
Router.put('/update',authMiddleware.verifyJWT,productController.update)
Router.get('/view',productController.view)
Router.get('/viewOne',productController.viewOne)
Router.get('/viewQuery',productController.viewQuery)
Router.get('/viewBrand',productController.viewBrand)
Router.post('/saveBrand',authMiddleware.verifyJWT,productController.saveBrand)

module.exports=Router;