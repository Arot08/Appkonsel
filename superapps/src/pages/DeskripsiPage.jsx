import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FRONTEND_KEY = import.meta.env.VITE_APP_FRONTEND_KEY || "myfrontendkey123";

const cleanUrl = (url) => {
  if (!url) return "#";
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url;  // otomatis tambahkan https
  }
  return url;
};

const DeskripsiPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ======================
  // FETCH DETAIL DARI API
  // ======================
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/application/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${FRONTEND_KEY}`,
          },
        });

        setApp(res.data?.data || null);
      } catch (err) {
        console.error("Gagal memuat detail aplikasi:", err);
        setError("Data aplikasi tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // feather icons
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [app]);

  // ======================
  // LOADING STATE
  // ======================
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Memuat detail aplikasi...</p>
      </Container>
    );
  }

  // ======================
  // ERROR STATE
  // ======================
  if (error || !app) {
    return (
      <Container className="py-5 text-center">
        <h3>{error}</h3>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Kembali
        </Button>
      </Container>
    );
  }

  // ======================
  // UI DETAIL
  // ======================
  return (
    <div className="deskripsi-page">
      <Container>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Detail Aplikasi</h3>
          <button
            className="btn-close-custom"
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            <i data-feather="x"></i>
          </button>
        </div>

        {/* Card Utama */}
        <div className="detail-card p-4 rounded-4 mb-4">
          <Row className="align-items-center">
            <Col md={4} className="text-center mb-3 mb-md-0">
              <img
                src={app.image}
                alt={app.title}
                className="img-fluid rounded shadow-sm"
              />
              <h6 className="mt-3 fw-semibold">{app.title}</h6>
              <Button
                className="btn-kunjungi mt-2"
                href={cleanUrl(app.tautanapp)}
                target="_blank"
              >
                Kunjungi
              </Button>
            </Col>

            {/* Detail Info */}
            <Col md={8}>
              <Row className="gy-3">
                <Col xs={6} className="d-flex align-items-start gap-2">
                  <i data-feather="monitor"></i>
                  <div>
                    <small className="text-muted d-block">Platform</small>
                    <span>{app.type}</span>
                  </div>
                </Col>

                <Col xs={6} className="d-flex align-items-start gap-2">
                  <i data-feather="toggle-right"></i>
                  <div>
                    <small className="text-muted d-block">Status</small>
                    <span>{app.availabilityName}</span>
                  </div>
                </Col>

                <Col xs={6} className="d-flex align-items-start gap-2">
                  <i data-feather="check-square"></i>
                  <div>
                    <small className="text-muted d-block">Kategori</small>
                    <span>{app.categoryName}</span>
                  </div>
                </Col>

                <Col xs={6} className="d-flex align-items-start gap-2">
                  <i data-feather="box"></i>
                  <div>
                    <small className="text-muted d-block">Pengembang</small>
                    <span>{app.developerName}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        {/* Deskripsi */}
        <div className="deskripsi-box p-3 rounded-3">
          <h5 className="fw-bold mb-2">Deskripsi</h5>
          <div
            dangerouslySetInnerHTML={{ __html: app.desc }}
          ></div>
        </div>
      </Container>
    </div>
  );
};

export default DeskripsiPage;
