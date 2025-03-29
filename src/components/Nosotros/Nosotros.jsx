import './Nosotros.css';
import React from 'react'
import { Carousel, Container } from 'react-bootstrap'

export const Nosotros = () => {
    return (
        <div>
            <div className="title">
                <Container>
                    <h1>NUESTRAS AGENCIAS</h1>
                </Container>
            </div>

            <Container >
                <div className='agencias'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.219511979833!2d-58.619785823474864!3d-34.64915885990084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc76158599a1f%3A0xb72e49f2a0b8bf6b!2sNyc%20Travel!5e0!3m2!1ses-419!2sar!4v1741041112109!5m2!1ses-419!2sar"

                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="datosAgencia">
                        <h4>Agencia - Morón</h4>
                        <h5>Dirección:</h5>
                        <p>Republica Oriental del Uruguay 92, Morón. Buenos Aires </p>
                        <h5>Horarios:</h5>
                        <p>Lunes a viernes de 9hs a 20hs</p>
                        <p>Sabados de 9hs a 16hs</p>
                    </div>
                </div>

                <div className='agencias'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1806.6075701085706!2d-58.7284197901926!3d-34.66510170577591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbfe5561c2795%3A0x437cfadd7a503ee4!2sNyc%20travel!5e0!3m2!1ses-419!2sar!4v1742855028386!5m2!1ses-419!2sar"
                        style={{ border: 0 }}
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    />
                    <div className="datosAgencia">
                        <h4>Agencia - Merlo</h4>
                        <h5>Dirección:</h5>
                        <p>Av. Pres. Juan Domingo Perón 25557, Merlo. Buenos Aires</p>
                        <h5>Horarios:</h5>
                        <p>Lunes a viernes de 9hs a 20hs</p>
                        <p>Sabados de 9hs a 16hs</p>
                    </div>
                </div>

            </Container>
        </div>
    )
}
