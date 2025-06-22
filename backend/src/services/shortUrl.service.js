import { generateNanoid } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";

export const createShortUrlWithoutUser = async (url) => {
  const shorturl = generateNanoid(7);
  if (!shorturl) throw new Error("Failed to generate short URL");
  await saveShortUrl(shorturl, url);
  return shorturl;
};

export const createShortUrlWithUser = async (url, userId) => {
  const shorturl = generateNanoid(7);
  await saveShortUrl(shorturl, url, userId);
  return shorturl;
};
