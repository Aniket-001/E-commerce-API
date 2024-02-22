
import express from "express";
import { listing, listingById } from "../controllers/category.js";

const router = express.Router();


router.get("/listing", listing);
router.get("/listing/:id", listingById);


export default router;
