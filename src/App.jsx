import React from "react";
import { Routes, Route,  HashRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";
import ViajesList from "./components/ViajesList/ViajesList";
import { Footer } from "./components/Footer/Footer";
import AgregarViaje from "./components/AgregarViajes/AgregarViajes";
import RutasFiltradas from "./components/RutasFiltradas/RutasFiltradas";

const App = () => {
  return (
   
     <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/agregarviajes" element={<AgregarViaje />} />
        <Route path="/verrutas" element={<RutasFiltradas />} />
      </Routes>
      <Footer />
      </HashRouter>

  );
};

export default App;
