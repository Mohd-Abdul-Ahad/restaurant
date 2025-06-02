import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TableReservationProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/tablereservation", {
          credentials: "include",
        });

        if (response.ok) {
          setAuthorized(true);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return authorized ? children : null;
};

export default TableReservationProtectedRoute;
