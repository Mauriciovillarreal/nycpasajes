// src/components/AdminViajesPanel.js
import React, { useState, useEffect, useCallback } from 'react';
// Importa useParams para leer parámetros de la URL
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/config';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import RutaEditor from '../RutaEditor/RutaEditor';

function AdminViajesPanel() {
  // --- Obtener ID de la URL ---
  const { id } = useParams(); // Obtiene el ':id' de la ruta /admin/edit/:id
  const navigate = useNavigate(); // Para volver a la lista después de guardar

  // --- Estados (ya no necesitamos useState para documentId) ---
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // --- Función para Cargar Datos (ahora depende del 'id' de la URL) ---
  const fetchData = useCallback(async () => {
    if (!id) { // Si no hay ID en la URL, no hacer nada o mostrar error
      setError("No se especificó un ID de documento en la URL.");
      setLoading(false);
      return;
    }
    console.log("Fetching data for document ID:", id); // Log para depuración
    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    setEmpresaData(null); // Limpiar datos previos
    try {
      const docRef = doc(db, "viajes", id); // <-- USA EL ID DE useParams y la colección "viajes"
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmpresaData(docSnap.data());
      } else {
        setError(`No se encontró el documento con ID: ${id}`);
      }
    } catch (err) {
      console.error(`Error al cargar datos para ID ${id}:`, err);
      setError("Error al cargar los datos desde Firebase. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  }, [id]); // <-- fetchData ahora depende del 'id' de la URL

  // --- Carga inicial de datos (se ejecuta cuando 'fetchData' o 'id' cambian) ---
  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData incluye 'id' como dependencia por useCallback

  // --- Manejo de Cambios (sin cambios en la lógica interna) ---
  const handleEmpresaChange = (e) => { /* ... igual que antes ... */
    const { name, value } = e.target;
    setEmpresaData(prevData => ({ ...prevData, [name]: value }));
    setSaveSuccess(false);
  };
  const handleRutaChange = (rutaIndex, fieldName, value) => { /* ... igual que antes ... */
    setEmpresaData(prevData => {
      const nuevasRutas = JSON.parse(JSON.stringify(prevData.rutas));
      if (nuevasRutas[rutaIndex]) {
        nuevasRutas[rutaIndex] = { ...nuevasRutas[rutaIndex], [fieldName]: value };
      }
      return { ...prevData, rutas: nuevasRutas };
    });
    setSaveSuccess(false);
  };
  const handleParadaChange = (rutaIndex, paradaType, paradaIndex, fieldName, value) => { /* ... igual que antes ... */
    setEmpresaData(prevData => {
      const nuevasRutas = JSON.parse(JSON.stringify(prevData.rutas));
      if (nuevasRutas[rutaIndex]?.paradas?.[paradaType]?.[paradaIndex]) {
        const isPriceField = fieldName === 'precioSemi' || fieldName === 'precioCama';
        nuevasRutas[rutaIndex].paradas[paradaType][paradaIndex][fieldName] = isPriceField ? String(value) : value;
      } else {
        console.warn("Índice inválido al actualizar parada:", { rutaIndex, paradaType, paradaIndex });
      }
      return { ...prevData, rutas: nuevasRutas };
    });
    setSaveSuccess(false);
  };

  // --- Guardar Cambios (ahora usa el 'id' de la URL) ---
  const handleSaveChanges = async () => {
    if (!id || !empresaData) { // Verifica el id de la URL
      setError("No hay datos para guardar o falta ID del documento.");
      return;
    }
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);
    try {
      const docRef = doc(db, "viajes", id); // <-- USA EL ID DE useParams
      await updateDoc(docRef, empresaData);
      setSaveSuccess(true);
      // Opcional: Redirigir a la lista después de guardar
      // setTimeout(() => navigate('/admin'), 1500); // Espera 1.5s antes de redirigir
    } catch (err) {
      console.error("Error al guardar datos:", err);
      setError("Error al guardar los datos en Firebase. Revisa la consola.");
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  // --- Renderizado (Añadimos botón para volver y usamos el 'id' en mensajes) ---
  if (loading) { /* ... igual que antes ... */
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando datos del viaje (ID: {id})...</p>
      </Container>
    );
  }
  if (error && !empresaData) { /* ... igual que antes, pero muestra el 'id' ... */
    return (
      <Container className="mt-4">
        <Alert variant="danger">Error: {error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/admin')} className="me-2">Volver a la Lista</Button>
        <Button variant="primary" onClick={fetchData}>Reintentar Carga</Button>
      </Container>
    );
  }
  if (!empresaData && !loading) { /* ... igual que antes ... */
    return (
      <Container className="mt-4">
        <Alert variant="warning">No se encontraron datos para el viaje con ID: {id}</Alert>
        <Button variant="secondary" onClick={() => navigate('/admin')}>Volver a la Lista</Button>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          {/* Botón para volver a la lista */}
          <Button variant="outline-secondary" size="sm" onClick={() => navigate('/admin')} className="mb-3">
            &larr; Volver a la Lista
          </Button>
          <h2 className="mb-4">Editando Viaje / Empresa (ID: {id})</h2>
          {error && <Alert variant="danger">Error: {error}</Alert>}
          {saveSuccess && <Alert variant="success">¡Datos guardados exitosamente!</Alert>}

          {/* El resto del renderizado es igual, usando empresaData */}
          {empresaData && (
            <>
              <Card className="mb-4 shadow-sm">
                {/* ... Formulario de Información General ... */}
                <Card.Header>Información General</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formEmpresaNombre">
                      <Form.Label column sm={3}>Nombre Empresa:</Form.Label>
                      <Col sm={9}>
                        <Form.Control type="text" name="empresa" value={empresaData.empresa || ''} onChange={handleEmpresaChange} />
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

              <h3 className="mt-4 mb-3">Rutas</h3>
              {empresaData.rutas?.length > 0 ? (
                empresaData.rutas.map((ruta, index) => (
                  <RutaEditor // CORRECTO
                    key={index} // Considera usar un ID único de la ruta si lo tienes
                    ruta={ruta} // Pasas el objeto ruta completo a RutaEditor
                    rutaIndex={index}
                    handleRutaChange={handleRutaChange} // Pasas las funciones que RutaEditor necesita
                    handleParadaChange={handleParadaChange} // RutaEditor pasará esta a ParadaEditor
                  />
                ))
              ) : (<Alert variant='info'>Esta empresa aún no tiene rutas definidas.</Alert>)}

              <div className="mt-4 d-grid">
                <Button variant="primary" size="lg" onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminViajesPanel;