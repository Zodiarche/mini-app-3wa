import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import commentsRoutes from "./routes/comments.js";
import categoriesRoutes from "./routes/categories.js";

const router = express.Router();

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((error) => console.error("Erreur de connexion MongoDB:", error));

app.use("/api/comments", commentsRoutes);
app.use("/api/categories", categoriesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

export default app;
