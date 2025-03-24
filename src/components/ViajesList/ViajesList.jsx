import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/config";
import './ViajesList.css';
import Swal from 'sweetalert2';
import ViajesSearchForm from "../ViajesSearchForm/ViajesSearchForm";
import ViajesResults from "../ViajesResults/ViajesResults";

const ViajesList = () => {
    const [routes, setRoutes] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [foundRoutes, setFoundRoutes] = useState([]);
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const resultsRef = useRef(null);

    // Nuevos estados para el formulario de consulta
    const [consultaOrigen, setConsultaOrigen] = useState("");
    const [consultaDestino, setConsultaDestino] = useState("");
    const [consultaFecha, setConsultaFecha] = useState("");

    useEffect(() => {
        const fetchRoutes = async () => {
            const querySnapshot = await getDocs(collection(db, "viajes"));
            const routesData = querySnapshot.docs.flatMap(doc => {
                const data = doc.data();
                return data.rutas.map(ruta => ({
                    ...ruta,
                    empresa: data.empresa
                }));
            });
            setRoutes(routesData);
        };
        fetchRoutes();
    }, []);

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

    // Función para construir la URL de WhatsApp
    const handleWhatsAppConsulta = () => {
        const mensaje = `Consulta: Origen: ${consultaOrigen}, Destino: ${consultaDestino}, Fecha: ${consultaFecha}`;
        const encodedMensaje = encodeURIComponent(mensaje);
        const whatsappUrl = `https://wa.me/5491139505311?text=${encodedMensaje}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div>
            <div className="viajes-container">
                <ViajesSearchForm
                    origin={origin}
                    setOrigin={setOrigin}
                    destination={destination}
                    setDestination={setDestination}
                    date={date}
                    setDate={setDate}
                    returnDate={returnDate}
                    setReturnDate={setReturnDate}
                    passengers={passengers}
                    setPassengers={setPassengers}
                    uniqueStops={uniqueStops}
                    handleSearch={handleSearch}
                />

                <div ref={resultsRef}>
                    {foundRoutes.length > 0 && (
                        <ViajesResults
                            foundRoutes={foundRoutes}
                            date={date}
                            returnDate={returnDate}
                            passengers={passengers}
                            origin={origin}
                            destination={destination}
                        />
                    )}
                </div>

                <div className="containerConsultas">
                    <div className="Consultas">
                        <label>Si no encuentras tu origen o destino, puedes consultar por WhatsApp</label>
                        <form>
                            <div className="input-container">
                                <label>Origen</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Escribe el origen"
                                    value={consultaOrigen}
                                    onChange={(e) => setConsultaOrigen(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <label>Destino</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Escribe el destino"
                                    value={consultaDestino}
                                    onChange={(e) => setConsultaDestino(e.target.value)}
                                />
                            </div>
                            <div className="input-container">
                                <label>Fecha</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={consultaFecha}
                                    onChange={(e) => setConsultaFecha(e.target.value)}
                                />
                                 <i className="fas fa-calendar-alt"></i>
                            </div>
                        </form>
                        <button className="btnConsultas" onClick={handleWhatsAppConsulta}>
                          
                            Consulta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViajesList;