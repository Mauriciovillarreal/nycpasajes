import React, { useState, useEffect } from 'react';
import { Routes, Route, HashRouter, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { Nosotros } from './components/Nosotros/Nosotros';
import Home from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import Promociones from "./components/Promociones/Promociones";
import Login from './components/Login/Login';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import ReactGA from 'react-ga4';
import { auth } from './services/config';
import AdminViajesPanel from './components/AdminViajesPanel/AdminViajesPanel';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminEmpresasList from './components/Admin/AdminEmpresasList';
import AgregarViaje from './components/AgregarViajes/AgregarViajes';

const TRACKING_ID = 'G-1G6HYY75P7';
ReactGA.initialize(TRACKING_ID);

const Analytics = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);
  return null;
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoadingAuth(false);
      console.log("Auth State Changed:", user ? `User logged in: ${user.email}` : "User logged out");
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setIsLoadingAuth(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <HashRouter>
      <Analytics />
      <NavBar currentUser={currentUser} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agencias" element={<Nosotros />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={currentUser} isLoading={isLoadingAuth}>
              <AdminEmpresasList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute user={currentUser} isLoading={isLoadingAuth}>
              <AdminViajesPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute user={currentUser} isLoading={isLoadingAuth}>
              <AgregarViaje />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;