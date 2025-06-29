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
    <div className="h-[calc(100vh-4rem)] bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
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
