import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top d-flex justify-content-between">
          {/* Kolom Kiri */}
          <Col lg="5" className="footer-brand">
            <h3 className="fw-bold">AppKonsel</h3>
            <p>
              Jl. Poros Andoolo No.1, Potoro, Andoolo, <br />
              Kabupaten Konawe Selatan, Sulawesi Tenggara 93819
            </p>
            <div className="footer-contact">
              <p>
                <i data-feather="phone"></i>{" "}
                <a href="tel:+621234567890">+62 1234 5678 90</a>
              </p>
              <p>
                <i data-feather="mail"></i>{" "}
                <a href="mailto:diskominfo@konaweselatankab.go.id">
                  diskominfo@konaweselatankab.go.id
                </a>
              </p>
            </div>
          </Col>

          {/* Kolom Tengah */}
          <Col className="footer-menu d-flex flex-column col-lg-2 col mt-lg-0 mt-5">
            <h4>Menu</h4>
            <ul>
              <li>
                <Link to="">Home</Link>
              </li>
              <li>
                <Link to="/daftar">Daftar Aplikasi</Link>
              </li>
              <li>
                <Link to="/informasi">Informasi</Link>
              </li>
            </ul>
          </Col>

          {/* Kolom Kanan */}
          <Col lg="4" className="footer-social mt-lg-0 mt-5">
            <div className="social-icons">
              <a
                href="https://www.facebook.com/diskominfokonsel"
                target="_blank"
                rel="noreferrer"
              >
                <i data-feather="facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/kominfokonsel"
                target="_blank"
                rel="noreferrer"
              >
                <i data-feather="instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/@diskominfokonsel"
                target="_blank"
                rel="noreferrer"
              >
                <i data-feather="youtube"></i>
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center footer-bottom">
            <p>
              {" "}
              &copy; Copyright {new Date().getFullYear()} Diskominfo &
              Persandian | All Right Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
