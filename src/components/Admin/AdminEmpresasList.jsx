// src/components/Admin/AdminEmpresasList.js
import React, { useState, useEffect } from 'react';
// ... otros imports (db, collection, getDocs, react-bootstrap, LinkContainer, FaPlus) ...
import { db } from '../../services/config';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Table, Button, Spinner, Alert, Row, Col, Image } from 'react-bootstrap'; // Importa Image
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus } from 'react-icons/fa';

function AdminEmpresasList() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... fetchEmpresas (sin cambios) ...
    const fetchEmpresas = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "viajes"));
        const empresasList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmpresas(empresasList);
      } catch (err) {
        console.error("Error al cargar la lista de empresas:", err);
        setError("No se pudo cargar la lista de viajes. Revisa la consola.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresas();
  }, []);


  if (loading) { /* ... spinner ... */ }
  if (error) { /* ... alert error ... */ }

  return (
    <Container className="py-4">
      {/* --- Fila para Título y Botón Añadir (sin cambios) --- */}
      <Row className="mb-3 align-items-center justify-content-between">
        <Col xs="auto">
          <h2>Administrar Viajes / Empresas</h2>
        </Col>
        <Col xs="auto">
           <LinkContainer to="/admin/add">
              <Button variant="success">
                 <FaPlus className="me-1" /> Añadir Nuevo Viaje
              </Button>
           </LinkContainer>
        </Col>
      </Row>

      {/* --- Tabla Modificada --- */}
      {empresas.length === 0 ? (
        <Alert variant="info">No hay viajes/empresas para mostrar.</Alert>
      ) : (
        <Table striped bordered hover responsive className='shadow-sm align-middle'> {/* align-middle para centrar verticalmente */}
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Empresa</th>
              {/* NUEVAS COLUMNAS */}
              <th>Primer Destino</th>
              <th>Imagen (Ej.)</th>
              {/* FIN NUEVAS COLUMNAS */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa, index) => {
              // Obtenemos datos de la primera ruta de forma segura
              const primeraRuta = empresa.rutas?.[0]; // Acceso seguro a la primera ruta
              const primerDestino = primeraRuta?.destino_final || 'N/A';
              const urlImagen = primeraRuta?.img; // Puede ser undefined si no hay imagen

              return (
                <tr key={empresa.id}>
                  <td>{index + 1}</td>
                  <td>{empresa.empresa || 'Nombre no disponible'}</td>
                  {/* NUEVAS CELDAS */}
                  <td>{primerDestino}</td>
                  <td>
                    {urlImagen ? (
                      <Image
                        src={urlImagen}
                        alt={`Imagen de ${empresa.empresa || 'viaje'}`}
                        style={{ maxHeight: '40px', width: 'auto', maxWidth: '80px' }} // Estilo para miniatura
                        thumbnail // Añade un borde ligero
                      />
                    ) : (
                      <span className="text-muted">Sin imagen</span> // Mensaje si no hay URL
                    )}
                  </td>
                  {/* FIN NUEVAS CELDAS */}
                  <td>
                    {/* El LinkContainer sigue usando empresa.id internamente */}
                    <LinkContainer to={`/admin/edit/${empresa.id}`}>
                      <Button variant="outline-primary" size="sm">
                        Editar
                      </Button>
                    </LinkContainer>
                    {/* Botón Eliminar (futuro) */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminEmpresasList;