const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const commentsRoutes = require("./routes/comments");
const categoriesRoutes = require("./routes/categories");

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.REACT_BASE_URL }));
app.use(express.json());
app.use(cors());

app.use("/api/comments", commentsRoutes);
app.use("/api/categories", categoriesRoutes);

module.exports = app;
