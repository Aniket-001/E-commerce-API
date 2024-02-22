
// import required Libraries
import mongoose from "mongoose";


//Product schema
const schema = new mongoose.Schema({
    category:{
        type:String,
        require: [true,"Please enter the category!"],
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: [true,"Please choose the product!"],
    }]
});


export const Category = new mongoose.model('Category',schema);


