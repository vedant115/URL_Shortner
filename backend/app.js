import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/mongo.config.js";
import short_url from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.route.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";

dotenv.config("./.env");

const app = express();

// Log environment variables for debugging
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser);

app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
