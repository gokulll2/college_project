const express = require('express');
const router = express.Router();
const usersDB = require('./../models/users')


router.get('/',(req,res)=>{
    res.send('purchase api')
})

//API to get all the orders by userID
router.get('/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        let user = await usersDB.find({_id:id});
        if(!user){
            return res.json({msg:'user does not exist'})
        }else{
            return res.json({msg:user[0].ItemsOrdered})
        }
    } catch (error) {
        return res.json({msg:'error occured'})
    }
})

//Placing new Order
router.post('/',async (req,res)=>{

    try{
        const {userid,list} = req.body;
        let user = await usersDB.find({_id:userid});
        if(!user){
            return res.json({msg:"user does not exist"})
        }else{
            let arr = [];
            let us = await usersDB.find({_id:userid}).then((d)=>{arr = d[0].ItemsOrdered;console.log(arr)});
            const filter = {
                _id:userid  
            }
            const update = {
                ItemsOrdered:list
            }
            
            let doc = await usersDB.findOneAndUpdate(filter, update);
            return res.json({msg:"ItemsOrder"});
        }
    }catch(e){
        res.status(500).json({msg:"Something went wrong 1"});
    }
})

//Api to cancel order
router.delete('/:userid/:orderid/delete',async (req,res)=>{
    const {userid,orderid} = req.params;

    const user = await usersDB.find({_id:userid})
    if(!user){
        return res.json({msg:"User does not exist"})
    }
    const arr = user[0].ItemsOrdered.filter((e)=>{return e.id!==orderid})
    user[0].ItemsOrdered = arr;
    const h = await usersDB.updateOne({_id:userid},user[0]);
    res.json({msg:"order cancelling succesful"})
})

module.exports  = router