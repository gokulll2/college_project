const express = require('express');
const router = express.Router();
const itemsDB = require('./../models/items')

//API for all the Items
router.get('/',async (req,res)=>{
    const items = await itemsDB.find({});
    res.send(items);
})

// API for getting specific Item
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    let item = await itemsDB.find({_id:id});
    res.send(item[0]);
})

//API to create new Item
router.post('/',async (req,res)=>{
    const {name,img,price,avail,type,desc} = req.body;
    if(!name || !price || !avail || !type ){
        return res.status(400).json({msg:"data not sufficient"});
    }
    let item = new itemsDB({
        name:name,
        img:(img?img:''),
        price:price,
        stock:avail,
        type:type,
        desc:(desc?desc:'')
    })
    await item.save((err,doc)=>{
        if(err){
            return res.json({msg:"Something went wrong"})
        }
    })

    res.json({msg:"Data posted"})
})


module.exports  = router