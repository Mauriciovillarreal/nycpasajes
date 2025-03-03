import './ViajesList.css';
import { useEffect, useState } from 'react';
import { db } from '../../services/config';
import { collection, getDocs, query } from 'firebase/firestore';
import { Container, Form } from 'react-bootstrap';

export const ViajesList = () => {
    const [viajes, setViajes] = useState([]);
    const [origenes, setOrigenes] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [filtros, setFiltros] = useState({
        origen: '',
        destino: '',
        fecha: ''
    });

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

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    // Filtrar viajes según origen y destino seleccionados
    const viajesFiltrados = viajes.filter(viaje =>
        (filtros.origen ? viaje.origen === filtros.origen : true) &&
        (filtros.destino ? viaje.destino === filtros.destino : true)
    );

    // Construir enlace de WhatsApp con mensaje dinámico
    const abrirWhatsApp = () => {
        const numero = "5491139505311";
        const mensaje = `Hola, quiero consultar por un viaje:\n\n🚐 *Origen:* ${filtros.origen}\n📍 *Destino:* ${filtros.destino}\n📅 *Fecha:* ${filtros.fecha || "Cualquier fecha"}\n\n¿Podrían darme más información?`;

        const urlWeb = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        const urlApp = `whatsapp://send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;

        if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
            window.location.href = urlApp;
        } else {
            window.open(urlWeb, "_blank");
        }
    };

    return (
        <Container className="viajes-container">
            <h1>Busca tus pasajes</h1>
            <form className="filtros-form">
                {/* Origen */}
                <h5>Origen</h5>
                <input
                    type="text"
                    name="origen"
                    value={filtros.origen}
                    onChange={handleChange}
                    list="lista-origenes"
                />
                <datalist id="lista-origenes">
                    {origenes.map((origen, index) => (
                        <option key={index} value={origen} />
                    ))}
                </datalist>

                {/* Destino */}
                <h5>Destino</h5>
                <input
                    type="text"
                    name="destino"
                    value={filtros.destino}
                    onChange={handleChange}
                    list="lista-destinos"
                />
                <datalist id="lista-destinos">
                    {destinos.map((destino, index) => (
                        <option key={index} value={destino} />
                    ))}
                </datalist>

                {/* Fecha */}
                {/* Fecha */}
                <h5>Fecha de viaje</h5>
                <Form.Group controlId="fecha">
                    <Form.Control
                        type="date"
                        name="fecha"
                        value={filtros.fecha}
                        onChange={handleChange}
                    />
                </Form.Group>

                <h6>*Para consultar por WhatsApp, llenar todos los campos</h6>
            </form>

            {/* Lista de viajes filtrados */}
            <div className="viajes-list">
                {viajesFiltrados.length > 0 ? (
                    viajesFiltrados.map(item => (
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
                        </div>


                    ))
                ) : (
                    <p>No se encontraron viajes, Igual podes consultar por WhatsApp</p>
                )}
            </div>

            {/* Botón de WhatsApp */}
            <button
                onClick={abrirWhatsApp}
                disabled={!filtros.origen || !filtros.destino}
                className="whatsapp-btn"
            >
                Consultar por WhatsApp
            </button>
        </Container>
    );
};
