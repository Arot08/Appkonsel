import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading
  const token = localStorage.getItem("token"); // simpan token login di localStorage

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          setIsValid(false);
          return;
        }

        const res = await axios.get("/api/v1/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Token invalid:", error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  // Sambil loading
  if (isValid === null) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Memeriksa sesi...</div>;
  }

  // Jika tidak valid → redirect ke login
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // Jika valid → render halaman yang di-protect
  return children;
};

export default ProtectedRoute;
