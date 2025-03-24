import React, { useEffect } from "react";
import { AgregarDatos } from "../AgregarDatos/AgregarDatos";

const AgregarViaje = () => {
    console.log("Renderizando AgregarViaje");

    // Datos que se van a agregar
    const datos = 

    {
      "empresa": "Aguila de Junin",
      "rutas": [
        {
          "destino_final": "Villa Gesell",
          "img": "./img/junin.jpg",
          "paradas": {
            "paradas1": [
              {
                "nombre": "Moreno las Piedras"
              },
              {
                "nombre": "Paso del Rey"
              },
              {
                "nombre": "Merlo BSAS"
              },
              {
                "nombre": "San Antonio de Padua"
              },
              {
                "nombre": "Ituzaingo"
              },
              {
                "nombre": "Terminal Morón"
              },
              {
                "nombre": "San Justo BSAS"
              }
            ],
            "paradas2": [
              {
                "nombre": "Chascomús",
                "precioEstandar": "12720"
              },
              {
                "nombre": "Lezama",
                "precioEstandar": "15984"
              },
              {
                "nombre": "Castelli",
                "precioEstandar": "18360"
              },
              {
                "nombre": "Dolores",
                "precioEstandar": "21152"
              },
              {
                "nombre": "San Clemente",
                "precioEstandar": "33320"
              },
              {
                "nombre": "Las Toninas",
                "precioEstandar": "34752"
              },
              {
                "nombre": "Santa Teresita",
                "precioEstandar": "35088"
              },
              {
                "nombre": "Mar del Tuyu",
                "precioEstandar": "35160"
              },
              {
                "nombre": "La Lucila",
                "precioEstandar": "35840"
              },
              {
                "nombre": "San Bernardo",
                "precioEstandar": "35976"
              },
                {
                "nombre": "Mar de Ajo",
                "precioEstandar": "35976"
              },
              {
                "nombre": "Pinamar",
                "precioEstandar": "35976"
              },
              {
                "nombre": "Villa Gesell",
                "precioEstandar": "38488"
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
