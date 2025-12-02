import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;
const FRONTEND_KEY = import.meta.env.VITE_FRONTEND_KEY;

const FormInformation = ({
  mode = "update",
  appId = null,
  onClose,
  onRefresh,
}) => {
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "update");
  const [fadeClass, setFadeClass] = useState("fade-in");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    tautanlink: "",
    image: null,
    imageUrl: "",
  });

  // ============================================================
  // FETCH DETAIL (UPDATE)
  // ============================================================
  useEffect(() => {
    if (mode !== "update" || !appId) return;

    // fetchInformationList();

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/information/detail/${appId}`,
          {
            headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
          }
        );

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const d = result.data;

        setFormData({
          tautanlink: d.tautanlink ?? "",
          image: null,
          imageUrl: d.image ?? "",
        });
      } catch (err) {
        setToast({
          show: true,
          type: "danger",
          message: "Gagal mengambil data informasi",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [mode, appId]);

  // ============================================================
  // HANDLE INPUT
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setErrors((prev) => ({ ...prev, image: null })); // clear error

    setFormData((prev) => ({
      ...prev,
      image: file,
      imageUrl: URL.createObjectURL(file), // preview
    }));
  };
  // ============================================================
  // VALIDATION
  // ============================================================
  const validateForm = () => {
    const newErrors = {};

    // Link
    if (!formData.tautanlink.trim()) {
      newErrors.tautanlink = "Link wajib diisi";
    } else if (formData.tautanlink.length > 255) {
      newErrors.tautanlink = "Maksimal 255 karakter";
    }

    // Image required
    if (mode === "create") {
      if (!formData.image) newErrors.image = "Banner wajib diupload";
    } else {
      // mode update
      if (!formData.image && !formData.imageUrl) {
        newErrors.image = "Banner wajib diupload";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============================================================
  // SUBMIT FORM
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        show: true,
        type: "danger",
        message: "Periksa kembali input Anda",
      });
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        mode === "update"
          ? `${API_URL}/api/v1/information/update/${appId}`
          : `${API_URL}/api/v1/information/create`;

      const method = mode === "update" ? "PUT" : "POST";

      const bodyData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) bodyData.append(key, formData[key]);
      });

      const response = await fetch(endpoint, {
        method,
        headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
        body: bodyData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setToast({
        show: true,
        type: "success",
        message:
          mode === "update"
            ? "Berhasil update informasi!"
            : "Berhasil menambah informasi!",
      });

      if (onRefresh) await onRefresh();

      onClose();
    } catch (err) {
      setLoading(false);

      setToast({
        show: true,
        type: "danger",
        message: err.message || "Gagal menyimpan informasi",
      });
    }
  };

  if (fetching) {
    return (
      <div className="overlay-form">
        <div className="text-center mt-5">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className={`overlay-form ${fadeClass}`}>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.type}
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          autohide
          delay={3000}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toast.type === "success" ? "Berhasil" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="p-4 shadow-lg rounded-4 bg-white">
              <h3 className="text-center mb-4">
                {mode === "update"
                  ? "Update Data Informasi"
                  : "Tambah Data Informasi"}
              </h3>

              <Form onSubmit={handleSubmit}>
                {/* Tautan */}
                <Form.Group className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="tautanlink"
                    className={errors.tautanlink ? "is-invalid" : ""}
                    value={formData.tautanlink}
                    onChange={handleChange}
                  />
                  {errors.tautanlink && (
                    <div className="invalid-feedback">{errors.tautanlink}</div>
                  )}
                </Form.Group>

                {/* IMAGE */}
                <Form.Group className="mb-3">
                  <Form.Label>Banner</Form.Label>

                  <Form.Control
                    type="file"
                    accept="image/*"
                    className={errors.image ? "is-invalid" : ""}
                    onChange={handleImageUpload}
                  />
                  {errors.image && (
                    <div className="invalid-feedback">{errors.image}</div>
                  )}

                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="preview"
                      className="mt-2 rounded border"
                      style={{ width: "120px", height: "auto" }}
                    />
                  )}
                </Form.Group>

                {/* Tombol */}
                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={onClose}>
                    Kembali
                  </Button>

                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading
                      ? "Menyimpan..."
                      : mode === "update"
                      ? "Update Data"
                      : "Tambah Data"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormInformation;
