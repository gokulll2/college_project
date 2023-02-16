const mongoose = require('mongoose');

const usersSchema = mongoose.model('users',{
    name:String,
    ItemsOrdered:[],
    password:String
})

module.exports = usersSchema;