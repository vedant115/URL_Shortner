import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
      return;
    }
  }, [isAuthenticated, navigate]);

  // Function to toggle between login and register
  const toggleForm = () => {
    setLogin(!login);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setLogin(true)}
              className={`px-4 py-2 rounded ${
                login ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setLogin(false)}
              className={`px-4 py-2 rounded ${
                !login ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Register
            </button>
          </div>
        </div> */}

        {login ? (
          <LoginForm state={toggleForm} />
        ) : (
          <RegisterForm state={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
