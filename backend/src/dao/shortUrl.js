import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, originalUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      shortUrl,
      originalUrl,
    });
    if (userId) {
      newUrl.userId = userId;
    }
    await newUrl.save();
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      throw new ConflictError("Short URL already exists");
    }
    throw new Error(error);
  }
};

export const findOriginalUrlByShortUrl = async (shortUrl) => {
  const url = await urlSchema.findOneAndUpdate(
    { shortUrl },
    { $inc: { clicks: 1 } }
  );
  return url;
};
