
import React, { useState, useEffect } from 'react';
import { db } from '../../services/config';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Para enlaces de botón

function AdminEmpresasList() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresas = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "viajes")); // <-- Obtiene todos los docs de "viajes"
        const empresasList = querySnapshot.docs.map(doc => ({
          id: doc.id, // Guarda el ID del documento
          ...doc.data() // Guarda el resto de los datos (empresa, rutas, etc.)
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
  }, []); // Se ejecuta solo una vez al montar

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando lista...</span>
        </Spinner>
        <p>Cargando lista de viajes...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>Administrar Viajes / Empresas</h2>
      {empresas.length === 0 ? (
        <Alert variant="info">No hay viajes/empresas para mostrar.</Alert>
      ) : (
        <Table striped bordered hover responsive className='shadow-sm'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Empresa</th>
              <th>ID Documento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa, index) => (
              <tr key={empresa.id}>
                <td>{index + 1}</td>
                <td>{empresa.empresa || 'Nombre no disponible'}</td>
                <td>{empresa.id}</td>
                <td>
                  {/* Este botón llevará a la página de edición específica */}
                  <LinkContainer to={`/admin/edit/${empresa.id}`}>
                    <Button variant="outline-primary" size="sm">
                      Editar
                    </Button>
                  </LinkContainer>
                  {/* Aquí podrías añadir un botón de "Eliminar" en el futuro */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
       {/* Aquí podrías añadir un botón para "Crear Nueva Empresa/Viaje" */}
       {/* <Button variant="success" className="mt-3">Crear Nuevo Viaje</Button> */}
    </Container>
  );
}

export default AdminEmpresasList;