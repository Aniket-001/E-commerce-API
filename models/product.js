
// import required Libraries
import mongoose from "mongoose";


//Product schema
const schema = new mongoose.Schema({
    title:{
        type:String,
        require: [true,"Please enter the title!"],
    },
    category:{
        type: String,
        require: [true,"Please enter the category!"],
    },
    description:{
        type:String,
        require: [true,"Please enter your description!"],
    },
    stock:{
        type:Number,
        require: [true,"Please enter the stock!"],
    },
    price:{
        type:Number,
        require: [true,"Please enter the price!"],
    }


});


export const Product = new mongoose.model('Product',schema);
