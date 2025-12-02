import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../disc/css/main.css";
import { Toast, ToastContainer } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./css/FormAplikasi.css";

const API_URL = import.meta.env.VITE_API_URL;
const FRONTEND_KEY = import.meta.env.VITE_FRONTEND_KEY;

const FormAplikasi = ({ mode = "update", appId = null, onClose }) => {
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "update");
  const [fadeClass, setFadeClass] = useState("fade-in");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    tautanapp: "",
    type: "",
    category: "",
    availability: "",
    developer: "",
    status: "",
    desc: "",
    image: null,
    imageUrl: "",
  });

  // =========================
  //  FETCH DETAIL (UPDATE)
  // =========================
  useEffect(() => {
    if (mode !== "update" || !appId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/application/detail/${appId}`, {
          headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const d = result.data;

        setFormData({
          title: d.title ?? "",
          tautanapp: d.tautanapp ?? "",
          type: d.type ?? "",
          category: String(d.category ?? ""),
          availability: String(d.availability ?? ""),
          developer: String(d.developer ?? ""),
          status: String(d.status ?? ""),
          desc: d.desc ?? "",
          image: null,
          imageUrl: d.image ?? "",
        });
      } catch (err) {
        setToast({
          show: true,
          type: "danger",
          message: "Gagal mengambil data aplikasi",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [mode, appId]);

  // =========================
  //  HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    setErrors((prev) => ({ ...prev, image: null }));

    setFormData((prev) => ({
      ...prev,
      image: file,
      imageUrl: file ? URL.createObjectURL(file) : prev.imageUrl,
    }));
  };
  // =========================
  //  VALIDATE
  // =========================
  const validateForm = () => {
    const newErrors = {};

    // Required validation
    if (!formData.title.trim()) newErrors.title = "Nama aplikasi wajib diisi";
    if (!formData.type.trim()) newErrors.type = "Jenis aplikasi wajib diisi";
    if (!formData.tautanapp.trim()) newErrors.tautanapp = "Tautan Apliasi wajib diisi";
    if (!formData.category.trim()) newErrors.category = "Kategori wajib diisi";
    if (!formData.availability.trim()) newErrors.availability = "Ketersediaan wajib diisi";
    if (!formData.status.trim()) newErrors.status = "Status wajib diisi";
    if (!formData.developer.trim()) newErrors.developer = "Pengembang wajib diisi";

    // Max length validation
    if (formData.title.length > 100)
      newErrors.title = "Maksimal 100 karakter";

    if (formData.tautanapp.length > 255)
      newErrors.tautanapp = "Maksimal 255 karakter";


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  //  SUBMIT FORM
  // =========================
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
          ? `${API_URL}/api/v1/application/update/${appId}`
          : `${API_URL}/api/v1/application/create`;

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
        message: mode === "update" ? "Berhasil update data!" : "Berhasil tambah data!",
      });

      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      setLoading(false);

      setToast({
        show: true,
        type: "danger",
        message: err.message || "Gagal menyimpan data",
      });
    } finally {
    }
  };

  if (fetching) {
    return (
      <div className="overlay-form fade-in">
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
            <div className="p-4 shadow-lg rounded-4 bg-white" style={{ maxHeight: "95vh" }} >
              <h3 className="text-center mb-4">
                {mode === "update" ? "Update Data Aplikasi" : "Tambah Data Aplikasi"}
              </h3>
              <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <Form onSubmit={handleSubmit}>

                  {/* Nama */}
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Aplikasi</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      className={errors.title ? "is-invalid" : ""}
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </Form.Group>

                  {/* Tautan */}
                  <Form.Group className="mb-3">
                    <Form.Label>Tautan Aplikasi</Form.Label>
                    <Form.Control
                      type="text"
                      name="tautanapp"
                      className={errors.tautanapp ? "is-invalid" : ""}
                      value={formData.tautanapp}
                      onChange={handleChange}
                    />
                    {errors.tautanapp && <div className="invalid-feedback">{errors.tautanapp}</div>}
                  </Form.Group>

                  {/* Type */}
                  <Form.Group className="mb-3">
                    <Form.Label>Jenis Aplikasi</Form.Label>
                    <Form.Select
                      name="type"
                      className={errors.type ? "is-invalid" : ""}
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Jenis</option>
                      <option value="Website">Website</option>
                      <option value="Mobile">Mobile</option>
                    </Form.Select>
                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                  </Form.Group>

                  {/* Category */}
                  <Form.Group className="mb-3">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Select
                      name="category"
                      className={errors.category ? "is-invalid" : ""}
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="1">Layanan Publik</option>
                      <option value="2">Manajemen Pemerintah</option>
                    </Form.Select>
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                  </Form.Group>

                  {/* Availability */}
                  <Form.Group className="mb-3">
                    <Form.Label>Ketersediaan</Form.Label>
                    <Form.Select
                      name="availability"
                      className={errors.availability ? "is-invalid" : ""}
                      value={formData.availability}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Ketersediaan</option>
                      <option value="1">Dapat Diakses</option>
                      <option value="2">Tidak Dapat Diakses</option>
                    </Form.Select>
                    {errors.availability && <div className="invalid-feedback">{errors.availability}</div>}
                  </Form.Group>

                  {/* Status */}
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      name="status"
                      className={errors.status ? "is-invalid" : ""}
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Status</option>
                      <option value="1">Aktif</option>
                      <option value="2">Tidak Aktif</option>
                      <option value="3">Maintenance</option>
                    </Form.Select>
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                  </Form.Group>

                  {/* IMAGE */}
                  <Form.Group className="mb-3">
                    <Form.Label>Logo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      className={errors.image ? "is-invalid" : ""}
                      onChange={handleImageUpload}
                    />
                    {errors.image && <div className="invalid-feedback">{errors.image}</div>}

                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="preview"
                        className="mt-2 rounded"
                        style={{ width: "120px" }}
                      />
                    )}
                  </Form.Group>

                  {/* Developer */}
                  <Form.Group className="mb-3">
                    <Form.Label>Pengembang</Form.Label>
                    <Form.Select
                      name="developer"
                      className={errors.developer ? "is-invalid" : ""}
                      value={formData.developer}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Pengembang</option>
                      <option value="1">Diskominfo & Persandian</option>
                      <option value="2">Pihak Ketiga</option>
                    </Form.Select>
                    {errors.developer && <div className="invalid-feedback">{errors.developer}</div>}
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-4">
                    <Form.Label>Deskripsi</Form.Label>
                    <div className={errors.desc ? "is-invalid border rounded p-1" : ""}>
                      <CKEditor
                        editor={ClassicEditor}
                        data={formData.desc}
                        onChange={(event, editor) =>
                          setFormData((prev) => ({ ...prev, desc: editor.getData() }))
                        }
                      />
                    </div>
                    {errors.desc && <div className="invalid-feedback d-block">{errors.desc}</div>}
                  </Form.Group>

                  {/* Buttons */}
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                      Kembali
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? "Menyimpan..." : mode === "update" ? "Update Data" : "Tambah Data"}
                    </Button>
                  </div>

                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormAplikasi;
