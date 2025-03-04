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
            </div>
            <div className='info'>
                <h2>¿Como comprar?</h2>
                <h6>Te brindamos la misma atención personalizada que recibirías en nuestra oficina, pero desde la comodidad de tu hogar</h6>
                <h6>- Consulta por la web: Explora nuestras opciones y encuentra el viaje ideal.</h6>
                <h6>- Comunicación directa: Te atenderemos por WhatsApp para resolver dudas y asesorarte en todo momento.</h6>
                <h6>- A medida que avanzamos en la reserva, te enviaremos los horarios de los viajes y las butacas disponibles para que puedas elegir. Una vez finalizado este paso, te pediremos los datos de los pasajeros de manera segura y sencilla</h6>




            </div>
            <div className='info'>
                <h2>¿Donde quedan las terminales/paradas?</h2>
                <h6>Morón terminal - Av. Rivadavia 17415</h6>
                <h6>Vergata y Gaona - Reyes Catolicos 218</h6>
                <h6>Morón terminal - Av. Rivadavia 17415</h6>
                <h6>Morón terminal - Av. Rivadavia 17415</h6>
            </div>

        </Container>
    )
}
