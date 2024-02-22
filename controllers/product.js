
// import required modules
import { Product } from "../models/product.js";
import { Category } from "../models/category.js";
import Error from "../utils/customError.js";
import { catchAsyncError } from "../utils/asyncErrorHandler.js";

//Dummy Data
import data from "../DummyData/data.js";



// to fill dummy data into the database
export const fillData = catchAsyncError(async (req, res, next) => {

  data.forEach(async (obj) => {
    const detail = await Product.create(obj);

    const id = detail._id;
    const cat = await Category.findOne({ category: detail.category });
    cat.products.push(id);
    await cat.save();
  });


  res.status(200).json({
    success: true,
    message: `Successfull!`
  })
});


// Get particular product with given id
export const getProduct = catchAsyncError(async (req, res, next) => {

  const id = req.params.id;

  const details = await Product.findById(id);

  const result = { title: details.title, category: details.category, description: details.description, price: details.price, stock: details.stock };

  res.status(200).json({
    success: true,
    data: result,
    message: `Product details!`
  })
});


// add particular product with given id to the cart
export const addProduct = catchAsyncError(async (req, res, next) => {

  const id = req.params.id;

  const cartItem = req.user.cart.find(item => item.product == id);

  if (cartItem) {
    cartItem.count = cartItem.count + 1;
  }
  else {
    req.user.cart.push({ product: id });
  }

  await req.user.save();

  res.status(200).json({
    success: true,
    message: `Successfully added to the cart!`
  })
});


// remove particular product with given id from the cart
export const removeProduct = catchAsyncError(async (req, res, next) => {

  const id = req.params.id;

  req.user.cart = req.user.cart.filter(item => item._id != id);

  await req.user.save();

  res.status(200).json({
    success: true,
    message: `Product deleted successfully!`
  })
});


// get all products from the cart
export const getAllProducts = catchAsyncError(async (req, res, next) => {

  if (req.user.cart.length == 0) return next(new Error(`Cart is Empty!`));

  const products = [];

  for (const obj of req.user.cart) {

    const details = await Product.findById(obj.product);

    products.push({ title: details.title, description: details.description, price: details.price, quantity: obj.count });
  }

  res.status(200).json({
    success: true,
    data: products,
    message: `Product details!`
  })
});


// update particular product with given id in the cart
export const updateProduct = catchAsyncError(async (req, res, next) => {

  const id = req.params.id;

  if (req.user.cart.length == 0) return next(new Error(`Cart is Empty!`));

  const cartItem = req.user.cart.find(item => item.product == id);

  if (!cartItem) return next(new Error(`Product not found!`));

  cartItem.count = cartItem.count + 1;

  await req.user.save();

  res.status(200).json({
    success: true,
    cart: req.user.cart,
    message: `Product Updated successfully!`
  })
});





