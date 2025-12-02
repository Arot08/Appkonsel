import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;
const FRONTEND_KEY = import.meta.env.VITE_FRONTEND_KEY;

const FormPengguna = ({
  mode = "insert",
  appId = null,
  onClose,
  onRefresh,
}) => {
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "update");
  const [fadeClass, setFadeClass] = useState("fade-in");

  const [errors, setErrors] = useState({});

  // ===============================
  // FORM DATA
  // ===============================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userRoleID: "",
  });

  // ===============================
  // FETCH DETAIL (UPDATE)
  // ===============================
  useEffect(() => {
    if (mode !== "update" || !appId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/user/detail/${appId}`, {
          headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const d = result.data;

        setFormData({
          name: d.name ?? "",
          email: d.email ?? "",
          password: "",
          confirmPassword: "",
          userRoleID: d.userRoleID ?? "",
        });
      } catch (err) {
        setToast({
          show: true,
          type: "danger",
          message: "Gagal mengambil data pengguna",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [mode, appId]);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ===============================
  // VALIDATION
  // ===============================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nama pengguna wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";

    if (mode === "insert") {
      if (!formData.password) newErrors.password = "Password wajib diisi";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    if (!formData.userRoleID)
      newErrors.userRoleID = "Status Pengguna wajib dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // SUBMIT FORM
  // ===============================
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
          ? `${API_URL}/api/v1/user/update/${appId}`
          : `${API_URL}/api/v1/user/create`;

      const method = mode === "update" ? "PUT" : "POST";

      const payload = {
        name: formData.name,
        email: formData.email,
        userRoleID: formData.userRoleID,
        password: formData.password,
      };

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FRONTEND_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setToast({
        show: true,
        type: "success",
        message:
          mode === "update"
            ? "Berhasil update pengguna!"
            : "Berhasil menambah pengguna!",
      });

      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      setLoading(false);
      setToast({
        show: true,
        type: "danger",
        message: err.message || "Gagal menyimpan data pengguna",
      });
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (fetching) {
    return (
      <div className="overlay-form">
        <div className="text-center mt-5">Memuat data...</div>
      </div>
    );
  }

  // ===============================
  // FORM UI
  // ===============================
  return (
    <div className={`overlay-form ${fadeClass}`}>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.type}
          show={toast.show}
          autohide
          delay={3000}
          onClose={() => setToast({ ...toast, show: false })}
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
                {mode === "update" ? "Update Pengguna" : "Tambah Pengguna"}
              </h3>

              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Nama Pengguna</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    className={errors.name ? "is-invalid" : ""}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    className={errors.email ? "is-invalid" : ""}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={
                      mode === "update"
                        ? "Kosongkan jika tidak mengubah password"
                        : "Masukkan password"
                    }
                    className={errors.password ? "is-invalid" : ""}
                    onChange={handleChange}
                    value={formData.password}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Konfirmasi Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    className={errors.confirmPassword ? "is-invalid" : ""}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </Form.Group>

                {/* Role */}
                <Form.Group className="mb-3">
                  <Form.Label>Status Pengguna</Form.Label>
                  <Form.Select
                    name="userRoleID"
                    value={formData.userRoleID}
                    className={errors.userRoleID ? "is-invalid" : ""}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Status</option>
                    <option value="1">Super Admin</option>
                    <option value="2">Admin</option>
                    <option value="3">User</option>
                  </Form.Select>
                  {errors.userRoleID && (
                    <div className="invalid-feedback">{errors.userRoleID}</div>
                  )}
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={onClose}>
                    Kembali
                  </Button>

                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading
                      ? "Menyimpan..."
                      : mode === "update"
                      ? "Update Pengguna"
                      : "Tambah Pengguna"}
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

export default FormPengguna;
