import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
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

const InformationPage = () => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
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
    fetchInformation();
  }, []);

  const getImageInforamtionSrc = (imageName) => {
    if (!imageName) return "/fallback.png"; // ubah sesuai fallback kamu
    return `${API_URL}/uploads/information/${imageName}`;
  };

  return (
    <div className="informasi-page">
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

export default InformationPage;
