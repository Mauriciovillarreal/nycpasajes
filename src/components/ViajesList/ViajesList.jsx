import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/config";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './ViajesList.css';

const ViajesList = () => {
    const [routes, setRoutes] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState(null);
    const [originStop, setOriginStop] = useState(null);
    const [destinationStop, setDestinationStop] = useState(null);
    const [empresaImagen, setEmpresaImagen] = useState(null);
    const [foundRoutes, setFoundRoutes] = useState([]);
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    useEffect(() => {
        const fetchRoutes = async () => {
            const querySnapshot = await getDocs(collection(db, "viajes"));
            const routesData = querySnapshot.docs.flatMap(doc => doc.data().rutas || []);
            console.log("Rutas obtenidas:", routesData);
            setRoutes(routesData);
        };
        fetchRoutes();
    }, []);

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const handleSearch = () => {
        if (!origin || !destination || !date) {
            toast.error("Por favor, complete todos los campos"); // Use toast.error instead of alert
            return;
        }

        const foundRoutes = routes.filter(r => {
            const paradas1 = r.paradas.paradas1;
            const paradas2 = r.paradas.paradas2;

            const normalizedOrigin = normalizeText(origin);
            const normalizedDestination = normalizeText(destination);

            const originStop1 = paradas1.find(p => normalizeText(p.nombre).includes(normalizedOrigin));
            const originStop2 = paradas2.find(p => normalizeText(p.nombre).includes(normalizedOrigin));

            const destinationStop1 = paradas1.find(p => normalizeText(p.nombre).includes(normalizedDestination));
            const destinationStop2 = paradas2.find(p => normalizeText(p.nombre).includes(normalizedDestination));

            return (originStop1 && destinationStop2) || (originStop2 && destinationStop1);
        });

        if (foundRoutes.length > 0) {
            setFoundRoutes(foundRoutes);

            const route = foundRoutes[0];

            setEmpresaImagen(route.img);
            console.log("Ruta encontrada:", route);

            const paradas1 = route.paradas.paradas1;
            const paradas2 = route.paradas.paradas2;

            let originStopResult = null;
            let destinationStopResult = null;

            const originStop1Result = paradas1.find(p => normalizeText(p.nombre).includes(normalizeText(origin)));
            const originStop2Result = paradas2.find(p => normalizeText(p.nombre).includes(normalizeText(origin)));
            const destinationStop1Result = paradas1.find(p => normalizeText(p.nombre).includes(normalizeText(destination)));
            const destinationStop2Result = paradas2.find(p => normalizeText(p.nombre).includes(normalizeText(destination)));

            if (originStop1Result && destinationStop2Result) {
                originStopResult = originStop1Result;
                destinationStopResult = destinationStop2Result;
            } else if (originStop2Result && destinationStop1Result) {
                originStopResult = originStop2Result;
                destinationStopResult = destinationStop1Result;
            }

            if (originStopResult && destinationStopResult) {
                const originHasPrice = originStopResult.precioSemi && originStopResult.precioCama;
                const destinationHasPrice = destinationStopResult.precioSemi && destinationStopResult.precioCama;

                let priceToUse = null;

                if (destinationHasPrice) {
                    priceToUse = {
                        semiCama: destinationStopResult.precioSemi,
                        cama: destinationStopResult.precioCama
                    };
                } else if (originHasPrice) {
                    priceToUse = {
                        semiCama: originStopResult.precioSemi,
                        cama: originStopResult.precioCama
                    };
                } else {
                    toast.error("No se encontraron precios disponibles para las paradas seleccionadas"); // Use toast.error instead of alert
                    return;
                }

                setPrice(priceToUse);
                setOriginStop(originStopResult);
                setDestinationStop(destinationStopResult);
            } else {
                toast.error("Ruta no válida. Asegúrate de seleccionar un origen y un destino correcto."); // Use toast.error instead of alert
            }
        } else {
            toast.error("Ruta no válida. Asegúrate de seleccionar un origen y  y un destino correcto."); // Use toast.error instead of alert
        }
    };

    const abrirWhatsApp = () => {
        const numero = "5491139505311";
        let mensaje = `Hola, quiero consultar por un viaje:\n\n🚐 *Origen:* ${origin}\n📍 *Destino:* ${destination}\n📅 *Fecha de ida:* ${date || "Cualquier fecha"}`;

        if (returnDate) {
            mensaje += `\n↩️ *Fecha de regreso:* ${returnDate}`;
        }

        mensaje += `\n👥 *Cantidad de pasajeros:* ${passengers}`;

        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWeb = `https://wa.me/${numero}?text=${mensajeCodificado}`;
        const urlApp = `whatsapp://send?phone=${numero}&text=${mensajeCodificado}`;

        if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
            window.location.href = urlApp;
        } else {
            window.open(urlWeb, "_blank");
        }
    };

    return (
        <div>


        <Container className="viajes-container">
            <div>
                <div className="filtros-form">
                    <h2 className="search-title">Busca tus pasajes</h2>
                    <div className="input-container">
                        <label>Origen</label>
                        <input
                            type="text"
                            value={origin}
                            onChange={e => setOrigin(e.target.value)}
                            placeholder="Escribe el origen"
                            className="input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label>Destino</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={e => setDestination(e.target.value)}
                            placeholder="Escribe el destino"
                            className="input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label>Fecha de ida</label>
                        <input
                            name="fecha"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label>Fecha de regreso (opcional)</label>
                        <input
                            name="fechaRegreso"
                            type="date"
                            value={returnDate}
                            onChange={e => setReturnDate(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label>Cantidad de pasajeros</label>
                        <input
                            type="number"
                            value={passengers}
                            onChange={e => setPassengers(e.target.value)}
                            min="1"
                            className="input-field"
                        />
                    </div>
                    <button onClick={handleSearch} className="search-button">Buscar</button>
                </div>

                {foundRoutes.length > 0 && (
                    <div className="routes-list">
                        {foundRoutes.map((route, index) => {
                            return (
                                <div key={index} className="detalleViaje">
                                    <div className="viaje-header">
                                        {route.img && (
                                            <img src={route.img} alt={`Logo de ${route.empresa}`} />
                                        )}
                                    </div>
                                    <div className="viajeInfo">
                                        <div>
                                            <p>{originStop?.nombre}</p>
                                        </div>
                                        <div>→</div>
                                        <div>
                                            <p>{destinationStop?.nombre}</p>
                                        </div>
                                    </div>

                                    <div className="precios">
                                        <div>
                                            <h6><span>SEMICAMA</span></h6>
                                            <div className='precioDetalle'>
                                                <h3><span>DESDE</span> <br /> <b>ARS{price?.semiCama}</b></h3>
                                            </div>
                                        </div>
                                        <div>
                                            <h6><span>CAMA</span></h6>
                                            <div className='precioDetalle'>
                                                <h3><span>DESDE</span> <br /> <b>ARS{price?.cama}</b></h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='notaBaja'>
                                        <h2>Precios por tramo</h2>
                                    </div>

                                    {price && (
                                        <button onClick={abrirWhatsApp} className="whatsapp-btn">
                                            <img src="./img/wap.png" alt="" />
                                            Consultar
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <ToastContainer />
        </Container>
        </div>
    );
};

export default ViajesList;