const express =require('express')
const Router=express.Router()
const userController=require('../controllers/user.controller')
const authMiddleware=require('../middlewares/auth')


Router.put('/update',authMiddleware.verifyJWT,userController.update)
Router.get('/view',authMiddleware.verifyJWT,userController.view)



module.exports=Router;