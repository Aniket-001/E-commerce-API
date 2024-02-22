
import { User } from "../models/user.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";
import Error from "../utils/customError.js";
import { catchAsyncError } from "../utils/asyncErrorHandler.js";



// user  registeration
export const register = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) return next(new Error("Please fill the details!"));

    const id = await User.findOne({ email });
    if (id) return next(new Error("User Already Exist!", 409));

    const details = await User.create({ name, email, password });

    const token = details.generateToken();


    res.status(200).cookie("token", token, {
        httpOnly: true, expires: new Date(
            Date.now() + process.env.EXPIRE * 24 * 60 * 60 * 1000
        )
    }).json({
        success: true,
        user: details,
        message: `Registered Successfully!`
    })
});



// user login
export const login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) return next(new Error("Please fill the details!"));

    const details = await User.findOne({ email }).select("+password");
    if (!details) return next(new Error("Wrong Details, Please try again!", 409));

    const isMatch = await details.comparePassword(password);
    if (!isMatch) return next(new Error("Wrong Details, Please try again!", 409));

    const token = details.generateToken();

    res.status(200).cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + process.env.EXPIRE * 24 * 60 * 60 * 1000) }).json({
        success: true,
        user: details,
        message: `Hii ${details.name}, Glad to see you back`
    })
});



//  user logout
export const logout = (req, res, next) => {
    try {
        res.status(201).cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) }).json({
            success: true,
            message: 'Logged out successfully'
        });
    }
    catch (err) {
        return next(new CustomError("Unable to Loggged out, Please try again"));
    }
}


// Make an order of the products from the cart
export const order = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const cartItem = req.user.cart.find(item => item._id == id);

    if (!cartItem) return next(new Error("This product is not in the cart!"));

    req.user.cart = req.user.cart.filter(item => item._id != id);


    const order = await Order.create({
        product: cartItem.product,
        count: cartItem.count,
    });

    req.user.orders.push(order);

    await req.user.save();

    res.status(200).json({
        success: true,
        message: `Order placed successfully`,
    })

});


// Get all the orders of the user
export const getAllOrders = catchAsyncError(async (req, res, next) => {

    if (req.user.orders.length == 0) return next(new Error("You have no orders!"));

    const orders = [];

    for (const order of req.user.orders) {
        const orderData = await Order.findById(order._id);
        const product = await Product.findById(orderData.product);

        orders.push({ title: product.title, price: product.price, quantity: orderData.count, date: orderData.date.toLocaleDateString('en-US'), time: orderData.date.toLocaleTimeString('en-US') });
    }

    res.status(200).json({
        success: true,
        data: orders,
        message: `Order history!`
    })

});


// Get particular order of the user by using order id
export const getOrder = catchAsyncError(async (req, res, next) => {

    const id = req.params.id;

    const order = await Order.findById(id);

    if (!order) return next(new Error("No order found!"));

    const product = await Product.findById(order.product);

    const details = { title: product.title, price: product.price, quantity: order.count, date: order.date.toLocaleDateString('en-US'), time: order.date.toLocaleTimeString('en-US') };

    res.status(200).json({
        success: true,
        data: details,
        message: `Order history!`
    })

});
