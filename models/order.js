
// import required Libraries
import mongoose from "mongoose";


//Product schema
const schema = new mongoose.Schema({
    count:{
        type:Number,
        require: [true,"Please enter the count!"],
        default:1,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    date:{
        type:Date,
        default:Date.now,
    }
});


export const Order = new mongoose.model('Order',schema);
