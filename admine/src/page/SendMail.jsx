import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img/hero.png";
import emailIllustration from "../assets/img/surat.png";
import "../disc/css/main.css";

const SendMail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi required
    if (!email.trim()) {
      setEmailError("E-mail wajib diisi");
      return;
    } else {
      setEmailError("");
    }

    setLoading(true); // Disable button + loading ON

    try {
      const response = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal mengirim reset password!");
        setLoading(false);
        return;
      }

      alert("Link reset password telah dikirim ke email Anda!");
      navigate("/");
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <div className="send">
      <Container fluid className="h-100 p-0">
        <Row className="h-100 g-0">
          <Col
            md={6}
            className="send-kiri d-flex flex-column align-items-center justify-content-center p-5"
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

          <Col
            md={6}
            className="send-kanan d-flex flex-column justify-content-center text-center p-5"
          >
            <div className="send-box mx-auto">
              <img
                src={emailIllustration}
                alt="Ilustrasi Email"
                className="send-illustration mb-4"
              />

              <h1 className="send-title fw-bold">Reset Password</h1>
              <h2 className="send-subtitle fw-bold mb-3">
                Masukan E-mail Anda
              </h2>

              <p className="send-desc mb-4">
                Link reset password akan dikirimkan ke E-mail ini.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group text-start mb-2">
                  <label htmlFor="email" className="send-label fw-bold">
                    E-mail
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Masukan E-mail Anda"
                    className={`form-control send-input ${
                      emailError ? "is-invalid" : ""
                    }`}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value.trim()) setEmailError("");
                    }}
                  />

                  {/* Pesan error */}
                  {emailError && (
                    <small className="text-danger">{emailError}</small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-send w-100"
                  disabled={loading}
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>

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

export default SendMail;
