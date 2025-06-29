import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice";
import { logoutUser } from "../api/user.api";
import { queryClient } from "../main.jsx";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("Starting logout process");

      // Call the logout API
      const response = await logoutUser();
      console.log("Logout API response:", response);

      // Clear any cached queries related to authentication
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.removeQueries({ queryKey: ["currentUser"] });

      // Update Redux state
      dispatch(logout());

      // Add a small delay to ensure cookies are cleared
      // await new Promise(resolve => setTimeout(resolve, 300));

      console.log("Cookies after logout:", document.cookie);

      // Navigate to home page
      navigate({ to: "/", replace: true });
      console.log("Navigated to home page");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border border-b-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link
              to={isAuthenticated ? "/dashboard" : "/"}
              className="text-xl font-bold text-gray-800"
            >
              URL Shortener
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  cursor="pointer"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  to="/auth"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
