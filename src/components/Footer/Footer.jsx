import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './Footer.css';
import { db, collection, addDoc, getDocs, query, where } from '../../services/config';

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const subscribersCollection = collection(db, 'subscribers');
      const q = query(subscribersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Swal.fire({
          icon: 'warning',
          title: 'Email ya registrado',
          text: 'Este email ya está suscrito.',
        });
        return;
      }

      await addDoc(subscribersCollection, { email });
      Swal.fire({
        icon: 'success',
        title: 'Suscripción exitosa',
        text: '¡Te has suscrito con éxito!',
      });
      setEmail('');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error. Intenta de nuevo.',
      });
    }
  };

  return (
    <footer className="custom-footer">
      <Container className='desktop'>
        <div className="footer-info">
          <img src="./img/logonyc.png" alt="Logonyc" className="footer-logo" />
        </div>




        <div className="footer-info instagram">
          <a href="https://www.instagram.com/nycpasajes/?igsh=MTR3ejUzYjR5enJs&utm_source=qr" className="navbar-brand" target="_blank">
            <img src="./img/insta.png" alt="" />

          </a>
          <p>Compra tus pasajes ahora</p>
          <p>Encuentra las mejores ofertas para tus viajes</p>
          <p>Venta personalizada por WhatsApp</p>
        </div>



        <form onSubmit={handleSubscribe} className="email-form">
        
          <h4>Suscribite al Newsletter y sé el primero en descubrir nuestras ofertas</h4>
          <div className="inputEmail">
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">ENVIAR</button>
          </div>
        </form>

        <div className="carousel-div">
          <Carousel interval={500} pause={false}>
            {/* Carousel Items... */}
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
            <Carousel.Item>
              <img className="d-block w-100" src="./img/20dej.jpg" alt="20 de Junio" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="./img/andesmar.jpg" alt="Andesmar" />
            </Carousel.Item>
          </Carousel>
        </div>




      </Container>
      <div className="text-center copyright">
        <p>&copy; {new Date().getFullYear()} NYC Travel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};