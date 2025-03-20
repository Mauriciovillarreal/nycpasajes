import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";
import ViajesList from "./components/ViajesList/ViajesList";
import { Footer } from "./components/Footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
