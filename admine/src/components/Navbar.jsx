import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import "../disc/css/main.css";

const API_URL = import.meta.env.VITE_API_URL;
const FRONTEND_KEY = import.meta.env.VITE_FRONTEND_KEY;


const Navbar = ({ onEditProfile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const dropdownRef = useRef(null);
  const email = localStorage.getItem("email");
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/user/email/${email}`, {
          headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const d = result.data;
        setUserName(d.name);
        setRole(d.roleName);

      } catch (err) {
      } finally {
      }
    };
    getUser();
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-navbar shadow-sm fixed-top">
      <Container fluid>
        <Row className="align-items-center">
          {/* Kiri kosong (bisa tambahkan judul app jika mau) */}
          <Col></Col>

          {/* Kanan: Profile */}
          <Col className="d-flex justify-content-end align-items-center">
            <div
              className="profile d-flex align-items-center"
              ref={dropdownRef}
            >
              <div className="profile-info me-1 d-none d-sm-block">
                <p className="mb-0 fw-bold">{userName || "Loading..."}</p>
                <span className="status">{role || "Loading..."}</span>
              </div>

              <button
                type="button"
                className="btn-icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <i data-feather="chevron-down"></i>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu-custom">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setDropdownOpen(false);
                      onEditProfile(); // 🔹 Panggil fungsi dari parent
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
