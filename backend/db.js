const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

//Connecting DataBase
mongoose.connect('mongodb+srv://harsh:GCRWaqviuO437EWI@e-commerce.ven2c9a.mongodb.net/ete-ecommerce',(err)=>{
    if(err){
        console.log('Error in connection : \n'+ err)
        return;
    }
    console.log('connection successful')
})