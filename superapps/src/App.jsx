import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";

import HomePage from "./pages/HomePage";
import DeskripsiPage from "./pages/DeskripsiPage";
import DaftarPage from "./pages/DaftarPage";
import InformationPage from "./pages/InformationPage";

function App() {
  return (
    <div>
      <NavbarComponent />

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/daftar" Component={DaftarPage} />
        <Route path="/informasi" Component={InformationPage} />
        <Route path="/deskripsi/:id" Component={DeskripsiPage} />
      </Routes>

      <FooterComponent />
    </div>
  );
}

export default App;
