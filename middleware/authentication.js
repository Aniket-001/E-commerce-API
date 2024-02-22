

//import required Libraries
import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";
import { catchAsyncError } from "../utils/asyncErrorHandler.js";
import { User } from "../models/user.js";


// Authenticate user
export const isAuthenticated = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) next(new CustomError("Login first!", 409));

    const id = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(id._id);
    if (!user) next(new CustomError("Log in first", 409));

    req.user = user;

    next();
});


