import { Container } from 'react-bootstrap';
import './Cartelera.css'; // Asegúrate de que este archivo CSS exista y esté actualizado
import IconRute from '../IconRute/IconRute'; // Asegúrate de que este componente exista

// Sería ideal mover esta data a un archivo separado (ej: data/destinos.js) si crece mucho
const destinos = [
    {
        nombre: 'Mendoza',
        imagen: './img/mendoza.jpg', // Asume que esta ruta es correcta desde tu carpeta public
        rutas: ['BSAS → MENDOZA', 'MENDOZA → BSAS'],
        semiCama: '57816',
        cama: '63296',
    },
    {
        nombre: 'Mar del Plata',
        imagen: './img/mdq.jpg',
        rutas: ['BSAS → MDQ', 'MDQ → BSAS'],
        semiCama: '44160',
        cama: '49760',
    },
    {
        nombre: 'Córdoba',
        imagen: './img/cordoba.jpeg',
        rutas: ['BSAS → CÓRDOBA', 'CÓRDOBA → BSAS'],
        semiCama: '50000',
        cama: '59000',
    },
    {
        nombre: 'Pto. Iguazu',
        imagen: './img/iguazu.jpeg',
        rutas: ['BSAS → PTO. IGUAZU', 'PTO. IGUAZU → BSAS'],
        semiCama: '87760',
        cama: '95920',
    },
    {
        nombre: 'Bariloche',
        imagen: './img/bariloche.jpeg',
        rutas: ['BSAS → BARILOCHE', 'BARILOCHE → BSAS'],
        semiCama: '94400',
        cama: '113299',
    },
    {
        nombre: 'Tucuman',
        imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/88/76/3b/casa-de-gobierno-de-tucuman.jpg?w=900&h=500&s=1",
        rutas: ['BSAS → TUCUMAN', 'TUCUMAN → BSAS'],
        semiCama: '81200',
        cama: '101200',
    },
];

export const Cartelera = () => {
    const whatsappNumber = '5491139505311'; // Tu número de WhatsApp

    const handleWhatsAppClick = (destino) => {
        const messageParts = [
            `¡Hola! 👋`,
            `Estoy interesado/a en el viaje a ${destino.nombre}.`,
            `Vi que tienen estas opciones:`,
            `- Semi Cama desde: $${destino.semiCama}`,
            `- Cama desde: $${destino.cama}`,
            // Puedes agregar las rutas si es relevante para el primer contacto:
            // `Rutas disponibles: ${destino.rutas.join(', ')}.`,
            `¿Podrían darme más información sobre fechas disponibles, horarios exactos y cómo puedo reservar?`,
            `¡Muchas gracias! 😊`
        ];
        const whatsappMessage = messageParts.join('\n'); // \n crea un salto de línea en WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <Container className='containerCartelera'>
            {destinos.map((destino) => (
                <div key={destino.nombre} className='cartelera-card'>
                    <img src={destino.imagen} alt={`Viaje a ${destino.nombre}`} className="cartelera-image" />
                    <div className="cartelera-content-top">
                        <h1>
                          <div><span>{destino.nombre}</span></div>
                        </h1>
                        <div className='categorias-precio'> {/* Nombre de clase corregido y más descriptivo */}
                            <div>
                                <p className="price-label">SEMI CAMA DESDE</p>
                                <p className="price-amount">${destino.semiCama}</p>
                            </div>
                            <div>
                                <p className="price-label">CAMA DESDE</p>
                                <p className="price-amount">${destino.cama}</p>
                            </div>
                        </div>
                    </div>
                    <div className="cartelera-content-bottom">
                        {destino.rutas.map((ruta) => (
                            <IconRute key={ruta} ruta={ruta} />
                        ))}
                        <button onClick={() => handleWhatsAppClick(destino)}>
                            <i className="fab fa-whatsapp"> </i>
                            CONSULTAR</button>
                    </div>
                </div>
            ))}
        </Container>
    );
};
