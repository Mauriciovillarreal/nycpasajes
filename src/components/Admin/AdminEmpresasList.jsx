import React, { useState, useEffect } from 'react';
import { db } from '../../services/config';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Table, Button, Spinner, Alert, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminEmpresasList() {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
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

  const handleAddButtonClick = () => {
    navigate('/admin/add'); // Use navigate
  };

  if (loading) {
    return (
      <Container className="py-4 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center justify-content-between">
        <Col xs="auto">
          <h2>Administrar Viajes / Empresas</h2>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleAddButtonClick}>
            <FaPlus className="me-1" /> Añadir Nuevo Viaje
          </Button>
        </Col>
      </Row>

      {empresas.length === 0 ? (
        <Alert variant="info">No hay viajes/empresas para mostrar.</Alert>
      ) : (
        <Table striped bordered hover responsive className='shadow-sm align-middle'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre Empresa</th>
              <th>Anuncia</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa, index) => {
              const primeraRuta = empresa.rutas?.[0];
              const primerDestino = primeraRuta?.destino_final || 'N/A';
              const urlImagen = primeraRuta?.img;

              return (
                <tr key={empresa.id}>
                  <td>{index + 1}</td>
                  <td>{empresa.empresa || 'Nombre no disponible'}</td>
                  <td>{primerDestino}</td>
                  <td>
                    {urlImagen ? (
                      <Image
                        src={urlImagen}
                        alt={`Imagen de ${empresa.empresa || 'viaje'}`}
                        style={{ maxHeight: '40px', width: 'auto', maxWidth: '80px' }}
                        thumbnail
                      />
                    ) : (
                      <span className="text-muted">Sin imagen</span>
                    )}
                  </td>
                  <td>
                    {/* Temporarily remove LinkContainer */}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/admin/edit/${empresa.id}`)}
                    >
                      <FaEdit className="me-1" /> Editar 
                    </Button>
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