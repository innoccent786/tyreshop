const express =require('express')
const Router=express.Router()
const contactController=require('../controllers/contact.controller')
const authMiddleware=require('../middlewares/auth')


Router.post('/save',contactController.save)
Router.delete('/delete',authMiddleware.verifyJWT,contactController.delete)
Router.put('/updateStatus',contactController.updateStatus)
Router.get('/view',contactController.view)
Router.get('/viewOne',contactController.viewOne)



module.exports=Router;