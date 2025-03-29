import React, { useEffect } from "react";
import { Routes, Route, HashRouter, useLocation } from "react-router-dom";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";
import ViajesList from "./components/ViajesList/ViajesList";
import { Footer } from "./components/Footer/Footer";
import AgregarViaje from "./components/AgregarViajes/AgregarViajes";
import RutasFiltradas from "./components/RutasFiltradas/RutasFiltradas";
import ReactGA from 'react-ga4';
import Promociones from "./components/Promociones/Promociones";

const TRACKING_ID = 'G-1G6HYY75P7'; // Reemplaza con tu ID de medición
ReactGA.initialize(TRACKING_ID);

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  return null; // No renderiza nada, solo ejecuta el efecto
};

const App = () => {
  return (
    <HashRouter>
      <Analytics /> {/* Se encarga de manejar la analítica */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/agregarviajes" element={<AgregarViaje />} />
        <Route path="/verrutas" element={<RutasFiltradas />} />
        <Route path="/promociones" element={<Promociones />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
