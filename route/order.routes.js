const express =require('express')
const Router=express.Router()
const orderController=require('../controllers/order.controller')
const authMiddleware=require('../middlewares/auth')


Router.post('/save',orderController.save)
Router.delete('/delete',authMiddleware.verifyJWT,orderController.delete)
Router.put('/updateStatus',orderController.updateStatus)
Router.get('/view',orderController.view)



module.exports=Router;