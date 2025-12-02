import { Container, Row, Col } from "react-bootstrap";
import "../disc/css/main.css";

const ModalDelete = ({ show, onConfirm, onCancel, data }) => {
  if (!show) return null; // ⬅️ FIX PALING PENTING

  const nama =
    data?.username || data?.title || data?.name || data?.nama || "item ini";

  return (
    <div className="overlay-form fade-in">
      <style>{`
        .btn-yes {
          background-color: #28a745;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }

        .btn-yes:hover { background-color: #218838; }

        .btn-no {
          background-color: #dc3545;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
        }

        .btn-no:hover { background-color: #c82333; }
      `}</style>

      <div className="modal-content bg-white rounded shadow-sm p-4"
        style={{ maxWidth: 520, width: "90%" }}>
        <Container>
          <Row>
            <Col className="text-center">
              <h5 className="fw-bold text-dark mb-3">
                Apakah Anda Yakin Untuk Hapus Data?
              </h5>

              <p className="mb-4">
                Data yang akan dihapus: <strong>{nama}</strong>
              </p>

              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-yes" onClick={(e) => {
                  e.stopPropagation();
                  onConfirm();
                }}>
                  Iya
                </button>
                <button className="btn btn-no" onClick={onCancel}>
                  Tidak
                </button>
              </div>

            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ModalDelete;
