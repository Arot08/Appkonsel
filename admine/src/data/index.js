import AppsImage1 from "../assets/img/apps/apps-1.png";
import Cards2 from "../assets/img/cards/card-2.png";

export const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@appkonsel.go.id",
    password: "123456", // sebaiknya nanti di-hash kalau sudah pakai backend
    role: "Administrator",
  },
  {
    id: 2,
    username: "pegawai",
    email: "pegawai@appkonsel.go.id",
    password: "pegawai123",
    role: "User",
  },
  {
    id: 3,
    username: "guest",
    email: "guest@appkonsel.go.id",
    password: "guest123",
    role: "Guest",
  },
];

export const daftarAplikasi = [
 
];
export const informasi = [
  {
    id: 2,
    tautan: "#home",
    image: Cards2,
  },
];
