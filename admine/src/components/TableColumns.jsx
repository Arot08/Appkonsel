const tableColumns = {
  aplikasi: [
    { key: "number", label: "No", type: "index", width: "40px", align: "center" },
    { key: "title", label: "Nama Aplikasi", width: "150px" },
    { key: "type", label: "Jenis Aplikasi", width: "80px" },
    { key: "image", label: "Logo", type: "image", width: "70px", align: "center" },
    { key: "tautanapp", label: "Link", width: "80px" },
    { key: "categoryName", label: "Kategori", width: "80px" },
    { key: "statusName", label: "Status", width: "100px" },
    { key: "desc", label: "Deskripsi", type: "html", width: "150px" }
  ],

  informasi: [
    { key: "number", label: "No", type: "index", width: "10px", align: "center" },
    { key: "tautanlink", label: "Link", width: "120px" },
    { key: "image", label: "Banner", type: "image", width: "120px" },
  ],

  pengguna: [
    { key: "number", label: "No", type: "index", width: "40px", align: "center" },
    { key: "name", label: "Nama", width: "150px" },
    { key: "email", label: "Email", width: "180px" },
    { key: "roleName", label: "Status Pengguna", width: "100px" }
  ]
};

export default tableColumns;
