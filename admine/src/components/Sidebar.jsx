import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import feather from "feather-icons";
import "../disc/css/main.css";

const Sidebar = ({ onMenuSelect }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth < 992
  );
  const userRoleID = localStorage.getItem("userRoleID");

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobileOrTablet(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const useHoverEvents = !isMobileOrTablet;
  const handleLogout = async () => {
    // Hapus token dari localStorage dan redirect ke login
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userRoleID");
    window.location.href = "/login";
  };

  return (
    <div
      className={`sidebar ${collapsed ? "closed" : "open"}`}
      onMouseEnter={useHoverEvents ? () => setCollapsed(false) : undefined}
      onMouseLeave={useHoverEvents ? () => setCollapsed(true) : undefined}
    >
      <Container fluid>
        <Row className="flex-column h-100">
          <Col>
            {isMobileOrTablet && (
              <div className="d-flex justify-content-between align-items-center mb-4 toggle-bar">
                {!collapsed && <h3 className="logo">AppKonsel</h3>}
                <button
                  className="btn-toggle-sidebar"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <i data-feather={collapsed ? "menu" : "x"}></i>
                </button>
              </div>
            )}

            {!isMobileOrTablet && !collapsed && (
              <h3 className="logo mb-4">AppKonsel</h3>
            )}

            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <button
                  className="nav-link d-flex align-items-center btn btn-link p-0 text-start w-100"
                  onClick={() => onMenuSelect("aplikasi")}
                >
                  <i data-feather="book-open" className="me-2"></i>
                  {(!collapsed || isMobileOrTablet) && (
                    <span>List Aplikasi</span>
                  )}
                </button>
              </li>
              <li className="nav-item mb-3">
                <button
                  className="nav-link d-flex align-items-center btn btn-link p-0 text-start w-100"
                  onClick={() => onMenuSelect("informasi")}
                >
                  <i data-feather="info" className="me-2"></i>
                  {(!collapsed || isMobileOrTablet) && <span>Informasi</span>}
                </button>
              </li>
              {userRoleID == 1 && (
                <li className="nav-item mb-3">
                  <button
                    className="nav-link d-flex align-items-center btn btn-link p-0 text-start w-100"
                    onClick={() => onMenuSelect("pengguna")}
                  >
                    <i data-feather="user" className="me-2"></i>
                    {(!collapsed || isMobileOrTablet) && <span>Pengguna</span>}
                  </button>
                </li>
              )}
              <li className="nav-item mt-auto">
                <button
                  onClick={handleLogout}
                  className="nav-link d-flex align-items-center text-danger btn btn-link p-0 text-start w-100"
                >
                  <i data-feather="log-out" className="me-2"></i>
                  {(!collapsed || isMobileOrTablet) && <span> Log-Out</span>}
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sidebar;
