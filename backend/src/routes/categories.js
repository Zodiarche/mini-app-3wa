import express from "express";
const router = express.Router();

import { addCategory, getCategories } from "../controllers/categories.js";

router.post("/", addCategory);
router.get("/", getCategories); // TODO: selon la catégorie

export default router;
