import wrapAsync from "../utils/tryCatchWrapper.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUser(name, email, password);

  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({ user, message: "registration success" });
});

export const login_user = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);

  // Set cookie with proper options
  res.cookie("accessToken", token, cookieOptions);

  // Log cookie being set (for debugging)
  console.log("Setting cookie with options:", cookieOptions);

  res.status(200).json({ user, message: "login success" });
});

export const logout_user = wrapAsync(async (req, res) => {
  // Clear the cookie by setting it to expire immediately with same settings
  res.cookie("accessToken", "", {
    ...cookieOptions,
    expires: new Date(0),
    maxAge: 0,
  });

  console.log("Clearing cookie with options:", {
    ...cookieOptions,
    expires: new Date(0),
    maxAge: 0,
  });

  res.status(200).json({ message: "logout success" });
});

export const get_current_user = wrapAsync(async (req, res) => {
  // req.user is set by authMiddleware
  res.status(200).json({ user: req.user, message: "success" });
});
