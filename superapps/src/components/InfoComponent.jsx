import { Container, Row, Col } from "react-bootstrap";
import { informasi } from "../data/index";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const InfoComponent = () => {
  return (
    <div className="informasi-page">
      <div className="informasi pt-5">
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
              {informasi.map((info) => (
                <SwiperSlide key={info.id}>
                  <a
                    href={info.tautan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-block"
                  >
                    <div className="info-card">
                      <img src={info.image} alt={`info-${info.id}`} />
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

export default InfoComponent;
