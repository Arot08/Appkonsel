// src/page/DataInformasi.jsx
import { useState, useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/information`;
const DataInformasi = () => {
  const [dataInformasi, setDataInformasi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = import.meta.env.VITE_FRONTEND_KEY; // token login

        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,  // WAJIB karena pakai verifyFrontendToken
          },
        });

        const result = await res.json();

        if (res.ok) {
          setDataInformasi(result.data); // sesuai success(res, data)
        } else {
          console.error("Gagal fetch:", result.message);
        }
      } catch (error) {
        console.error("Error fetch informasi:", error);
      }
    };

    fetchData();
  }, []);

  return dataInformasi;
};

export default DataInformasi;
