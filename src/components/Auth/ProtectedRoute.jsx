// src/components/Auth/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';

// Recibe el usuario actual y el estado de carga como props
const ProtectedRoute = ({ user, isLoading, children }) => {
  if (isLoading) {
    // Muestra un spinner mientras se verifica el estado de autenticación
    return (
      <Container className="text-center mt-5" style={{minHeight: 'calc(100vh - 150px)'}}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Verificando acceso...</span>
        </Spinner>
        <p>Verificando acceso...</p>
      </Container>
    );
  }

  if (!user) {
    // Si no hay usuario (y no está cargando), redirige a la página de login
    // 'replace' evita que la ruta protegida quede en el historial del navegador
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario y no está cargando, renderiza el contenido protegido
  // 'children' es la forma estándar de pasar el componente a renderizar en React Router v6+
  // O puedes usar <Outlet /> si lo usas directamente en la definición de rutas anidadas
  return children ? children : <Outlet />;
};

export default ProtectedRoute;