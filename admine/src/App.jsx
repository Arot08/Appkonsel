import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListAplikasi from "./dasbor/ListAplikasi";
import LoginUser from "./page/LoginUser";
import ResetPage from "./page/ResetPage";
import SendMail from "./page/SendMail";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import TableView from "./components/TableView";
import DataAplikasi from "./page/DataAplikasi";
import DataInformasi from "./page/DataInformasi";
import DataPengguna from "./page/DataPengguna";
import DataSearch from "./components/DataSearch";
import InsertButton from "./components/InsertButton";
import ActionButtons from "./components/ActionButtons";
import FormAplikasi from "./components/FormAplikasi";
import FormInformasi from "./components/FormInformation";
import FormPengguna from "./components/FormPengguna";
import EditProfile from "./components/EditProfile";
import ModalDelete from "./components/ModalDelete";
import Pagination from "./components/Pagination";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Halaman login publik */}
      <Route path="/" element={<LoginUser />} />
      <Route path="/login" element={<LoginUser />} />
      {<Route path="/reset" element={<ResetPage />} />}

      {/* 🔒 Semua route yang butuh login dibungkus ProtectedRoute */}
      <Route
        path="/list-aplikasi"
        element={
          <ProtectedRoute>
            <ListAplikasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/send"
        element={
          <SendMail />
        }
      />
      <Route
        path="/sidebar"
        element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/navbar"
        element={
          <ProtectedRoute>
            <Navbar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/table"
        element={
          <ProtectedRoute>
            <TableView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dataapp"
        element={
          <ProtectedRoute>
            <DataAplikasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/datainfo"
        element={
          <ProtectedRoute>
            <DataInformasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/datapengguna"
        element={
          <ProtectedRoute>
            <DataPengguna />
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-search"
        element={
          <ProtectedRoute>
            <DataSearch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/insert-data"
        element={
          <ProtectedRoute>
            <InsertButton />
          </ProtectedRoute>
        }
      />
      <Route
        path="/action-button"
        element={
          <ProtectedRoute>
            <ActionButtons />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-aplikasi"
        element={
          <ProtectedRoute>
            <FormAplikasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-informasi"
        element={
          <ProtectedRoute>
            <FormInformasi />
          </ProtectedRoute>
        }
      />
      <Route
        path="/form-pengguna"
        element={
          <ProtectedRoute>
            <FormPengguna />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/modal-delete"
        element={
          <ProtectedRoute>
            <ModalDelete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pagination-comps"
        element={
          <ProtectedRoute>
            <Pagination />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
