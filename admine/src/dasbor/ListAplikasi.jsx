import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TableView from "../components/TableView";
import DataSearch from "../components/DataSearch";
import FormAplikasi from "../components/FormAplikasi";
import FormInformasi from "../components/FormInformation";
import FormPengguna from "../components/FormPengguna";
import EditProfile from "../components/EditProfile";
import ModalDelete from "../components/ModalDelete";
import Pagination from "../components/Pagination";
import DataAplikasi from "../page/DataAplikasi";
import DataInformasi from "../page/DataInformasi";
import DataPengguna from "../page/DataPengguna";
import TableColumns from "../components/TableColumns";
import { Toast, ToastContainer } from "react-bootstrap";
import "../disc/css/main.css";

const ListAplikasi = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const FRONTEND_KEY = import.meta.env.VITE_FRONTEND_KEY;
  const [aktifMenu, setAktifMenu] = useState("aplikasi");
  const [dataTampil, setDataTampil] = useState([]);
  const [dataAsli, setDataAsli] = useState([]);
  const [judul, setJudul] = useState("Data Aplikasi");
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const columns = TableColumns[aktifMenu] || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dataAplikasi = DataAplikasi();
  const dataInformasi = DataInformasi();
  const dataPengguna = DataPengguna();

  useEffect(() => {
    if (aktifMenu === "aplikasi") {
      setDataAsli(dataAplikasi);
      setJudul("Data Aplikasi");
    } else if (aktifMenu === "informasi") {
      fetchInformationList();
      setJudul("Data Informasi");
    } else if (aktifMenu === "pengguna") {
      setDataAsli(dataPengguna);
      setJudul("Data Pengguna");
    }
    setCurrentPage(1);
  }, [aktifMenu, dataAplikasi, dataInformasi, dataPengguna]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataAsli.slice(indexOfFirstItem, indexOfLastItem);
    setDataTampil(currentItems);
  }, [currentPage, dataAsli]);

  const totalPages = Math.ceil(dataAsli.length / itemsPerPage);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setDataAsli(
        aktifMenu === "aplikasi"
          ? dataAplikasi
          : aktifMenu === "informasi"
            ? dataInformasi
            : dataPengguna
      );
      return;
    }

    const lowerKeyword = keyword.toLowerCase();
    const hasil = dataAsli.filter((item) =>
      Object.values(item).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowerKeyword)
      )
    );
    setDataAsli(hasil);
    setCurrentPage(1);
  };

  const handleInsertClick = () => {
    setUpdateData(null);
    setShowInsertForm("insert");
  };

  const handleCloseForm = () => {
    setShowInsertForm(false);
    setUpdateData(null);
  };

  const handleUpdateRow = (row) => {
    setUpdateData(row.id);
    setShowInsertForm("update");
  };

  const handleDeleteRow = (row) => {
    setSelectedData(row);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (menu) => {
    if (!selectedData) return;

    try {
      const id = selectedData.id;

      setShowDeleteModal(false);
      let url = "";
      if (menu === "aplikasi") {
        url = `${API_URL}/api/v1/application/delete/${id}`;
      } else if (menu === "informasi") {
        url = `${API_URL}/api/v1/information/delete/${id}`;
      } else if (menu === "pengguna") {
        url = `${API_URL}/api/v1/user/delete/${id}`;
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${FRONTEND_KEY}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus data");
      }

      const filteredData = dataAsli.filter((item) => item.id !== id);
      setDataAsli(filteredData);

      const nama =
        selectedData?.username ||
        selectedData?.title ||
        selectedData?.name ||
        selectedData?.nama ||
        selectedData?.email ||
        "Item";

      // Tampilkan toast sukses
      setToast({
        show: true,
        type: "success",
        message: `Data "${nama}" berhasil dihapus`,
      });

    } catch (err) {
      console.error(err);

      // Tampilkan toast error
      setToast({
        show: true,
        type: "danger",
        message: err.message || "Gagal menghapus data",
      });

    } finally {
      // Reset
      setSelectedData(null);
      setShowDeleteModal(false);
    }
  };

  const fetchInformationList = async () => {
    const res = await fetch(`${API_URL}/api/v1/information`, {
      headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
    });

    const data = await res.json();
    setDataAsli(data.data || []);
  };

  const fetchUserList = async () => {
    const res = await fetch(`${API_URL}/api/v1/user`, {
      headers: { Authorization: `Bearer ${FRONTEND_KEY}` },
    });

    const data = await res.json();
    setDataAsli(data.data || []);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div
        className={`layout-container`}
      >
        <Navbar onEditProfile={() => setShowEditProfile(true)} />

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

        <Container fluid className="pt-4">
          <Row>
            <Col xs="auto" className="p-0">
              <Sidebar onMenuSelect={(menu) => setAktifMenu(menu)} />
            </Col>

            <Col className="main-content p-3 position-relative">
              <DataSearch
                onSearch={handleSearch}
                title={judul}
                onInsertClick={handleInsertClick}
              />

              <TableView
                data={dataTampil}
                onUpdateRow={handleUpdateRow}
                onDeleteRow={handleDeleteRow}
                columns={columns}
                page={currentPage}     // 1, 2, 3, ...
                pageSize={itemsPerPage}
                menuActive={aktifMenu}
              />


              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

              {showInsertForm && aktifMenu === "aplikasi" && (
                <FormAplikasi
                  mode={showInsertForm === "update" ? "update" : "insert"}
                  onClose={handleCloseForm}
                  appId={updateData}
                />
              )}
              {showInsertForm && aktifMenu === "informasi" && (
                <FormInformasi
                  mode={showInsertForm === "update" ? "update" : "insert"}
                  onClose={handleCloseForm}
                  appId={updateData}
                  onRefresh={fetchInformationList}
                />
              )}
              {showInsertForm && aktifMenu === "pengguna" && (
                <FormPengguna
                  mode={showInsertForm === "update" ? "update" : "insert"}
                  onClose={handleCloseForm}
                  appId={updateData}
                  onRefresh={fetchUserList}
                />
              )}

              {showEditProfile && (
                <EditProfile onClose={() => setShowEditProfile(false)} />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal Delete */}
      {showDeleteModal && (
        <ModalDelete
          show={showDeleteModal}
          data={selectedData}
          onConfirm={handleConfirmDelete(aktifMenu)}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

    </>
  );
};

export default ListAplikasi;
