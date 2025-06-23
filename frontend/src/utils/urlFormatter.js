import { API_URL } from "../api/config.js";

export const formatShortUrl = (shortPath) => {
  return `${API_URL}/${shortPath}`;
};

export const formatDisplayUrl = (shortPath) => {
  const url = new URL(API_URL);
  return `${url.host}/${shortPath}`;
};
