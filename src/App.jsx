import React from "react";
import { Routes, Route,  HashRouter } from "react-router-dom";
import { Home } from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import { Nosotros } from "./components/Nosotros/Nosotros";
import ViajesList from "./components/ViajesList/ViajesList";
import { Footer } from "./components/Footer/Footer";

const App = () => {
  return (
   
     <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ViajesList />} />
        <Route path="/Nosotros" element={<Nosotros />} />
      </Routes>
      <Footer />
      </HashRouter>

  );
};

export default App;
