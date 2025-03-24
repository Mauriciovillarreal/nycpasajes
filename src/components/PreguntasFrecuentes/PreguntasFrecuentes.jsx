import React from 'react';
import './PreguntasFrecuentes.css'; // Importa el archivo CSS

export const PreguntasFrecuentes = () => {
    return (
        <div className="preguntas-frecuentes">
            <h1>Información importante</h1>
            <div className="info">
                <h2>¿Cómo comprar?</h2>
                <h6>
                    Te brindamos la misma atención personalizada que recibirías en nuestra
                    oficina, pero desde la comodidad de tu hogar.
                </h6>
                <h6>
                    - Consulta por la web: Explora nuestras opciones y encuentra el viaje
                    ideal.
                </h6>
                <h6>
                    - Comunicación directa: Te atenderemos por WhatsApp para resolver
                    dudas y asesorarte en todo momento.
                </h6>
                <h6>
                    - A medida que avanzamos en la reserva, te enviaremos los horarios de
                    los viajes y las butacas disponibles para que puedas elegir. Una vez
                    finalizado este paso, te pediremos los datos de los pasajeros de
                    manera segura y sencilla.
                </h6>
            </div>

            <div className="info">
                <h2>¿Dónde quedan las terminales/paradas?</h2>
                <h6>Morón terminal - Av. Rivadavia 17415</h6>
                <h6>Vergara y Gaona - Reyes Católicos 218</h6>
                <h6>Liniers - Av. Gral. Paz 16880</h6>
                <h6>Retiro - Av. Antártida Argentina y Calle 10</h6>
            </div>

            <div className="info">
                <h2>¿Que equipaje puedo llevar?</h2>
                <h6>Bolso de mano: Tamaño máximo de 40 x 40 x 25 cm</h6>
                <h6>Valija: Tamaño máximo de 80 x 80 x 30 cm</h6>
                <h6>Peso total permitido: Entre ambos, hasta 15 kg</h6>
                <h6>Importante: Guardá siempre el ticket que te entrega el conductor al despachar tu equipaje</h6>
                <h6>NO SE CONSIDERAN COMO EQUIPAJE:</h6>
                <h6>Sillas, reposeras, sombrillas,heladeras, cañas de pescar, cajas y otros bulots que no sean valijas o bolsos</h6>
            </div>
        </div>
    );
};