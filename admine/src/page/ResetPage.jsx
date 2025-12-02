import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import heroImage from "../assets/img/hero.png";
import "../disc/css/main.css";

const ResetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [loading, setLoading] = useState(false);

  // Ambil token dari URL
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    let valid = true;

    if (!password.trim()) {
      setPasswordError("Password wajib diisi");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword.trim()) {
      setConfirmError("Konfirmasi Password wajib diisi");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Password dan konfirmasi tidak sama");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (!valid) return;

    if (!token) {
      alert("Token reset password tidak ditemukan!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          newPassword: password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Reset password gagal!");
        setLoading(false);
        return;
      }

      alert("Password berhasil direset. Silakan login kembali.");

      navigate("/login");
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server");
      setLoading(false);
    }
  };

  return (
    <div className="reset">
      <Container fluid className="h-100 p-0">
        <Row className="h-100 g-0">

          {/* Kiri */}
          <Col
            md={6}
            className="reset-kiri d-flex flex-column align-items-center justify-content-center p-5"
          >
            <h1 className="fw-bold mb-5 app-konsel-title text-start w-100 ps-4">
              AppKonsel
            </h1>

            <img
              src={heroImage}
              alt="Aplikasi AppKonsel di Laptop"
              className="img-fluid hero-img"
            />
          </Col>

          {/* Kanan */}
          <Col
            md={6}
            className="reset-kanan d-flex flex-column justify-content-center text-center p-5"
          >
            <div className="reset-box mx-auto">
              <h1 className="reset-title">Reset Password</h1>
              <p className="reset-desc mb-5">Masukkan password baru Anda.</p>

              <form onSubmit={handleSubmit}>

                {/* Password */}
                <div className="form-group text-start mb-3">
                  <label htmlFor="password" className="reset-label fw-bold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Masukan Password Baru"
                    className={`form-control reset-input ${passwordError ? "is-invalid" : ""}`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value.trim()) setPasswordError("");
                    }}
                  />
                  {passwordError && (
                    <small className="text-danger">{passwordError}</small>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="form-group text-start mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="reset-label fw-bold"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Masukan Password Baru"
                    className={`form-control reset-input ${confirmError ? "is-invalid" : ""}`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (e.target.value.trim()) setConfirmError("");
                    }}
                  />
                  {confirmError && (
                    <small className="text-danger">{confirmError}</small>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-reset w-100"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>

                {/* Back to Login */}
                <a
                  href="/login"
                  className="btn-back-login d-inline-flex align-items-center mt-4"
                >
                  <i data-feather="arrow-left" className="me-2"></i>
                  Kembali ke halaman login
                </a>
              </form>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default ResetPage;
