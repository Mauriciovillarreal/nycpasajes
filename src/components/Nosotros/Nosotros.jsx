import './Nosotros.css';
import React from 'react'
import { Carousel, Container } from 'react-bootstrap'
Carousel
export const Nosotros = () => {
    return (
        <Container >
            <div className='Nosotros'>
            <h6>Somos una agencia de turismo en el corazón de Morón. Con más de 30 años de experiencia, te ofrecemos pasajes de larga distancia y atención personalizada para que disfrutes de tu viaje.</h6>
            <h5>Nuestra agencia</h5>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.219511979833!2d-58.619785823474864!3d-34.64915885990084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc76158599a1f%3A0xb72e49f2a0b8bf6b!2sNyc%20Travel!5e0!3m2!1ses-419!2sar!4v1741041112109!5m2!1ses-419!2sar"

                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
                       {/* Carrusel de imágenes */}
                       <Carousel className="nosotros-carousel">
                    <Carousel.Item>
                        <img src="./img/agencia.jpeg" alt="Agencia 1" className="d-block w-100" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="./img/agencia1.jpeg" alt="Agencia 2" className="d-block w-100" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="./img/agencia2.jpeg" alt="Agencia 3" className="d-block w-100" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="./img/agencia3.jpeg" alt="Agencia 4" className="d-block w-100" />
                    </Carousel.Item>
                </Carousel>


            </div>
         
        </Container>
    )
}
