// src/pages/DaftarPage.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import fallbackImage from "../assets/img/il_no_image.webp";
import "../dist/css/home.css";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

// 📁 import semua gambar dari folder apps
const appImages = import.meta.glob(
  "../assets/img/apps/*.{png,jpg,jpeg,webp,svg}",
  {
    eager: true,
    import: "default",
  }
);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FRONTEND_KEY =
  import.meta.env.VITE_APP_FRONTEND_KEY || "myfrontendkey123";

const filterOptions = [
  { label: "Semua", value: "Semua" },
  { label: "Website", value: "Website" },
  { label: "Mobile Apps", value: "mobile" }, // ← sesuai database
];

const cleanUrl = (url) => {
  if (!url) return "#";
  if (!/^https?:\/\//i.test(url)) {
    return "https://" + url; // otomatis tambahkan https
  }
  return url;
};

const DaftarPage = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [info, setInfo] = useState([]);
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchApps = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/v1/application`, {
          headers: {
            Authorization: `Bearer ${FRONTEND_KEY}`,
          },
          signal: controller.signal,
        });

        const newData = res.data?.data ?? [];
        if (!mountedRef.current) return;
        setApps(newData);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Gagal memuat aplikasi:", err);
        }
      } finally {
        if (mountedRef.current) setLoading(false);
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
    return () => controller.abort();
  }, []);

  // 🧠 Ganti nama file dengan gambar lokal
  const getImageSrc = (imageName) => {
    if (!imageName) return "/fallback.png"; // ubah sesuai fallback kamu
    return `${API_URL}/uploads/apps/${imageName}`;
  };

  const getImageInforamtionSrc = (imageName) => {
    if (!imageName) return "/fallback.png"; // ubah sesuai fallback kamu
    return `${API_URL}/uploads/information/${imageName}`;
  };

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

  const MAX_APPS_TO_SHOW = 12;

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

  const limitedAppsToShow = searchResults.slice(0, MAX_APPS_TO_SHOW);

  const filteredApps = useMemo(() => {
    let list = [...apps];

    // Filter by type, case insensitive
    if (filter !== "Semua") {
      list = list.filter((a) => a.type?.toLowerCase() === filter.toLowerCase());
    }

    // Search by title (case insensitive)
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();

      list = list.filter((a) => a.title?.toLowerCase().includes(q));
    }

    return list;
  }, [apps, filter, searchTerm]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalApps = filteredApps.length;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const paginatedApps = filteredApps.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, [filter, searchTerm, apps, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Memuat data aplikasi...</p>
      </div>
    );
  }

  return (
    <div className="daftar-page">
      <div className="daftar min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">
                Daftar Aplikasi
              </h1>
              <p className="text-center animate__animated animate__fadeInUp animate__delay-1s">
                Berikut Daftar Aplikasi Milik Kabupaten Konawe Selatan
              </p>
            </Col>
          </Row>

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
            {paginatedApps.map((app) => (
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

          {/* Pagination */}
          <div className="pagination-container d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {/* Prev */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Prev
                  </button>
                </li>

                {Array.from(
                  { length: Math.ceil(totalApps / itemsPerPage) },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}

                {/* Next */}
                <li
                  className={`page-item ${
                    currentPage === Math.ceil(totalApps / itemsPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>

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
    </div>
  );
};

export default DaftarPage;
