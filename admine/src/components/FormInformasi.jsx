// src/components/FormInformasi.jsx
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { informasi } from "../data/index"; // pastikan path sesuai struktur proyekmu
import "../disc/css/main.css";

/**
 * FormInformasi
 * props:
 *  - mode: "update" | "insert"
 *  - onClose: function untuk menutup form (state-based, tidak reload)
 */
const FormInformasi = ({ mode = "update", onClose }) => {
  const dataDummy =
    informasi && informasi.length > 0
      ? informasi[0]
      : { id: null, tautan: "", image: null };

  const [formData, setFormData] = useState({
    tautan: mode === "update" ? dataDummy.tautan : "",
    image: mode === "update" ? dataDummy.image : null,
  });

  // state untuk animasi fade
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle upload banner image
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  // close with fade-out animation
  const handleCloseAnimation = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // sesuai durasi transition di css
  };

  const handleBack = () => {
    handleCloseAnimation();
  };

  // submit (POST / PUT) - siap diintegrasikan ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        mode === "update"
          ? `http://localhost:5000/api/informasi/update/${dataDummy.id ?? ""}`
          : "http://localhost:5000/api/informasi/create";

      const method = mode === "update" ? "PUT" : "POST";

      // gunakan FormData untuk mendukung file upload
      const body = new FormData();
      body.append("tautan", formData.tautan ?? "");
      // Jika image adalah File, append; jika string (path) append juga
      if (formData.image) body.append("image", formData.image);

      const response = await fetch(endpoint, {
        method,
        body,
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data informasi");
      }

      // opsional: bisa membaca hasil json jika backend mengembalikan data
      // const result = await response.json();

      alert(
        mode === "update"
          ? "Data informasi berhasil diperbarui!"
          : "Data informasi berhasil ditambahkan!"
      );
      handleCloseAnimation();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data informasi.");
    }
  };

  return (
    <div className={`overlay-form ${fadeClass}`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div
              className="p-4 shadow-lg rounded-4 bg-white"
              style={{
                maxHeight: "90vh",
                overflowY: "auto",
                animation: "zoomIn 0.3s ease",
              }}
            >
              <h3 className="text-center mb-4">
                {mode === "update"
                  ? "Update Data Informasi"
                  : "Tambah Data Informasi"}
              </h3>

              <Form onSubmit={handleSubmit}>
                {/* Tautan Link */}
                <Form.Group className="mb-3">
                  <Form.Label>Tautan Link</Form.Label>
                  <Form.Control
                    type="text"
                    name="tautan"
                    placeholder="Masukkan tautan informasi"
                    value={formData.tautan}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Gambar Banner */}
                <Form.Group className="mb-3">
                  <Form.Label>Gambar Banner</Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <i data-feather="paperclip"></i>
                    <label className="btn btn-light mb-0">
                      Upload Banner
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                    {/* Tampilkan nama file apabila ada */}
                    <div style={{ fontSize: 14, color: "#666" }}>
                      {formData.image && typeof formData.image !== "string"
                        ? formData.image.name
                        : formData.image
                        ? "Banner tersedia"
                        : "Belum ada banner"}
                    </div>
                  </div>
                </Form.Group>

                {/* Tombol Aksi */}
                <div className="d-flex justify-content-end gap-2">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleBack}
                  >
                    Kembali
                  </Button>
                  <Button variant="primary" type="submit">
                    <i
                      data-feather="plus-circle"
                      style={{ marginRight: 8, verticalAlign: "middle" }}
                    ></i>
                    {mode === "update" ? "Update Data" : "Tambah Data"}
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

export default FormInformasi;
