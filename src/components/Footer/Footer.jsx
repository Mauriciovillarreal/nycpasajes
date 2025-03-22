import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import './Footer.css';
import { db, collection, addDoc } from '../../services/config';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await addDoc(collection(db, 'subscribers'), { email });
      setMessage('¡Te has suscrito con éxito!');
      setEmail('');
    } catch (error) {
      setMessage('Hubo un error. Intenta de nuevo.');
    }
  };

  return (
    <footer className="custom-footer">
      <Container>
        <div>
          <div className="footer-info">
            <img src="./img/logonyc.png" alt="Logonyc" className="footer-logo" />
          </div>

          {/* Formulario de suscripción sin React Bootstrap */}
          <form onSubmit={handleSubscribe} className="email-form">
            <h4>Suscríbete para descuentos exclusivos y los mejores precios para tu próximo viaje</h4>

            <div className='inputEmail'>

              <input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />



              <button type="submit" >
                Suscribirse
              </button>


            </div>
          </form>
          {message && <p className="message">{message}</p>}

          <div className="carousel-div">
            <Carousel interval={2000} pause={false}>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/urquiza.jpg" alt="Urquiza" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/sierras-cordobesas.jpg" alt="sierras-cordobesas" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/arg.jpg" alt="arg" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/chevallier.jpg" alt="chevallier" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/flecha.jpg" alt="flecha" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/plusmar.jpg" alt="plusmar" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/ruta.jpg" alt="ruta" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/sdc.jpg" alt="sdc" />
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src="./img/singer.jpg" alt="singer" />
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="footer-info">
            <p>Compra tus pasajes ahora</p>
            <p>Encuentra las mejores ofertas para tus viajes.</p>

          </div>
        </div>
      </Container>
      <div className="text-center copyright">
        <p>&copy; {new Date().getFullYear()} NYC Travel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};