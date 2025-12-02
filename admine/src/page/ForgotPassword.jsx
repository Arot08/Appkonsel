import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img/hero.png";
import "../disc/css/main.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal mengirim reset password!");
        return;
      }

      alert("Link reset password telah dikirim ke email Anda!");
      navigate("/"); // kembali ke login
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server");
    }
  };

  return (
    <div className="login">
      <Container fluid className="h-100 p-0">
        <Row className="h-100 g-0">

          {/* KIRI */}
          <Col
            md={6}
            className="login-kiri d-flex flex-column align-items-center justify-content-center p-5"
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

          {/* KANAN */}
          <Col
            md={6}
            className="login-kanan d-flex flex-column justify-content-center text-center p-5"
          >
            <div className="login-box mx-auto">

              <h2 className="login-title fw-bold">Reset Password</h2>
              <p className="login-desc mb-4">
                Masukan E-mail Anda. Link reset password akan dikirimkan ke E-mail ini.
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Masukan E-mail Anda"
                  className="form-control login-input mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit" className="btn-masuk mb-3">
                  Kirim
                </button>

                <a
                  href="/"
                  className="d-block mt-2 lupa-password-link"
                >
                  ← Kembali ke halaman login
                </a>
              </form>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
