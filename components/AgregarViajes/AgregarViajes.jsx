import React, { useEffect } from "react";
import { AgregarDatos } from "../AgregarDatos/AgregarDatos";

const AgregarViaje = () => {
    console.log("Renderizando AgregarViaje");

    // Datos que se van a agregar
    const datos = 

   
    {
      "empresa": "Argentina",
      "rutas": [
        {
          "id": "Argentina",
          "destino_final": "Rosario",
          "img": "./img/arg.jpg",
          "paradas": {
            "paradas1": [
              {
                "nombre": "La Plata",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Solano",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Burzaco Vapor",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Burzaco los Pinos",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Lavallol BSAS",
                "precioSemi": 0,
                "precioCama": 0
              },
          
              {
                "nombre": "San Justo",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Liniers",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Ramos Mejía",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Terminal Morón",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Ituzaingó BSAS",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "San Antonio de Padua",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Merlo BSAS",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Paso del Rey",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Moreno las Piedras",
                "precioSemi": 0,
                "precioCama": 0
              },
              {
                "nombre": "Lujan BSAS",
                "precioSemi": 0,
                "precioCama": 0
              }
            ],
            "paradas2": [
              {
                "nombre": "San Antonio de Areco Estacion Puma",
                "precioSemi": 8000,
                "precioCama": 9800
              },
              {
                "nombre": "Cap . Sarmiento BSAS",
                "precioSemi": 10000,
                "precioCama": 12200
              },
              {
                "nombre": "Arrecifes BSAS",
                "precioSemi": 12000,
                "precioCama": 14600
              },
              {
                "nombre": "Pergamino",
                "precioSemi": 16000,
                "precioCama": 18900
              },
              {
                "nombre": "San Nicolas Parador",
                "precioSemi": 16500,
                "precioCama": 19200
              },
              {
                "nombre": "Rosario",
                "precioSemi": 20000,
                "precioCama": 24600
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
