import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/config';
import './RutasFiltradas.css';

function RutasFiltradas() {
    const [rutas, setRutas] = useState([]);
    const [filtroEmpresa, setFiltroEmpresa] = useState('');
    const [filtroParada, setFiltroParada] = useState('');
    const [rutasFiltradas, setRutasFiltradas] = useState([]);

    useEffect(() => {
        async function obtenerRutas() {
            const rutasCollection = collection(db, 'viajes');
            const rutasSnapshot = await getDocs(rutasCollection);
            const rutasLista = rutasSnapshot.docs.map((doc) => doc.data());
            setRutas(rutasLista);
        }
        obtenerRutas();
    }, []);

    useEffect(() => {
        let resultadosFiltrados = rutas;

        if (filtroEmpresa) {
            resultadosFiltrados = resultadosFiltrados.filter((ruta) =>
                ruta.empresa.toLowerCase().includes(filtroEmpresa.toLowerCase())
            );
        }

        if (filtroParada) {
            resultadosFiltrados = resultadosFiltrados.filter((ruta) =>
                ruta.rutas.some((rutaItem) =>
                    Object.values(rutaItem.paradas || {}).flat().some((parada) =>
                        parada && parada.nombre && parada.nombre.toLowerCase().includes(filtroParada.toLowerCase())
                    )
                )
            );
        }

        setRutasFiltradas(resultadosFiltrados);
    }, [rutas, filtroEmpresa, filtroParada]);

    return (
        <div className="rutas-filtradas-container">
            <div className="rutas-filtradas-input-container">
                <input
                    type="text"
                    placeholder="Filtrar por empresa"
                    value={filtroEmpresa}
                    onChange={(e) => setFiltroEmpresa(e.target.value)}
                    className="rutas-filtradas-input"
                />
                <input
                    type="text"
                    placeholder="Filtrar por parada"
                    value={filtroParada}
                    onChange={(e) => setFiltroParada(e.target.value)}
                    className="rutas-filtradas-input"
                />
            </div>
            {rutasFiltradas.length > 0 ? (
                rutasFiltradas.map((ruta, index) => (
                    <div key={index} className="ruta-card">
                        <h2 className="ruta-empresa">Empresa {ruta.empresa}</h2>
                        {ruta.rutas.map((rutaItem, rutaIndex) => (
                            <div key={rutaIndex}>
                                <div className="paradas-iniciales-container">
                                    {Object.entries(rutaItem.paradas || {}).map(([paradasKey, paradasLista]) => {
                                        if (paradasKey === 'paradas1') {
                                            return (
                                                <div key={paradasKey}>
                                                    <h5 className="paradas-iniciales-titulo">Paradas Iniciales:</h5>
                                                    <ul className="paradas-lista paradas-iniciales-lista">
                                                        {paradasLista.map((parada, paradaIndex) => (
                                                            <li key={paradaIndex} className="parada-item">{parada && parada.nombre}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <div className="destinos-container">
                                    {Object.entries(rutaItem.paradas || {}).map(([paradasKey, paradasLista]) => {
                                        if (paradasKey === 'paradas2') {
                                            return (
                                                <div key={paradasKey}>
                                                    <h5 className="paradas-intermedias-titulo">Destinos:</h5>
                                                    <ul className="paradas-lista destinos-lista">
                                                        {paradasLista.map((parada, paradaIndex) => (
                                                            <li key={paradaIndex} className="parada-item">{parada && parada.nombre}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No se encontraron rutas.</p>
            )}
        </div>
    );
}

export default RutasFiltradas;