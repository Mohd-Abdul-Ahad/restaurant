import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          credentials: "include",
        });

        if (response.ok) {
          setAuthorized(true);
        } else {
          navigate("/adminlogin");
        }
      } catch (error) {
        navigate("/adminlogin");
      }
    };

    checkAuth();
  }, [navigate]);

  return authorized ? children : null;
};

export default AdminProtectedRoute;
