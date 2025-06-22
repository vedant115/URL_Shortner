import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js";
import urlSchema from "./src/models/shorturl.model.js";
dotenv.config("./.env");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
  const { url } = req.body;
  const shorturl = nanoid(7);
  const newShortUrl = new urlSchema({
    originalUrl: url,
    shortUrl: shorturl,
  });
  newShortUrl.save();
  res.status(201).json({
    message: "Short URL created successfully",
    shortUrl: shorturl,
  });
});

app.listen(3000, () => {
  connectDB();
  console.log("Connected to MongoDB");
  console.log("Server running on http://localhost:3000");
});
