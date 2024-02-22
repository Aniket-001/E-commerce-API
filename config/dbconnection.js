import mongoose from "mongoose";


//Connection to the database
const connectDb = async () => await mongoose.connect(process.env.MONGO_DB);

export default connectDb;