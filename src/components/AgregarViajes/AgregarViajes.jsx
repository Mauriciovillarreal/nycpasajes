// AgregarViaje.js

import React, { useEffect } from "react";
import { AgregarDatos } from "../AgregarDatos/AgregarDatos";
AgregarDatos
const AgregarViaje = () => {
    console.log("Renderizando AgregarViaje");
    // Datos que se van a agregar
    const datos = {
        id: "6",
        origen: "Terminal Morón",
        empresa: "Sierras de Córdoba",
        img: "./img/sdc.jpg",
        destinos: {
          "Morón Córdoba": {
            semiCama: 24800,
            cama: 28800
          },
          "Morón Villa Carlos Paz": {
            semiCama: 26400,
            cama: 30800
          },
          Cosquín: {
            semiCama: 29200,
            cama: 32000
          },
          "Morón Villa Maria": {
            semiCama: 15200,
            cama: 22400
          },
          "Morón La Falda": {
            semiCama: 29200,
            cama: 32000
          }
        }
      };
      
      



    useEffect(() => {
        console.log("Ejecutando AgregarDatos...");
        AgregarDatos(datos);
    }, []); // Solo se ejecuta una vez cuando el componente se monta


    return (
        <div>
            <h1>Agregar Viaje</h1>
            <p>Este componente agrega un viaje a la base de datos.</p>
        </div>
    );
};

export default AgregarViaje;
