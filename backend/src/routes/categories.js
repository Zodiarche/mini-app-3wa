const express = require("express");

const router = express.Router();

const { addCategory, getCategories } = require("../controllers/categories");

router.post("/", addCategory);
router.get("/", getCategories); // TODO: selon la catégorie

module.exports = router;
