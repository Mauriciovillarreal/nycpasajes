import React from 'react';
import { Container } from 'react-bootstrap';
import './Cartelera.css';
import IconRute from '../IconRute/IconRute';

export const Cartelera = () => {
    const destinos = [
        {
            nombre: 'Mendoza',
            imagen: './img/mendoza.jpg',
            rutas: ['BSAS → MENDOZA', 'MENDOZA → BSAS'],
        },
        {
            nombre: 'Mar del Plata',
            imagen: './img/mdq.jpg',
            rutas: ['BSAS → MDQ', 'MDQ → BSAS'],
        },
        {
            nombre: 'Córdoba',
            imagen: './img/cordoba.jpeg',
            rutas: ['BSAS → CÓRDOBA', 'CÓRDOBA → BSAS'],
        },
        {
            nombre: 'Pto. Iguazu',
            imagen: './img/iguazu.jpeg',
            rutas: ['BSAS → PTO. IGUAZU', 'PTO. IGUAZU → BSAS'],
        },
        {
            nombre: 'Bariloche',
            imagen: './img/bariloche.jpeg',
            rutas: ['BSAS → BARILOCHE', 'BARILOCHE → BSAS'],
        },
        // Puedes agregar más destinos aquí
    ];

    const whatsappNumber = '5491139505311';

    const handleWhatsAppClick = (destino) => {
        const whatsappMessage = `Hola, quiero más información sobre los descuentos a ${destino} de un 20%`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <Container className='containerCartelera'>
            {destinos.map((destino) => (
                <div key={destino.nombre} className='cartelera-card'>
                    <img src={destino.imagen} alt={destino.nombre} className="cartelera-image" />
                    <div className="cartelera-content-top">
                        <h1>
                            VIAJA A <div><span>{destino.nombre}</span></div>
                        </h1>
                        <p>HASTA UN 20% OFF</p>
                    </div>
                    <div className="cartelera-content-bottom">
                        {destino.rutas.map((ruta) => (
                            <IconRute key={ruta} ruta={ruta} /> // Usa el componente aquí
                        ))}
                        <button onClick={() => handleWhatsAppClick(destino.nombre)}>CONSULTAR</button>
                    </div>
                </div>
            ))}
        </Container>
    );
};
