import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>

        <div className="align-items-center">
        <div md={6} className="footer-info">
            
        
          
          </div>
          <div md={6} className="carousel-div">
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
  
          <div md={6} className="footer-info">
            
            <p>Compra tus pasajes ahora</p>
            <p>Encuentra las mejores ofertas para tus viajes.</p>
          
          </div>
      
        </div>
      </Container>
        <div>
          <div className="text-center copyright">
            <p>&copy; {new Date().getFullYear()} NYC Travel. Todos los derechos reservados.</p>
          </div>
        </div>
    </footer>
  );
};