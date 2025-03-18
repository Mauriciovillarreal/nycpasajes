import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";
import AgregarViaje from "./components/AgregarViajes/AgregarViajes";
import ViajesList from "./components/ViajesList/ViajesList";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/agregar-viaje" element={<AgregarViaje />} /> {/* Nueva ruta */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
