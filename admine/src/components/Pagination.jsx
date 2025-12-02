import "../disc/css/main.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Container fluid className="mt-3">
      <Row className="justify-content-center">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-primary"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              &laquo; Prev
            </Button>

            {/* Tombol halaman */}
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={
                  currentPage === index + 1 ? "primary" : "outline-primary"
                }
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline-primary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Pagination;
