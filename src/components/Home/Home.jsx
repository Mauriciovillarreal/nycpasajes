import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/config";
import './Home.css';
import Swal from 'sweetalert2';
import ViajesSearchForm from "../ViajesSearchForm/ViajesSearchForm";
import ViajesResults from "../ViajesResults/ViajesResults";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Cartelera } from "../Cartelera/Cartelera";

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
                    const yOffset = -4; // Ajusta este valor según cuán arriba quieras el scroll
                    const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
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

    return (
        <div>
            <Container className="containerMe">
                <div className='navBar-background-image'>
                </div>
                <div className="viajes-container">

                    <div className="containerForm">

                        <div className="fromSearch">
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
                        </div>

                        <div className='containerBaner'>
                            <div className='bannerHome'>
                                <h1>DESCUENTOS</h1>
                                <h1>IMPERDIBLES</h1>
                                <h1>A LA COSTA</h1>
                                <h6>HASTA UN</h6>
                                <h2>50%OFF</h2>
                                <h6>EN BUTACAS Y EMPRESAS SELECCINADAS</h6>
                            </div>
                        </div>

                    </div>

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

                </div>
                 <Cartelera/>
                       
                <div className='ToWhatsApp'>
                    <Link to="http://wa.me/5491139505311" className='btn-wa'>
                        <img src="./img/wap1.png" alt="WhatsApp" />
                    </Link>
                </div>
            </Container>
        </div>

    );
};

export default ViajesList;