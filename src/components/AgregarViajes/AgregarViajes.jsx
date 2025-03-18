import React, { useEffect } from "react";
import { AgregarDatos } from "../AgregarDatos/AgregarDatos";

const AgregarViaje = () => {
    console.log("Renderizando AgregarViaje");

    // Datos que se van a agregar
    const datos = 

    {"empresa": "Sierras Cordobesas",
        "rutas": [
          {
            "id": "Sierras Cordobesas",
            
            "destino_final": "Mina Clavero",
            "img": "./img/sierras-cordobesas.jpg",
            "paradas": {
              "paradas1": [
                {
                  "nombre": "Retiro",
                  "precioSemi": 0,
                  "precioCama": 0
                },
                {
                  "nombre": "Liniers",
                  "precioSemi": 0,
                  "precioCama": 0
                },
                {
                  "nombre": "Vergara y Gaona",
                  "precioSemi": 0,
                  "precioCama": 0
                },
                {
                  "nombre": "Moreno las Piedras",
                  "precioSemi": 0,
                  "precioCama": 0
                }
              ],
              "paradas2": [
                {
                  "nombre": "Rio Cuarto",
                  "precioSemi": 32000,
                  "precioCama": 40000
                },
                {
                  "nombre": "Achiras",
                  "precioSemi": 40000,
                  "precioCama": 51600
                },
                {
                  "nombre": "Villa del Carmen",
                  "precioSemi": 40000,
                  "precioCama": 55000
                },
                {
                  "nombre": "Papagayos",
                  "precioSemi": 40000,
                  "precioCama": 55000
                },
                {
                  "nombre": "Villa Larca",
                  "precioSemi": 40000,
                  "precioCama": 55000
                },
                {
                  "nombre": "Cortaderas",
                  "precioSemi": 40000,
                  "precioCama": 55000
                },
                {
                  "nombre": "Carpinteria",
                  "precioSemi": 40000,
                  "precioCama": 55000
                },
                {
                  "nombre": "Merlo San Luis",
                  "precioSemi": 40000,
                  "precioCama": 55000
                },
                {
                  "nombre": "Villa Dolores",
                  "precioSemi": 43000,
                  "precioCama": 57000
                },
                {
                  "nombre": "V. de las Rosas",
                  "precioSemi": 43700,
                  "precioCama": 58000
                },
                {
                  "nombre": "Nono",
                  "precioSemi": 45000,
                  "precioCama": 58000
                },
                {
                  "nombre": "Mina Clavero",
                  "precioSemi": 45000,
                  "precioCama": 58000
                }
              ]
            }
          }
        ]
      }
      
      


    useEffect(() => {
        console.log("Ejecutando AgregarDatos...");
        AgregarDatos(datos);
    }, []);

    return (
        <div>
            <h1>Agregar Viaje</h1>
            <p>Este componente agrega un viaje a la base de datos.</p>
        </div>
    );
};

export default AgregarViaje;
