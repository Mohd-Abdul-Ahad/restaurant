import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Not authenticated");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return children;
};

export default ProtectedRoute;