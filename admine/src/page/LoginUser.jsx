import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img/hero.png";
import "../disc/css/main.css";

import { users } from "../data/index";

const LoginUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Login gagal!");
        return;
      }

      // Simpan token di localStorage
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("email", result.data.user.email);
      localStorage.setItem("userRoleID", result.data.user.userRoleID);

      alert("Login berhasil!");
      navigate("/list-aplikasi");
    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan koneksi ke server");
    }
  };

  return (
    // Menggunakan class .login-page untuk mengatur tampilan penuh layar
    <div className="login">
      <Container fluid className="h-100 p-0">
        <Row className="h-100 g-0">
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

          {/* Kolom Kanan - Area Login */}
          <Col
            md={6}
            className="login-kanan d-flex flex-column justify-content-center text-center p-5"
          >
            <div className="login-box mx-auto">
              <h1 className="login-title">Hello !</h1>
              <h2 className="login-subtitle fw-bold mb-3">Selamat Datang !</h2>
              <p className="login-desc mb-5">
                Silakan Masuk Menggunakan Akun Anda
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="form-control login-input mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="form-control login-input mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="btn-masuk">
                  Login
                </button>

                <a href="/send" className="d-block mt-3 lupa-password-link">
                  Lupa Password ?
                </a>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Pastikan Anda mengekspor komponen Anda
export default LoginUser;
