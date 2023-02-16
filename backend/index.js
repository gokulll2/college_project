const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db')
const path = require('path')
//Routes import
const logIn = require('./routes/login')
const orders = require('./routes/orders')
const Signup = require('./routes/signup')
const purchase = require('./routes/purchase')

const  port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('./public/build'))

//Routes
app.use('/login',logIn)
app.use('/orders',orders)
app.use('/signup',Signup)
app.use('/purchase',purchase)

app.get('/',(req,res)=>{
    res.send('Hi this is server')
})

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/build/index.html'));
})

app.listen(port,()=>{
    console.log(`Server is listening at http://localhost:${port}`)
})