const mongoose = require('mongoose');

const items = mongoose.model('items',{
    name : String,
    img : String,
    price : Number,
    stock : Boolean,
    type : String,
    desc : String
})

module.exports = items;