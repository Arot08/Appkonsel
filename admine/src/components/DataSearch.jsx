// src/components/DataSearch.jsx
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import InsertButton from "./InsertButton";
import "../disc/css/main.css";

/**
 * Komponen pencarian dinamis dengan tombol tambah data
 * @param {function} onSearch - callback ketika user mengetik pencarian
 * @param {string} title - judul kategori data aktif (Aplikasi, Informasi, Pengguna)
 * @param {function} onInsertClick - callback ketika tombol tambah data diklik
 */
const DataSearch = ({ onSearch, title, onInsertClick }) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // Menjalankan Feather icons setiap kali render
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value); // pencarian real-time
  };

  return (
    <div className="data-search d-flex justify-content-between align-items-center mb-3 p-4">
      {/* Judul Data */}
      <h5 className="fw-bold text-dark mb-0">List {title}</h5>

      {/* Kolom Pencarian + Tombol Tambah */}
      <div className="d-flex align-items-center gap-2">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={`Cari ${title.toLowerCase()}...`}
            value={keyword}
            onChange={handleSearch}
          />
          <InputGroup.Text>
            <i data-feather="search"></i>
          </InputGroup.Text>
        </InputGroup>

        {/* Tombol Insert */}
        <InsertButton onInsertClick={onInsertClick} />
      </div>
    </div>
  );
};

DataSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onInsertClick: PropTypes.func.isRequired,
};

export default DataSearch;
