import { Container, Row, Col, Form } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fallbackImage from "../assets/img/il_no_image.webp";
import { informasi } from "../data/index";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../dist/css/home.css";

// Env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FRONTEND_KEY =
  import.meta.env.VITE_APP_FRONTEND_KEY || "myfrontendkey123";

const cleanUrl = (url) => {
  if (!url) return "#";
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url; // otomatis tambahkan https
  }
  return url;
};

const HomePage = () => {
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);
  const [info, setInfo] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data aplikasi dari API
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/application`, {
          headers: {
            Authorization: `Bearer ${FRONTEND_KEY}`,
          },
        });
        setApps(res.data?.data || []);
      } catch (err) {
        console.error("Gagal memuat aplikasi:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchInformation = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/information`, {
          headers: {
            Authorization: `Bearer ${FRONTEND_KEY}`,
          },
        });
        setInfo(res.data?.data || []);
      } catch (err) {
        console.error("Gagal memuat informasi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
    fetchInformation();
  }, []);

  // 🔹 Ambil gambar dari assets
  const getImageSrc = (imageName) => {
    if (!imageName) return "/fallback.png"; // ubah sesuai fallback kamu
    return `${API_URL}/uploads/apps/${imageName}`;
  };

  const getImageInforamtionSrc = (imageName) => {
    if (!imageName) return "/fallback.png"; // ubah sesuai fallback kamu
    return `${API_URL}/uploads/information/${imageName}`;
  };

  const filterOptions = [
    { label: "Semua", value: "Semua" },
    { label: "Website", value: "Website" },
    { label: "Mobile Apps", value: "mobile" },
  ];

  // Hitung statistik
  const totalManajemen = apps.filter(
    (a) => a.categoryName === "Manajemen Pemerintah"
  ).length;
  const totalLayananPublik = apps.filter(
    (a) => a.categoryName === "Layanan Publik"
  ).length;
  const totalWebsite = apps.filter((a) => a.type === "Website").length;
  const totalMobile = apps.filter((a) => a.type === "Mobile").length;
  const totalAll = apps.length;

  // Filter data
  const filteredAppsByType =
    filter === "Semua"
      ? apps
      : apps.filter((a) => a.type?.toLowerCase() === filter.toLowerCase());

  const searchResults = useMemo(() => {
    return filteredAppsByType.filter((a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredAppsByType, searchTerm]);

  const MAX_APPS_TO_SHOW = 12;
  const limitedAppsToShow = searchResults.slice(0, MAX_APPS_TO_SHOW);

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, [filter, searchTerm, apps]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Sedang memuat daftar aplikasi...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <header className="w-100 min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                AppKonsel <br /> <span>Pemerintah Kabupaten</span> <br />
                Konawe Selatan
              </h1>
              <p className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                AppKonsel Kabupaten Konawe Selatan menyajikan berbagai informasi
                dan layanan pemerintahan secara digital dalam satu platform,
                guna mempermudah akses bagi masyarakat dan pegawai pemerintah.
              </p>
              <button
                className="btn btn-primary btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s"
                onClick={() => navigate("/daftar")}
              >
                Lihat Aplikasi
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="hero-img"
                className="animate__animated animate__fadeInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* Daftar Aplikasi */}
      <div className="daftar w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold  animate__animated animate__fadeInUp animate__delay-1s">
                Daftar Aplikasi
              </h1>
              <p className="text-center  animate__animated animate__fadeInUp animate__delay-1s">
                Berikut Daftar Aplikasi Milik Kabupaten Konawe Selatan
              </p>
            </Col>
          </Row>

          {/* Filter & Search */}
          <Row className="filter-search-container mb-4 align-items-center">
            <Col md="8">
              <div className="filter-btns d-flex justify-content-start gap-4">
                {filterOptions.map((item) => (
                  <button
                    key={item.value}
                    className={`filter-btn ${
                      filter === item.value ? "active" : ""
                    }`}
                    onClick={() => setFilter(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </Col>
            <Col md="4">
              <Form.Control
                type="text"
                placeholder="Cari Aplikasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </Col>
          </Row>

          {/* Grid Aplikasi */}
          <Row className="aplikasi-grid">
            {limitedAppsToShow.map((app) => (
              <Col
                key={app.id}
                className="aplikasi-card"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="card-app">
                  {/* <img
                    src={getImageSrc(app.image)}
                    alt={app.title}
                    className="app-image"
                    onError={(e) => (e.target.src = "/no-image.webp")}
                  /> */}
                  <img
                    src={getImageSrc(app.image)}
                    alt={app.title}
                    style={{
                      borderRadius: "6px",
                    }}
                    onError={(e) => {
                      if (!e.target._hasError) {
                        e.target._hasError = true;
                        e.target.src = fallbackImage; // fallback image
                      }
                    }}
                  />
                  <div className="app-body">
                    <h5 className="app-title">{app.title}</h5>

                    <div className="d-flex justify-content-center gap-2 my-2">
                      <span className="badge type">{app.type}</span>
                      <span
                        className={`badge status ${
                          app.status == 2 ? "color-red" : ""
                        }`}
                      >
                        {app.statusName}
                      </span>
                    </div>

                    <div className="btn-wrapper">
                      <button
                        className={`btn btn-lihat ${
                          app.status == 2 ? "disabled" : ""
                        }`}
                        disabled={app.status == 2}
                        onClick={() =>
                          app.status != 0 && navigate(`/deskripsi/${app.id}`)
                        }
                      >
                        <i
                          data-feather={app.status == 2 ? "eye-off" : "eye"}
                        ></i>{" "}
                        {app.status == 0 ? "Tidak Tersedia" : "Lihat"}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}

            {limitedAppsToShow.length === 0 && (
              <Col xs={12} className="text-center py-5">
                <h4>Tidak ada aplikasi ditemukan.</h4>
              </Col>
            )}
          </Row>

          <Row>
            <Col className="text-center">
              <button
                className="btn btn-lihat-semua"
                onClick={() => navigate("/daftar")}
              >
                Lihat Semua Aplikasi <i data-feather="chevron-right"></i>
              </button>
            </Col>
          </Row>

          {/* Statistik */}
          <div className="statistik-section">
            <div className="stat-grid">
              <div className="stat-card-wrapper green">
                <div className="stat-card text-center">
                  <h2>{totalManajemen}</h2>
                  <p>Aplikasi Manajemen Pemerintah</p>
                </div>
              </div>

              <div className="stat-card-wrapper yellow">
                <div className="stat-card text-center">
                  <h2>{totalLayananPublik}</h2>
                  <p>Aplikasi Layanan Publik</p>
                </div>
              </div>

              <div className="stat-card-wrapper default-color">
                <div className="stat-card text-center">
                  <h2>{totalAll}</h2>
                  <p>Total Aplikasi</p>
                </div>
              </div>

              <div className="stat-card-wrapper default-color website-stat">
                <div className="stat-card text-center">
                  <h2>{totalWebsite}</h2>
                  <p>Total Website</p>
                </div>
              </div>

              <div className="stat-card-wrapper default-color android-stat">
                <div className="stat-card text-center">
                  <h2>{totalMobile}</h2>
                  <p>Total Android</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Informasi */}
      <div className="informasi py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold my-5">Informasi</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              {info.map((info) => (
                <SwiperSlide key={info.id}>
                  <a
                    href={cleanUrl(info.tautanlink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-block"
                  >
                    <div className="info-card">
                      <img
                        src={getImageInforamtionSrc(info.image)}
                        alt={`info-${info.id}`}
                      />
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
