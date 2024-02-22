
import express from "express";
import { register, login, logout, order, getAllOrders, getOrder } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/authentication.js";

const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/orders/", isAuthenticated, getAllOrders);
router.get("/orders/:id", isAuthenticated, getOrder);
router.get("/order/:id", isAuthenticated, order);


export default router;
