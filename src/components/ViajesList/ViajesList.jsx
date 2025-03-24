import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/config";
import './ViajesList.css';
import Select from 'react-select';
import Swal from 'sweetalert2';

const ViajesList = () => {
    const [routes, setRoutes] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [foundRoutes, setFoundRoutes] = useState([]);
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const resultsRef = useRef(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            const querySnapshot = await getDocs(collection(db, "viajes"));
            const routesData = querySnapshot.docs.flatMap(doc => {
                const data = doc.data();
                return data.rutas.map(ruta => ({
                    ...ruta,
                    empresa: data.empresa // Agrega la propiedad empresa a cada ruta
                }));
            });
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
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos',
            });
            return;
        }

        const foundRoutes = routes.filter(r => {
            const paradas1 = r.paradas.paradas1;
            const paradas2 = r.paradas.paradas2;

            const originStop1 = paradas1.find(p => p.nombre === origin.value);
            const originStop2 = paradas2.find(p => p.nombre === origin.value);

            const destinationStop1 = paradas1.find(p => p.nombre === destination.value);
            const destinationStop2 = paradas2.find(p => p.nombre === destination.value);

            return (originStop1 && destinationStop2) || (originStop2 && destinationStop1);
        });

        if (foundRoutes.length > 0) {
            setFoundRoutes(foundRoutes);
            setTimeout(() => {
                if (resultsRef.current) {
                    resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 200);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ruta no encontrada',
                text: 'Asegúrate de seleccionar un origen y un destino correcto.',
            });
        }
    };

    const allStops = routes.reduce((acc, route) => {
        const paradas1 = route.paradas.paradas1.map(p => ({ value: p.nombre, label: p.nombre }));
        const paradas2 = route.paradas.paradas2.map(p => ({ value: p.nombre, label: p.nombre }));
        return [...acc, ...paradas1, ...paradas2];
    }, []);

    const uniqueStops = Array.from(new Set(allStops.map(a => a.value)))
        .map(value => {
            return allStops.find(a => a.value === value)
        });

    const abrirWhatsApp = (originStop, destinationStop, price, empresa) => {
        const numero = "5491139505311";
        let mensaje = `Hola, quiero consultar por un viaje con ${empresa}:\n\n *Origen:* ${originStop?.nombre || "No especificado"}\n *Destino:* ${destinationStop?.nombre || "No especificado"}\n *Fecha de ida:* ${date || "Cualquier fecha"}`;

        if (returnDate) {
            mensaje += `\n↩️ *Fecha de regreso:* ${returnDate}`;
        }

        mensaje += `\n *Cantidad de pasajeros:* ${passengers}`;

        if (price) {
            if (price.semiCama) mensaje += `\n *Precio semi-cama:* ARS${price.semiCama}`;
            if (price.cama) mensaje += `\n *Precio cama:* ARS${price.cama}`;
            if (price.estandar) mensaje += `\n *Precio estándar:* ARS${price.estandar}`;
        }

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
            <div className="viajes-container">
                <div className="filtros-form">
                    <div className="formSarch">
                        <h2 className="search-title">Busca tus pasajes</h2>
                        <div>
                            <label>Origen</label>
                            <div className="custom-select">
                                <Select
                                    value={origin}
                                    onChange={setOrigin}
                                    options={uniqueStops}
                                    placeholder="Escribe el origen"
                                />
                            </div>
                        </div>
                        <div className="input-container">
                            <label>Destino</label>
                            <Select
                                value={destination}
                                onChange={setDestination}
                                options={uniqueStops}
                                placeholder="Escribe el destino"
                            />
                        </div>
                        <div className="date-picker-container">
                            <div className="input-container izq">
                                <label>Partida</label>
                                <div className="input-with-icon">
                                    <input
                                        name="fecha"
                                        type="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        className="input-field"
                                    />
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                            <div className="input-container der">
                                <label>Regreso (opcional)</label>
                                <div className="input-with-icon ">
                                    <input
                                        name="fechaRegreso"
                                        type="date"
                                        value={returnDate}
                                        onChange={e => setReturnDate(e.target.value)}
                                        className="input-field"
                                    />
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                            </div>
                        </div>
                        <div className="input-container">
                            <label>Cantidad de pasajeros</label>
                            <input
                                type="number"
                                value={passengers}
                                onChange={e => setPassengers(e.target.value)}
                                min="1"
                                className="input-field pasajeros"
                            />
                        </div>
                        <button onClick={handleSearch} className="search-button">Buscar pasajes</button>
                    </div>
                </div>
                <div className="Consultas">
                    <label>Si no encontras tu origen o destino, podes consultar por WhatsApp</label>
                    <a href="https://wa.me/5491139505311" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                        <button className="btnConsultas">
                            <img src="./img/wap.png" alt="WhatsApp" className="whatsapp-icon" />
                            Consultas
                        </button>
                    </a>
                </div>
                <div ref={resultsRef}>
                    {foundRoutes.length > 0 && (
                        <div className="routes-list">
                            {foundRoutes.map((route, index) => {
                                const paradas1 = route.paradas.paradas1;
                                const paradas2 = route.paradas.paradas2;

                                let originStopResult = null;
                                let destinationStopResult = null;

                                const originStop1Result = paradas1.find(p => p.nombre === origin.value);
                                const originStop2Result = paradas2.find(p => p.nombre === origin.value);
                                const destinationStop1Result = paradas1.find(p => p.nombre === destination.value);
                                const destinationStop2Result = paradas2
                                    .find(p => p.nombre === destination.value);

                                if (originStop1Result && destinationStop2Result)
                                    if (originStop1Result && destinationStop2Result) {
                                        originStopResult = originStop1Result;
                                        destinationStopResult = destinationStop2Result;
                                    } else if (originStop2Result && destinationStop1Result) {
                                        originStopResult = originStop2Result;
                                        destinationStopResult = destinationStop1Result;
                                    }

                                let priceToUse = null;

                                if (destinationStopResult && (destinationStopResult.precioSemi || destinationStopResult.precioCama || destinationStopResult.precioEstandar)) {
                                    priceToUse = {
                                        semiCama: destinationStopResult.precioSemi,
                                        cama: destinationStopResult.precioCama,
                                        estandar: destinationStopResult.precioEstandar
                                    };
                                } else if (originStopResult && (originStopResult.precioSemi || originStopResult.precioCama || originStopResult.precioEstandar)) {
                                    priceToUse = {
                                        semiCama: originStopResult.precioSemi,
                                        cama: originStopResult.precioCama,
                                        estandar: originStopResult.precioEstandar
                                    };
                                }
                          
                                return (
                                    <div key={index} className="detalleViaje">
                                        <div className="viaje-header">
                                            {route.img && (
                                                <img src={route.img} alt={`Logo de ${route.empresa}`} />
                                            )}
                                        </div>
                                        <div className="viajeInfo">
                                            <div>
                                                <p>{originStopResult?.nombre}</p>
                                            </div>
                                            <div>→</div>
                                            <div>
                                                <p>{destinationStopResult?.nombre}</p>
                                            </div>
                                        </div>

                                        <div className="precios">
                                            {priceToUse?.semiCama && (
                                                <div>
                                                    <h6><span>SEMICAMA</span></h6>
                                                    <div className='precioDetalle'>
                                                        <h3><span>DESDE</span> <br /> <b>ARS{priceToUse?.semiCama}</b></h3>
                                                    </div>
                                                </div>
                                            )}
                                            {priceToUse?.cama && (
                                                <div>
                                                    <h6><span>CAMA</span></h6>
                                                    <div className='precioDetalle'>
                                                        <h3><span>DESDE</span> <br /> <b>ARS{priceToUse?.cama}</b></h3>
                                                    </div>
                                                </div>
                                            )}
                                            {priceToUse?.estandar && (
                                                <div>
                                                    <h6><span>ESTANDAR</span></h6>
                                                    <div className='precioDetalle'>
                                                        <h3><span>DESDE</span> <br /> <b >ARS{priceToUse?.estandar}</b></h3>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className='notaBaja'>
                                            <h2>Precios por tramo</h2>
                                        </div>

                                        {priceToUse && (
                                            <button onClick={() => abrirWhatsApp(originStopResult, destinationStopResult, priceToUse, route.empresa)} className="whatsapp-btn">
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
            </div>
        </div>
    );
};

export default ViajesList;