import React, { useEffect } from "react";
import { AgregarDatos } from "../AgregarDatos/AgregarDatos";

const AgregarViaje = () => {
    console.log("Renderizando AgregarViaje");

    // Datos que se van a agregar
    const datos = 

    {
      "empresa": "Chevallier",
      "rutas": [
        {
          "id": "Chevallier",
          "destino_final": "Bariloche",
          "img": "./img/chevallier.jpg",
          "paradas": {
            "paradas1": [
              {
                "nombre": "Retiro"
              },
              {
                "nombre": "Liniers"
              },
              {
                "nombre": "Vergara y Gaona"
              },
              {
                "nombre": "Moreno las Piedras"
              },
              {
                "nombre": "Lujan BSAS"
              }
            ],
            "paradas2": [
              {
                "nombre": "Mercedes",
                "precioSemi": "6300",
                "precioCama": "10000"
              },
              {
                "nombre": "Chivilcoy",
                "precioSemi": "10200",
                "precioCama": "15000"
              },
              {
                "nombre": "Bragado",
                "precioSemi": "13100",
                "precioCama": "19000"
              },
              {
                "nombre": "9 de Julio",
                "precioSemi": "15200",
                "precioCama": "24000"
              },
              {
                "nombre": "Carlos Casares",
                "precioSemi": "18050",
                "precioCama": "29000"
              },
              {
                "nombre": "Pehuajo",
                "precioSemi": "21850",
                "precioCama": "34000"
              },
              {
                "nombre": "Trenque Launquen",
                "precioSemi": "25650",
                "precioCama": "41000"
              },
              {
                "nombre": "Pellegrini",
                "precioSemi": "28500",
                "precioCama": "46000"
              },
              {
                "nombre": "Santa Rosa LPA",
                "precioSemi": "40800",
                "precioCama": "49800"
              },
              {
                "nombre": "Padre Buodo",
                "precioSemi": "41175",
                "precioCama": "60800"
              },
              {
                "nombre": "Río Colorado",
                "precioSemi": "49250",
                "precioCama": "72800"
              },
              {
                "nombre": "Choele Choel",
                "precioSemi": "56375",
                "precioCama": "83800"
              },
              {
                "nombre": "Chimpay",
                "precioSemi": "58275",
                "precioCama": "85800"
              },
              {
                "nombre": "Villa Regina",
                "precioSemi": "60650",
                "precioCama": "89800"
              },
              {
                "nombre": "Gral Roca RN",
                "precioSemi": "63025",
                "precioCama": "84050"
              },
              {
                "nombre": "Allen Acc Axion",
                "precioSemi": "64450",
                "precioCama": "86300"
              },
              {
                "nombre": "Cipolletti",
                "precioSemi": "66350",
                "precioCama": "88100"
              },
              {
                "nombre": "Neuquén",
                "precioSemi": "66825",
                "precioCama": "89450"
              },
              {
                "nombre": "Plottier",
                "precioSemi": "69675",
                "precioCama": "92600"
              },
              {
                "nombre": "V. El Chocón Ypf Pdor",
                "precioSemi": "81800",
                "precioCama": "113255"
              },
              {
                "nombre": "Piedra Del Águila",
                "precioSemi": "95860",
                "precioCama": "121760"
              },
              {
                "nombre": "Bariloche",
                "precioSemi": "94400🔥",
                "precioCama": "113300🔥"
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
