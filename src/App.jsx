// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter, useLocation } from 'react-router-dom';
import { Home } from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Nosotros } from './components/Nosotros/Nosotros';
import ViajesList from './components/ViajesList/ViajesList';
import { Footer } from './components/Footer/Footer';
// import AgregarViaje from './components/AgregarViajes/AgregarViajes'; // ¿Quizás esto también deba ser protegido?
import RutasFiltradas from './components/RutasFiltradas/RutasFiltradas';
import Promociones from "./components/Promociones/Promociones";
import Login from './components/Login/Login'; // <-- Importa Login
import { onAuthStateChanged, signOut } from 'firebase/auth'; // <-- Importa onAuthStateChanged y signOut
import ReactGA from 'react-ga4';
import { auth } from './services/config';
import AdminViajesPanel from './components/AdminViajesPanel/AdminViajesPanel';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminEmpresasList from './components/Admin/AdminEmpresasList';


// --- Configuración Google Analytics (sin cambios) ---
const TRACKING_ID = 'G-1G6HYY75P7';
ReactGA.initialize(TRACKING_ID);

const Analytics = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search }); // Incluir search por si acaso
  }, [location]);
  return null;
};

// --- Componente Principal App ---
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Estado para saber si la verificación inicial terminó

  // --- Efecto para escuchar cambios en la autenticación ---
  useEffect(() => {
    // onAuthStateChanged devuelve una función para desuscribirse
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Establece el usuario (puede ser null si no está logueado)
      setIsLoadingAuth(false); // Indica que la verificación inicial ya se hizo
      console.log("Auth State Changed:", user ? `User logged in: ${user.email}` : "User logged out");
    });

    // Limpieza: Desuscribirse al desmontar el componente
    return () => unsubscribe();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // --- Función de Logout ---
  const handleLogout = async () => {
    setIsLoadingAuth(true); // Opcional: mostrar carga durante el logout
    try {
      await signOut(auth);
      // onAuthStateChanged se encargará de actualizar currentUser a null
      // Podrías redirigir a home si lo deseas: navigate('/'); (necesitarías useNavigation aquí)
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      // setIsLoadingAuth(false); // onAuthStateChanged ya lo hará
    }
  };

  return (
    <HashRouter>
    <Analytics />
    <NavBar currentUser={currentUser} handleLogout={handleLogout} />
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/" element={<Home />} />
      {/* ... otras rutas públicas ... */}
      <Route path="/catalogo" element={<ViajesList />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/verrutas" element={<RutasFiltradas />} />
      <Route path="/promociones" element={<Promociones />} />
      <Route path="/login" element={<Login />} />

      {/* --- Rutas de Admin Protegidas --- */}
      <Route
        path="/admin" // Ruta principal del admin
        element={
          <ProtectedRoute user={currentUser} isLoading={isLoadingAuth}>
            {/* Renderiza la lista de empresas/viajes */}
            <AdminEmpresasList />
          </ProtectedRoute>
        }
      />
       <Route
        path="/admin/edit/:id" // Ruta para editar un viaje específico (:id es el parámetro)
        element={
          <ProtectedRoute user={currentUser} isLoading={isLoadingAuth}>
            {/* Renderiza el panel de edición, que tomará el ID de la URL */}
            <AdminViajesPanel />
          </ProtectedRoute>
        }
      />

      {/* Considera proteger también AgregarViaje si es necesario */}
      {/* <Route path="/agregarviajes" element={...} /> */}

    </Routes>
    <Footer />
  </HashRouter>
  );
};

export default App;