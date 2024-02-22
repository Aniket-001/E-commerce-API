
// import required Library
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

//import required modules
import errorHandler from './middleware/errorHandler.js';
import connectDb from "./config/dbconnection.js";

// import required routers
import userRoute from "./router/user.js";
import productRoute from "./router/product.js";
import categoryRoute from "./router/category.js";

const app = express();


//config dotenv file
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "./config/config.env" });
}


//unchandled error handling
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled rejection occurred! Shutting down....');

    server.close(() => {
        process.exit(1);
    });
});


//middleware
app.use(express.json());
app.use(cookieParser());


// Router
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/category", categoryRoute);



// Listening to the sever......
const server = async () => {

    connectDb().then(() => {
        console.log('Database Connected.....');
    }).catch((err) => console.log("Internal Error"));

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV === 'DEVELOPMENT' ? "Development" : "Production"} mode`);
    });

}

server();


// Error Handling Middleware
app.use(errorHandler);


// uncaught exception handling
process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log('Uncaught exception occurred! Shutting down....');
    server.close(() => {
        process.exit(1);
    });
});
