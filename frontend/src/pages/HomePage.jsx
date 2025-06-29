import { useEffect } from "react";
import UrlForm from "../components/UrlForm";
import { useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // This effect will run when the component mounts and whenever isAuthenticated changes
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate({ to: "/dashboard", replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
