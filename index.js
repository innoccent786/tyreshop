const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const dotenv=require('dotenv').config();
const config=require('./config/config').mongoose
const Upload=require('./upload/upload')
const cookieParser=require('cookie-parser');
const cors=require('cors');

const http=require('http')
const https=require('https');
const fs=require('fs')
const contactRoute=require('./route/contact.routes')
const userRoute=require('./route/user.routes')
const orderRoute=require('./route/order.routes')
const productRoute=require('./route/product.routes')
const authRoute=require('./route/auth.routes')
const path=require('path')

//middlewares
app.use(function (req,res,next){
 res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
 res.setHeader('Access-Control-Allow-Credentials', 'true')
       next();
})


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(Upload.single('file'));


//routes

app.use('/contacts',contactRoute)
app.use('/users',userRoute)
app.use('/orders',orderRoute)
app.use('/products',productRoute)
app.use('/auth',authRoute)

//server create/start


const server=process.env.SERVER=='http'? http.createServer(app):https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
},app);
server.listen(process.env.PORT,()=>{
    console.log("server is listening on port"+process.env.PORT)
})
