const express = require('express');
const router = express.Router();
const usersDB = require('./../models/users')
const bcrypt = require('bcrypt')
const fs = require('fs');

router.get('/',(req,res)=>{
    res.send('Sign up Page')
})

//API to Create New Account
router.post('/',async (req,res)=>{

    if(!req.body.name||!req.body.pwd){
        res.json({msg:'Info is not complete'});
    }
    try{
        let check = await usersDB.find({name:req.body.name});
        if(check.length>0){
            return res.status(401).json({msg:"User with same name exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.pwd,salt)
        let user = new usersDB({
            name:req.body.name,
            ItemsOrdered:[],
            password:secPass
        })
        await user.save((err,doc)=>{
            if(err){
                return res.status(400).send({message:`error occured : ${err}`})
            }
            res.status(200).json({msg:{
                id:doc._id,
                name:doc.name
            }});
        })
    }catch(e){
        res.status(400).json({msg:"Something went wrong"})
    }
})


//API to Delete an existing account
router.delete('/:id/delete',async (req,res)=>{
    const {id} = req.params;

    const u = await usersDB.findOneAndDelete({_id:id})
    if(!u){
        return res.status(404).json({msg:'No user to delete'})
    }
    res.status(200).json({msg:"Acounted deleted succesfully"})
})

module.exports  = router