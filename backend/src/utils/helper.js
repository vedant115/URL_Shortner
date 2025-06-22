import { nanoid } from "nanoid";

export const generateNanoid = (length = 7) => {
  return nanoid(length);
};
