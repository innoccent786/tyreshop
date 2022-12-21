const express =require('express')
const Router=express.Router()
const authController=require('../controllers/auth.controller')
const authMiddleware=require('../middlewares/auth')
Router.post('/login',authController.login,authMiddleware.createJWT)
Router.post('/logout',authMiddleware.verifyJWT,authController.logout)
Router.get('/isLoggedIn',authMiddleware.setHeadersCors,authMiddleware.verifyJWT,authController.isLoggedIn)

module.exports=Router;
