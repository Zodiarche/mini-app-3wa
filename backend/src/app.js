import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import categoriesRoutes from "./routes/categories.js";
import commentsRoutes from "./routes/comments.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

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
