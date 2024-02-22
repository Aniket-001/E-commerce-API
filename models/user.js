
// import required Libraries
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//User schema
const schema = new mongoose.Schema({
    name:{
        type:String,
        require: [true,"Please enter your name!"],
    },
    email:{
        type:String,
        require: [true,"Please enter your email!"],
    },
    password:{
        type:String,
        select:false,
        require: [true,"Please enter the password!"],
    },
    cart:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the model associated with the ObjectId
            },
            count: {
                type: Number,
                default: 1, // You can set a default count value if needed
            },
        },
    ],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }]
});

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

schema.methods.generateToken = function(){
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE * 24 * 60 * 60 * 1000,
    });
}



export const User = new mongoose.model('User',schema);

