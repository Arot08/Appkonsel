import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModalDelete from "./ModalDelete";
import "../disc/css/main.css";

/**
 * ActionButtons
 * Props:
 * - row : object (baris data, penting agar onDelete(row) / onUpdate(row) bisa dipanggil)
 * - onUpdate : function(row)
 * - onDelete : function(row)
 */
const ActionButtons = ({ row, onUpdate, onDelete }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, []);

  const toggleMenu = () => setMenuVisible((s) => !s);

  const handleUpdate = () => {
    setMenuVisible(false);
    if (onUpdate) onUpdate(row);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    if (onDelete) onDelete(row);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Container className="action-container">
        <Row>
          <Col className="d-flex justify-content-center position-relative">
            <button className="btn-icon" onClick={toggleMenu}>
              <i data-feather="more-horizontal"></i>
            </button>

            {menuVisible && (
              <div className="action-menu shadow-sm rounded-3">
                <button onClick={handleUpdate} className="action-item">
                  <i data-feather="edit-3"></i> Update
                </button>
                <button
                  onClick={handleDelete}
                  className="action-item text-danger"
                >
                  <i data-feather="trash-2"></i> Delete
                </button>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal konfirmasi (di dalam komponen action agar modular) */}
      {showDeleteModal && (
        <ModalDelete
          show={showDeleteModal}
          data={row}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default ActionButtons;
