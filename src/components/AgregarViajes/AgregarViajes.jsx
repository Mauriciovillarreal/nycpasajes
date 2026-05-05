import { useState } from 'react';
import { db } from '../../services/config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
  Alert,
  Spinner,
  Accordion // Usaremos Accordion para manejar múltiples rutas
} from 'react-bootstrap';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Íconos para botones

// Estado inicial para un nuevo viaje (con una ruta y paradas vacías)
const initialRouteState = {
  destino_final: '',
  img: '',
  paradas: {
    paradas1: [{
      nombre: ''
    }],
    paradas2: [{
      nombre: '',
      precioSemi: '',
      precioCama: '',
      precioEstandar: '', // <-- Añadido
      precioPromo: ''     // <-- Añadido
    }]
  }
};

const initialViajeState = {
  empresa: '',
  rutas: [initialRouteState] // Empezar con una ruta
};

function AgregarViaje() {
  const [formData, setFormData] = useState(initialViajeState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // --- MANEJADORES DE CAMBIOS ---

  // Cambio en el nombre de la empresa
  const handleEmpresaChange = (e) => {
    setFormData(prev => ({ ...prev, empresa: e.target.value }));
    setSuccess(''); setError(''); // Limpiar mensajes
  };

  // Cambio en campos de una ruta (destino, img)
  const handleRutaChange = (routeIndex, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedRutas = [...prev.rutas];
      updatedRutas[routeIndex] = { ...updatedRutas[routeIndex], [name]: value };
      return { ...prev, rutas: updatedRutas };
    });
    setSuccess(''); setError('');
  };

  // Cambio en campos de una parada (nombre, precios)
  const handleParadaChange = (routeIndex, paradaType, paradaIndex, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedRutas = [...prev.rutas];
      const updatedParadas = { ...updatedRutas[routeIndex].paradas };
      const updatedParadaList = [...updatedParadas[paradaType]];

      // Asegurarse que el valor de precio sea string si es necesario
      const finalValue = (name === 'precioSemi' || name === 'precioCama' || name === 'precioPromo' || name === 'precioEstandar') ? String(value) : value;
      updatedParadaList[paradaIndex] = { ...updatedParadaList[paradaIndex], [name]: finalValue };

      updatedParadas[paradaType] = updatedParadaList;
      updatedRutas[routeIndex] = { ...updatedRutas[routeIndex], paradas: updatedParadas };
      return { ...prev, rutas: updatedRutas };
    });
    setSuccess(''); setError('');
  };

  // --- MANEJADORES PARA AÑADIR/ELIMINAR ---

  // Añadir una nueva ruta vacía
  const addRuta = () => {
    setFormData(prev => ({
      ...prev,
      rutas: [...prev.rutas, { ...initialRouteState }] // Añade una copia del estado inicial de ruta
    }));
    setSuccess(''); setError('');
  };

  // Eliminar una ruta por su índice
  const removeRuta = (routeIndex) => {
    if (formData.rutas.length <= 1) {
      setError("Debe haber al menos una ruta.");
      return; // No permitir eliminar la última ruta
    }
    setFormData(prev => ({
      ...prev,
      rutas: prev.rutas.filter((_, index) => index !== routeIndex)
    }));
    setSuccess(''); setError('');
  };

  // Añadir una parada (origen o destino) a una ruta específica
  const addParada = (routeIndex, paradaType) => {
    setFormData(prev => {
      const updatedRutas = [...prev.rutas];
      const updatedParadas = { ...updatedRutas[routeIndex].paradas };
      const newParada = paradaType === 'paradas1' ? { nombre: '' } : { nombre: '', precioSemi: '', precioCama: '' , precioEstandar: '' , precioPromo: '' ,};
      updatedParadas[paradaType] = [...updatedParadas[paradaType], newParada];
      updatedRutas[routeIndex] = { ...updatedRutas[routeIndex], paradas: updatedParadas };
      return { ...prev, rutas: updatedRutas };
    });
    setSuccess(''); setError('');
  };

  // Eliminar una parada (origen o destino) de una ruta específica
  const removeParada = (routeIndex, paradaType, paradaIndex) => {
    setFormData(prev => {
      const updatedRutas = [...prev.rutas];
      const updatedParadas = { ...updatedRutas[routeIndex].paradas };

      if (updatedParadas[paradaType].length <= 1) {
        // Opcional: Evitar eliminar la última parada de un tipo
        console.warn(`No se puede eliminar la última parada de ${paradaType}`);
        setError(`Debe haber al menos una parada de ${paradaType === 'paradas1' ? 'origen' : 'destino'}.`);
        return prev;
      }

      const updatedParadaList = updatedParadas[paradaType].filter((_, index) => index !== paradaIndex);
      updatedParadas[paradaType] = updatedParadaList;
      updatedRutas[routeIndex] = { ...updatedRutas[routeIndex], paradas: updatedParadas };
      return { ...prev, rutas: updatedRutas };
    });
    setSuccess(''); setError('');
  };


  // --- ENVÍO DEL FORMULARIO ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación simple (puedes añadir más)
    if (!formData.empresa.trim()) {
      setError("El nombre de la empresa es obligatorio.");
      return;
    }
    if (formData.rutas.some(r => !r.destino_final.trim())) {
      setError("Todos los destinos finales de las rutas son obligatorios.");
      return;
    }
    // Añadir más validaciones para paradas, precios, etc. si es necesario

    setLoading(true);
    try {
      // Limpiar paradas vacías antes de guardar (opcional pero recomendado)
      const cleanedFormData = {
        ...formData,
        rutas: formData.rutas.map(ruta => ({
          ...ruta,
          paradas: {
            paradas1: ruta.paradas.paradas1.filter(p => p.nombre.trim() !== ''),
            paradas2: ruta.paradas.paradas2.filter(p => p.nombre.trim() !== '')
          }
        }))
      };

      // Filtrar rutas que no tengan paradas después de limpiar (opcional)
      // cleanedFormData.rutas = cleanedFormData.rutas.filter(r => r.paradas.paradas1.length > 0 || r.paradas.paradas2.length > 0);

      if (cleanedFormData.rutas.length === 0 || cleanedFormData.rutas.some(r => r.paradas.paradas1.length === 0 || r.paradas.paradas2.length === 0)) {
        setError("Cada ruta debe tener al menos una parada de origen y una de destino con nombre.");
        setLoading(false);
        return;
      }


      const docRef = await addDoc(collection(db, "viajes"), cleanedFormData);
      setSuccess(`¡Viaje agregado exitosamente con ID: ${docRef.id}!`);
      setFormData(initialViajeState); // Resetear formulario
      // Opcional: redirigir a la lista
      // setTimeout(() => navigate('/admin'), 2000);
    } catch (err) {
      console.error("Error al agregar el viaje:", err);
      setError("Error al guardar en Firebase. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };


  // --- RENDERIZADO DEL FORMULARIO ---
  return (
    <Container className="py-4">
      {/* Botón para volver a la lista */}
      <Button variant="outline-secondary" size="sm" onClick={() => navigate('/admin')} className="mb-3">
        &larr; Volver a la Lista
      </Button>
      <h2>Agregar Nuevo Viaje / Empresa</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* Sección Empresa */}
        <Card className="mb-4 shadow-sm">
          <Card.Header>Información General</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3" controlId="formEmpresaNombre">
              <Form.Label>Nombre Empresa *</Form.Label>
              <Form.Control
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleEmpresaChange}
                placeholder="Nombre de la empresa de viajes"
                required
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Sección Rutas (con Accordion) */}
        <h3 className="mt-4 mb-3">Rutas</h3>
        <Accordion defaultActiveKey="0" alwaysOpen>
          {formData.rutas.map((ruta, routeIndex) => (
            <Accordion.Item eventKey={String(routeIndex)} key={routeIndex}>
              <Accordion.Header>
                Ruta #{routeIndex + 1}: {ruta.destino_final || '(Sin destino)'}
                {/* Botón para eliminar ruta (solo si hay más de una) */}
                {formData.rutas.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-auto me-2" // Alinea a la derecha dentro del header
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que el acordeón se cierre/abra
                      removeRuta(routeIndex);
                    }}
                    title="Eliminar esta ruta"
                  >
                    <FaTrash />
                  </Button>
                )}
              </Accordion.Header>
              <Accordion.Body>
                {/* Campos de la Ruta */}
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId={`ruta-${routeIndex}-destino`}>
                    <Form.Label>Destino Final *</Form.Label>
                    <Form.Control
                      type="text"
                      name="destino_final"
                      value={ruta.destino_final}
                      onChange={(e) => handleRutaChange(routeIndex, e)}
                      placeholder="Ej: Mar del Plata"
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId={`ruta-${routeIndex}-img`}>
                    <Form.Label>URL Imagen</Form.Label>
                    <Form.Control
                      type="text"
                      name="img"
                      value={ruta.img}
                      onChange={(e) => handleRutaChange(routeIndex, e)}
                      placeholder="Ej: ./img/empresa.png"
                    />
                  </Form.Group>
                </Row>

                {/* Paradas Origen */}
                <Card className="mb-3 bg-light border">
                  <Card.Header as="h6">Paradas Origen</Card.Header>
                  <Card.Body>
                    {ruta.paradas.paradas1.map((parada, paradaIndex) => (
                      <InputGroup className="mb-2" key={paradaIndex}>
                        <Form.Control
                          type="text"
                          name="nombre"
                          placeholder={`Nombre Origen #${paradaIndex + 1}`}
                          value={parada.nombre}
                          onChange={(e) => handleParadaChange(routeIndex, 'paradas1', paradaIndex, e)}
                          required={paradaIndex === 0} // Solo la primera es requerida? Ajusta según necesidad
                        />
                        {ruta.paradas.paradas1.length > 1 && (
                          <Button variant="outline-danger" onClick={() => removeParada(routeIndex, 'paradas1', paradaIndex)} title="Eliminar parada origen">
                            <FaTrash size="0.8em" />
                          </Button>
                        )}
                      </InputGroup>
                    ))}
                    <Button variant="outline-secondary" size="sm" onClick={() => addParada(routeIndex, 'paradas1')}>
                      <FaPlus /> Añadir Parada Origen
                    </Button>
                  </Card.Body>
                </Card>

                {/* Paradas Destino */}
                <Card className="mb-3 bg-light border">
                  <Card.Header as="h6">Paradas Destino (con precios)</Card.Header>
                  <Card.Body>
                    {ruta.paradas.paradas2.map((parada, paradaIndex) => (
                      <Row className="g-2 mb-2 align-items-center" key={paradaIndex}>
                        <Col xs={12} sm={5}>
                          <Form.Control
                            type="text"
                            name="nombre"
                            placeholder={`Nombre Destino #${paradaIndex + 1}`}
                            value={parada.nombre}
                            onChange={(e) => handleParadaChange(routeIndex, 'paradas2', paradaIndex, e)}
                            required={paradaIndex === 0}
                          />
                        </Col>
                        <Col xs={6} sm={3}>
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="precioSemi"
                              placeholder="Semi"
                              value={parada.precioSemi}
                              onChange={(e) => handleParadaChange(routeIndex, 'paradas2', paradaIndex, e)}
                              min="0"
                            />
                          </InputGroup>
                        </Col>
                        <Col xs={6} sm={3}>
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="precioCama"
                              placeholder="Cama"
                              value={parada.precioCama}
                              onChange={(e) => handleParadaChange(routeIndex, 'paradas2', paradaIndex, e)}
                              min="0"
                            />
                          </InputGroup>
                        </Col>
                        <Col xs={6} sm={3}>
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="precioEstandar"
                              placeholder="Estandar"
                              value={parada.precioEstandar}
                              onChange={(e) => handleParadaChange(routeIndex, 'paradas2', paradaIndex, e)}
                              min="0"
                            />
                          </InputGroup>
                        </Col>
                        <Col xs={6} sm={3}>
                          <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                              type="number"
                              name="precioPromo"
                              placeholder="Promo"
                              value={parada.precioPromo}
                              onChange={(e) => handleParadaChange(routeIndex, 'paradas2', paradaIndex, e)}
                              min="0"
                            />
                          </InputGroup>
                        </Col>
                        <Col xs={12} sm={1}>
                          {ruta.paradas.paradas2.length > 1 && (
                            <Button variant="outline-danger" size="sm" className="w-100" onClick={() => removeParada(routeIndex, 'paradas2', paradaIndex)} title="Eliminar parada destino">
                              <FaTrash size="0.8em" />
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))}
                    <Button variant="outline-secondary" size="sm" onClick={() => addParada(routeIndex, 'paradas2')}>
                      <FaPlus /> Añadir Parada Destino
                    </Button>
                  </Card.Body>
                </Card>

              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Botón para añadir más rutas */}
        <Button variant="outline-success" className="mt-3 mb-3" onClick={addRuta}>
          <FaPlus /> Añadir Otra Ruta
        </Button>

        {/* Botón de Envío */}
        <div className="mt-4 d-grid">
          <Button variant="primary" size="lg" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Guardando...
              </>
            ) : (
              'Agregar Viaje'
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AgregarViaje;