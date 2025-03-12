import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ViajesList } from "./components/ViajesList/ViajesList";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";
import AgregarViaje from "./components/AgregarViajes/AgregarViajes";

const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/agregar-viaje" element={<AgregarViaje />} /> {/* Nueva ruta */}
      </Routes>
    </HashRouter>
  );
};

export default App;
