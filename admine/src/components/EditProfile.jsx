import { Container, Toast, ToastContainer } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../disc/css/main.css";

const API_URL = import.meta.env.VITE_API_URL;
const FRONTEND_KEY = import.meta.env.VITE_FRONTEND_KEY;

const EditProfile = ({ onClose }) => {
  const emailLogin = localStorage.getItem("email");

  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [fade, setFade] = useState("fade-in");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ===============================
  // FETCH USER LOGIN DATA
  // ===============================
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/user/email/${emailLogin}`, {
          headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const d = result.data;

        setFormData({
          id: d.id,
          name: d.name,
          email: d.email,
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        setToast({
          show: true,
          type: "danger",
          message: "Gagal mengambil data profile",
        });
      } finally {
        setFetching(false);
      }
    };

    getUser();

    if (window.feather) window.feather.replace();
  }, []);

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto" && files && files[0]) {
      setFormData((prev) => ({ ...prev, foto: files[0] }));
      return;
    }

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

    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.email.trim()) newErrors.email = "Email wajib diisi";

    // Password optional (seperti FormPengguna update)
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===============================
  // SUBMIT PROFILE UPDATE
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
      // const payload = new FormData();
      // payload.append("name", formData.name);
      // payload.append("email", formData.email);
      // if (formData.password) payload.append("password", formData.password);

      // const res = await fetch(
      //   `${API_URL}/api/v1/user/update/${formData.id}`,
      //   {
      //     method: "PUT",
      //     headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
      //     body: payload,
      //   }
      // );

      //   const endpoint =
      //   mode === "update"
      //     ? `${API_URL}/api/v1/user/update/${appId}`
      //     : `${API_URL}/api/v1/user/create`;

      // const method = mode === "update" ? "PUT" : "POST";

      const payload = {
        name: formData.name,
        email: formData.email,
        userRoleID: formData.userRoleID,
        password: formData.password,
      };

      const res = await fetch(`${API_URL}/api/v1/user/update/${formData.id}`, {
        method: "PUT",
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
        message: "Profil berhasil diperbarui. Silakan login kembali.",
      });

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setToast({
        show: true,
        type: "danger",
        message: err.message || "Gagal memperbarui profil",
      });
      setLoading(false);
    }
  };

  // ===============================
  // CLOSE WITH ANIMATION
  // ===============================
  const handleClose = () => {
    setFade("fade-out");
    setTimeout(onClose, 300);
  };

  // ===============================
  // LOADING FETCH STATE
  // ===============================
  if (fetching) {
    return (
      <div className="overlay-form">
        <div className="text-center mt-5">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className={`overlay-form ${fade}`}>
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

      <Container
        className="form-container bg-white rounded-4 shadow-lg p-4"
        style={{ maxWidth: "600px" }}
      >
        <h4 className="fw-bold text-center mb-4">Edit Profile</h4>

        <form onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nama</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">E-mail</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password Baru</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""
                }`}
              placeholder="Kosongkan jika tidak mengubah password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Konfirmasi */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Kembali
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditProfile;
