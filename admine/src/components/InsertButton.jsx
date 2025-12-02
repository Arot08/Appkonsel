// src/components/InsertButton.jsx
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import "../disc/css/main.css";

const InsertButton = ({ onInsertClick }) => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <Button
      variant="primary"
      className="d-flex align-items-center gap-2 px-3"
      onClick={onInsertClick}
      style={{
        backgroundColor: "#007bff",
        borderRadius: "10px",
        border: "none",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <i
        data-feather="plus-square"
        style={{ width: "25px", height: "25px" }}
      ></i>
    </Button>
  );
};

export default InsertButton;
