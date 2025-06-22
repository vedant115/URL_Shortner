import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";
import { findOriginalUrlByShortUrl } from "../dao/shortUrl.js";
import wrapAsync from "../utils/tryCatcherWrapper.js";

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url);
  console.log("Short URL created:", process.env.BASE_URL + shortUrl);
  res.send(process.env.BASE_URL + shortUrl);
});

export const redirectToOriginalUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await findOriginalUrlByShortUrl(id);
  console.log("Redirecting to original URL:", url.originalUrl);
  res.redirect(url.originalUrl);
});
