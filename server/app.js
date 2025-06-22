import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/mongo.config.js";
import shortUrl from "./src/routes/shortUrl.route.js";
import { redirectToOriginalUrl } from "./src/controller/shortUrl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", shortUrl);
app.get("/:id", redirectToOriginalUrl);

app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Connected to MongoDB");
  console.log("Server running on http://localhost:3000");
});
