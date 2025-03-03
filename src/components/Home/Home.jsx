import React from 'react'
import './Home.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <Container>
            <div className='Home'>
                <h1>Agencia de Turismo y Pasajes</h1>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/catalogo">Buscar pasajes</Link>
                <Link to="http://wa.me/5491140507287">WhatsApp</Link>
                <Link to="https://www.instagram.com/nycpasajes/?igsh=MTR3ejUzYjR5enJs&utm_source=qr">Instagram</Link>
                <video className="home-video" autoPlay loop muted>
                    <source src="/img/viajes.mp4" type="video/mp4" />
                </video>
            


            </div>
        </Container>
    )
}
