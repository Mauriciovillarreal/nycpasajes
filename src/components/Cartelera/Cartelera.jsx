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
            descuento: '20',
        },
        {
            nombre: 'Mar del Plata',
            imagen: './img/mdq.jpg',
            rutas: ['BSAS → MDQ', 'MDQ → BSAS'],
            descuento: '30',
        },
        {
            nombre: 'Córdoba',
            imagen: './img/cordoba.jpeg',
            rutas: ['BSAS → CÓRDOBA', 'CÓRDOBA → BSAS'],
            descuento: '20',
        },
        {
            nombre: 'Pto. Iguazu',
            imagen: './img/iguazu.jpeg',
            rutas: ['BSAS → PTO. IGUAZU', 'PTO. IGUAZU → BSAS'],
            descuento: '30',
        },
        {
            nombre: 'Bariloche',
            imagen: './img/bariloche.jpeg',
            rutas: ['BSAS → BARILOCHE', 'BARILOCHE → BSAS'],
            descuento: '20',
        },

        {
            nombre: 'Costa Chica',
            imagen: "https://media.airedesantafe.com.ar/p/765e9ee77df61d86f3753cf2acc78b51/adjuntos/268/imagenes/003/302/0003302832/1200x0/smart/imagepng.png",
            rutas: ['LAS TONINAS', 'STA. TERESITA' , 'MAR DE TUYU', 'SAN BERNARDO' ,'MAR DE AJO', 'PINAMAR'],
            descuento: '50',
        },

        {
            nombre: 'Tucuman',
            imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/88/76/3b/casa-de-gobierno-de-tucuman.jpg?w=900&h=500&s=1",
            rutas:  ['BSAS → TUCUMAN', 'TUCUMAN → BSAS'],
            descuento: '20',
        },
        // Puedes agregar más destinos aquí
    ];

    const whatsappNumber = '5491139505311';

    const handleWhatsAppClick = (destino, descuento) => {
        const whatsappMessage = `Hola, quiero más información sobre los descuentos a ${destino} de un ${descuento}%`;
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
                        <p>HASTA UN <span>{destino.descuento}%</span> OFF</p>
                    </div>
                    <div className="cartelera-content-bottom">
                        {destino.rutas.map((ruta) => (
                            <IconRute key={ruta} ruta={ruta} /> // Usa el componente aquí
                        ))}
                        <button onClick={() => handleWhatsAppClick(destino.nombre, destino.descuento)}>CONSULTAR</button>
                    </div>
                </div>
            ))}
        </Container>
    );
};