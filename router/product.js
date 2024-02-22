
import express from "express";
import { fillData, getProduct, addProduct, removeProduct, getAllProducts, updateProduct } from "../controllers/product.js";
import { isAuthenticated } from "../middleware/authentication.js";

const router = express.Router();

// router.post("/",fillData);

router.get("/", isAuthenticated, getAllProducts);

router.route("/:id").get(getProduct)
    .post(isAuthenticated, addProduct)
    .delete(isAuthenticated, removeProduct)
    .patch(isAuthenticated, updateProduct);

export default router;
