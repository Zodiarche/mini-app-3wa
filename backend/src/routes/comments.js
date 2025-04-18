const express = require("express");

const {
  addComment,
  getComments,
  getCommentsByCategory,
} = require("../controllers/comments");

const router = express.Router();

router.post("/", addComment);
router.get("/", getComments);
router.get("/:categoryId", getCommentsByCategory);

module.exports = router;
