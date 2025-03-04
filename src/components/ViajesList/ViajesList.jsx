import './ViajesList.css';
import { useEffect, useState } from 'react';
import { db } from '../../services/config';
import { collection, getDocs, query } from 'firebase/firestore';
import { Container, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    const viajesFiltrados = viajes.filter(viaje =>
        (filtros.origen ? viaje.origen === filtros.origen : true) &&
        (filtros.destino ? viaje.destino === filtros.destino : true)
    );

    const abrirWhatsApp = (viaje) => {
        const numero = "5491140507287";
        const mensaje = `Hola, quiero consultar sobre este viaje:
        \n*Empresa:* ${viaje.empresa || "Cualquier empresa"}
        \n*Origen:* ${viaje.origen}
        \n*Destino:* ${viaje.destino}
        \n*Fecha:* ${filtros.fecha || "Cualquier fecha"}\n\n¿Podrían darme más información?`;

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

                <h5>Fecha de viaje</h5>
                <DatePicker
    selected={filtros.fecha ? new Date(filtros.fecha) : null}
    onChange={(date) => setFiltros({ ...filtros, fecha: date.toISOString().split('T')[0] })}
    dateFormat="dd-MM-yyyy"
    placeholderText="Seleccionar fecha"
    customInput={<Form.Control />}
    className="form-control"
/>


            </form>

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
                            <button className="whatsapp-btn" onClick={() => abrirWhatsApp(item)}>
                                <img src="./img/wap.png" alt="" />
                                Consultar
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="sin-resultados">
                        <p>No se encontraron viajes con los criterios seleccionados, pero puedes consultar igualmente.</p>
                        <button className="whatsapp-btn" onClick={() => abrirWhatsApp({ origen: filtros.origen, destino: filtros.destino })}>
                            <img src="./img/wap.png" alt="" />
                            Consultar
                        </button>
                    </div>
                )}
            </div>

        </Container>
    );
};
