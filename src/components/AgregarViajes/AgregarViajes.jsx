import React, { useEffect } from "react";
import { AgregarDatos } from "../AgregarDatos/AgregarDatos";

const AgregarViaje = () => {
    console.log("Renderizando AgregarViaje");

    // Datos que se van a agregar
    const datos = 

    {
      "empresa": "Micromar",
      "rutas": [
        {
          "destino_final": "Mar del Plata",
          "img": "./img/micromar.png",
          "paradas": {
            "paradas1": [
              {
                "nombre": "Dellepiane"
              },
              {
                "nombre": "Liniers"
              },
              {
                "nombre": "Retiro"
              }
            ],
            "paradas2": [
              {
                "nombre": "Havanna MDQ",
                "precioSemi": "44640",
                "precioCama": "50160"
              },
              {
                "nombre": "Mar del Plata",
                "precioSemi": "44640",
                "precioCama": "50160"
              },
              {
                "nombre": "Punta Mogotes",
                "precioSemi": "46720",
                "precioCama": "52800"
              },
              {
                "nombre": "Chapadmalal",
                "precioSemi": "46720",
                "precioCama": "52800"
              },
              {
                "nombre": "Miramar",
                "precioSemi": "49200",
                "precioCama": "56400"
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
