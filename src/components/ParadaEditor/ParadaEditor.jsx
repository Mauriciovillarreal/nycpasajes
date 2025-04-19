// src/components/ParadaEditor.js
import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

function ParadaEditor({ parada, rutaIndex, paradaType, paradaIndex, handleParadaChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convertir precios a número si es necesario
    const finalValue = (
      name === 'precioSemi' ||
      name === 'precioCama' ||
      name === 'precioEstandar' ||
      name === 'precioPromo'
    ) ? value : value;
    handleParadaChange(rutaIndex, paradaType, paradaIndex, name, finalValue);
  };

  const isParadaDestino = paradaType === 'paradas2'; // Solo paradas2 tiene precios

  return (
    <div className="border p-3 mb-3 rounded bg-light shadow-sm">
      <Row className="align-items-center g-2"> {/* g-2 añade espacio entre columnas */}
        <Col xs={12} md={isParadaDestino ? 4 : 12}>
          <Form.Group controlId={`parada-${rutaIndex}-${paradaType}-${paradaIndex}-nombre`}>
            <Form.Label visuallyHidden>Nombre Parada</Form.Label> {/* Oculta visualmente pero accesible */}
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre Parada"
              value={parada.nombre || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>

        {isParadaDestino && (
          <>
            <Col xs={6} md={3}>
              <Form.Group controlId={`parada-${rutaIndex}-${paradaType}-${paradaIndex}-semiCama`}>
                <Form.Label visuallyHidden>Precio Semi Cama</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="precioSemi"
                    placeholder="Precio Semi Cama"
                    value={parada.precioSemi || ''}
                    onChange={handleInputChange}
                    min="0" // Opcional: evitar precios negativos
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group controlId={`parada-${rutaIndex}-${paradaType}-${paradaIndex}-cama`}>
                <Form.Label visuallyHidden>Precio Cama</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="precioCama"
                    placeholder="Precio Cama"
                    value={parada.precioCama || ''}
                    onChange={handleInputChange}
                    min="0" // Opcional
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group controlId={`parada-${rutaIndex}-${paradaType}-${paradaIndex}-estandar`}>
                <Form.Label visuallyHidden>Precio Estandar</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="precioEstandar"
                    placeholder="Precio Estandar"
                    value={parada.precioEstandar || ''}
                    onChange={handleInputChange}
                    min="0" // Opcional
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={6} md={3}>
              <Form.Group controlId={`parada-${rutaIndex}-${paradaType}-${paradaIndex}-promo`}>
                <Form.Label visuallyHidden>Precio Promo</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="precioPromo"
                    placeholder="Precio Promo"
                    value={parada.precioPromo || ''}
                    onChange={handleInputChange}
                    min="0" // Opcional
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </>
        )}
      </Row>
      {/* Podrías añadir un botón pequeño aquí para eliminar esta parada específica */}
      {/* <Button variant="outline-danger" size="sm" className="mt-2">Eliminar Parada</Button> */}
    </div>
  );
}

export default ParadaEditor;