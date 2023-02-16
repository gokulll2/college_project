const express = require('express');
const router = express.Router();
const usersDB = require('./../models/users')
const bcrypt = require('bcrypt')

//Login API endpoint
router.post('/',async (req,res)=>{
    const {name,pwd} = req.body;
    if(!name||!pwd){
        return res.json({msg:"data not valid"})
    }
    let user = await usersDB.find({name:name});
    if(!user){
        return res.json({msg:"Invalid Username or Password"} );
    }
    const secPass = await bcrypt.compare(pwd,user[0].password,(err,res)=>{
        if(err){
            console.log(err)
        }
        return res
    });
    if(secPass){
        console.log(secPass)
        return res.json({msg:"Username or Password in invalid"})
    }
    res.json({msg:{
        id:user[0]._id,
        name:user[0].name
    }});
})

module.exports  = router