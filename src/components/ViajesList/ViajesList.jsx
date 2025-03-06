import './ViajesList.css';
import { useEffect, useState } from 'react';
import { db } from '../../services/config';
import { collection, getDocs, query } from 'firebase/firestore';
import { Container, Form, Button } from 'react-bootstrap';

export const ViajesList = () => {
    const [viajes, setViajes] = useState([]);
    const [origenes, setOrigenes] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [filtros, setFiltros] = useState({
        origen: '',
        destino: '',
        fecha: '',
        regreso: '',
        pasajeros: 1
    });
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        const obtenerViajes = async () => {
            try {
                const misViajes = query(collection(db, "viajes"));
                const respuesta = await getDocs(misViajes);
                const listaViajes = respuesta.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setViajes(listaViajes);
                setOrigenes([...new Set(listaViajes.map(v => v.origen))]);
                setDestinos([...new Set(listaViajes.map(v => v.destino))]);
            } catch (error) {
                console.error("Error obteniendo los viajes:", error);
            }
        };

        obtenerViajes();
    }, []);

    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault(); // Previene la recarga de la página

        const normalizeText = (text) => text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

        const viajesFiltrados = viajes.filter(viaje =>
            (!filtros.origen || normalizeText(viaje.origen).includes(normalizeText(filtros.origen))) &&
            (!filtros.destino || normalizeText(viaje.destino).includes(normalizeText(filtros.destino)))
        );
        setResultados(viajesFiltrados);
    };


    const abrirWhatsApp = (viaje) => {
        const numero = "5491139505311";
        const mensaje = `Hola, quiero consultar por un viaje:\n\n🚐 *Origen:* ${viaje.origen}\n📍 *Destino:* ${viaje.destino}\n📅 *Fecha de ida:* ${filtros.fecha || "Cualquier fecha"}\n📅 *Fecha de regreso:* ${filtros.regreso || "Cualquier fecha"}\n👥 *Cantidad de pasajeros:* ${filtros.pasajeros}\n\n¿Podrían darme más información?`;

        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWeb = `https://wa.me/${numero}?text=${mensajeCodificado}`;
        const urlApp = `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`;

        // Check if the user is on a mobile device and try to open the WhatsApp app
        if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
            window.location.href = urlApp;
        } else {
            // Open WhatsApp in a new browser tab if not on a mobile device
            window.open(urlWeb, "_blank");
        }
    };

    return (
        <Container className="viajes-container">
            <form className="filtros-form">
                <h1>Busca tus pasajes</h1>
                <h5>Origen</h5>
                <input
                    type="text"
                    name="origen"
                    placeholder='Seleccionar origen'
                    value={filtros.origen}
                    onChange={handleChange}
                    list="lista-origenes"
                />
                <datalist id="lista-origenes">
                    {origenes.map((origen, index) => (
                        <option key={index} value={origen} />
                    ))}
                </datalist>

                <h5>Destino</h5>
                <input
                    type="text"
                    name="destino"
                    placeholder='Seleccionar destino'
                    value={filtros.destino}
                    onChange={handleChange}
                    list="lista-destinos"
                />
                <datalist id="lista-destinos">
                    {destinos.map((destino, index) => (
                        <option key={index} value={destino} />
                    ))}
                </datalist>

                <div className='fecha-container '>

                    <div className='fecha-item '>
                        <h5>Ida</h5>
                        <input
                            type="date"
                            name="fecha"
                            value={filtros.fecha}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='fecha-item '>
                        <h5>Regreso (opcional)</h5>
                        <input
                            type="date"
                            name="regreso"
                            value={filtros.regreso}
                            onChange={handleChange}
                        />
                    </div>


                </div>

                <h5>Cantidad de pasajeros</h5>
                <input
                    type="number"
                    name="pasajeros"
                    value={filtros.pasajeros}
                    onChange={handleChange}
                    min="1"
                />

                <button variant="primary" onClick={handleSearch}>Buscar</button>
            </form>

            <div className="viajes-resultados">
                {resultados.length > 0 ? (
                    resultados.map(item => (
                        <div className="viaje-card" key={item.id}>
                            <div className="viaje-header">
                                <img src={item.img} alt="" />
                            </div>
                            <div className="viaje-info">
                                <div>
                                    <p>{item.origen}</p>
                                    <p className="viaje-horario">{item.horaSalida}</p>
                                </div>
                                <p> → </p>
                                <div>
                                    <p>{item.destino}</p>
                                    <p className="viaje-horario">{item.horaLlegada}</p>
                                </div>
                            </div>
                            <p className="viaje-precio"><span>Desde ARS </span>{item.precio},00</p>
                            <button className="whatsapp-btn" onClick={() => abrirWhatsApp(item)}>
                                <img src="./img/wap.png" alt="" />
                                Consultar
                            </button>
                        </div>
                    ))
                ) : (
                    <div>
                        {(filtros.origen || filtros.destino) && (
                            <button className="whatsapp-btn" onClick={() => abrirWhatsApp({ origen: filtros.origen, destino: filtros.destino })}>
                                <img src="./img/wap.png" alt="" />
                                Consultar por este destino
                            </button>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};
