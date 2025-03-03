import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { ViajesList } from "./components/ViajesList/ViajesList";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";

const App = () => {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
