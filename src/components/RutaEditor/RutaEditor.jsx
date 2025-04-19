// src/components/RutaEditor.js
import React from 'react';
import { Card, Form, Accordion, Row, Col } from 'react-bootstrap';
import ParadaEditor from '../ParadaEditor/ParadaEditor';

ParadaEditor
function RutaEditor({ ruta, rutaIndex, handleRutaChange, handleParadaChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleRutaChange(rutaIndex, name, value);
  };

  // Claves únicas para los items del Accordion
  const origenEventKey = `ruta-${rutaIndex}-origen`;
  const destinoEventKey = `ruta-${rutaIndex}-destino`;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Editando Ruta: {ruta.destino_final || 'Nueva Ruta'}</Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId={`ruta-${rutaIndex}-destino`}>
              <Form.Label>Destino Final</Form.Label>
              <Form.Control
                type="text"
                name="destino_final"
                value={ruta.destino_final || ''}
                onChange={handleInputChange}
                placeholder="Ej: Mar del Plata"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
             <Form.Group as={Col} controlId={`ruta-${rutaIndex}-img`}>
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={ruta.img || ''}
                onChange={handleInputChange}
                placeholder="Ej: ./img/empresa.png o https://..."
              />
            </Form.Group>
          </Row>
        </Form>

        {/* Acordeón para las Paradas */}
        <Accordion defaultActiveKey={[origenEventKey, destinoEventKey]} alwaysOpen className="mt-3">
          {/* Paradas Origen */}
          <Accordion.Item eventKey={origenEventKey}>
            <Accordion.Header>Paradas Origen ({ruta.paradas?.paradas1?.length || 0})</Accordion.Header>
            <Accordion.Body>
              {ruta.paradas?.paradas1?.length > 0 ? (
                ruta.paradas.paradas1.map((parada, index) => (
                  <ParadaEditor
                    key={`p1-${rutaIndex}-${index}`} // Clave única
                    parada={parada}
                    rutaIndex={rutaIndex}
                    paradaType="paradas1"
                    paradaIndex={index}
                    handleParadaChange={handleParadaChange}
                  />
                ))
              ) : (
                <p className="text-muted">No hay paradas de origen definidas.</p>
              )}
              {/* Botón para añadir parada origen */}
              {/* <Button variant="outline-primary" size="sm" className="mt-2">Añadir Parada Origen</Button> */}
            </Accordion.Body>
          </Accordion.Item>

          {/* Paradas Destino */}
          <Accordion.Item eventKey={destinoEventKey}>
            <Accordion.Header>Paradas Destino ({ruta.paradas?.paradas2?.length || 0})</Accordion.Header>
            <Accordion.Body>
              {ruta.paradas?.paradas2?.length > 0 ? (
                ruta.paradas.paradas2.map((parada, index) => (
                  <ParadaEditor
                    key={`p2-${rutaIndex}-${index}`} // Clave única
                    parada={parada}
                    rutaIndex={rutaIndex}
                    paradaType="paradas2"
                    paradaIndex={index}
                    handleParadaChange={handleParadaChange}
                  />
                ))
              ) : (
                 <p className="text-muted">No hay paradas de destino definidas.</p>
              )}
               {/* Botón para añadir parada destino */}
              {/* <Button variant="outline-primary" size="sm" className="mt-2">Añadir Parada Destino</Button> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
         {/* Podrías añadir un botón aquí para eliminar esta ruta específica */}
         {/* <Button variant="danger" size="sm" className="mt-3">Eliminar Ruta Completa</Button> */}
      </Card.Body>
    </Card>
  );
}

export default RutaEditor;