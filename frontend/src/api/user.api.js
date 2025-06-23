import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (password, email) => {
  const { data } = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

export const registerUser = async (name, password, email) => {
  const { data } = await axiosInstance.post("/api/auth/register", {
    name,
    email,
    password,
  });
  return data;
};

export const logoutUser = async () => {
  try {
    const { data } = await axiosInstance.post("/api/auth/logout");
    return data;
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axiosInstance.get("/api/auth/me");
    return data;
  } catch (error) {
    // Only log if it's not a 401 error
    if (error.status !== 401) {
      console.log("Get current user failed:", error);
    }
    throw error;
  }
};

export const getAllUserUrls = async () => {
  const { data } = await axiosInstance.post("/api/user/urls");
  return data;
};
