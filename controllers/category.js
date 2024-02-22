
import { Category } from "../models/category.js";
import Error from "../utils/customError.js";
import { catchAsyncError } from "../utils/asyncErrorHandler.js";
import { Product } from "../models/product.js";

export const listing = catchAsyncError(async (req, res, next) => {
    const category = await Category.find({}, { _id: 0, products: 0 });
    if (category.length == 0 || !category) return next(new Error("No category found"));

    const result = [];
    category.forEach(obj => {
        result.push(obj.category);
    });


    res.status(200).json({
        success: true,
        data: result,
        message: "Category listed successfully"
    });

});



export const listingById = catchAsyncError(async (req, res, next) => {

    const id = req.params.id;

    const category = await Category.findById(id).populate('products');


    if (!category) {
        return next(new Error(`Cannot find category`));
    }

    const products = [];

    for (const obj of category.products) {
        const details = await Product.findById(obj.id);
        products.push({ title: details.title, description: details.description, price: details.price, quantity: details.stock });
    }

    res.status(200).json({
        success: true,
        data: products,
        message: "Category listed successfully"
    });


});





