import React from 'react';
import './PreguntasFrecuentes.css'; // Importa el archivo CSS

export const PreguntasFrecuentes = () => {
    return (
        <div className="preguntas-frecuentes">
            <h1>Información importante</h1>


            <div className="infoGropu">


                <div className="info">
                    <h2>¿Cómo comprar?</h2>
                    <p>
                        Te brindamos la misma atención personalizada que recibirías en nuestra
                        oficina, pero desde la comodidad de tu hogar.
                    </p>
                    <p>
                        - Consulta por la web: Explora nuestras opciones y encuentra el viaje
                        ideal.
                    </p>
                    <p>
                        - Comunicación directa: Te atenderemos por WhatsApp para resolver
                        dudas y asesorarte en todo momento.
                    </p>
                    <p>
                        - A medida que avanzamos en la reserva, te enviaremos los horarios de
                        los viajes y las butacas disponibles para que puedas elegir. Una vez
                        finalizado este paso, te pediremos los datos de los pasajeros de
                        manera segura y sencilla.
                    </p>
                </div>

                <div className="info">
                    <h2>¿Dónde quedan las terminales/paradas?</h2>
                    <p>Morón terminal - Av. Rivadavia 17415</p>
                    <p>Vergara y Gaona - Reyes Católicos 218</p>
                    <p>Liniers - Av. Gral. Paz 16880</p>
                    <p>Retiro - Av. Antártida Argentina y Calle 10</p>
                </div>

                <div className="info">
                    <h2>¿Que equipaje puedo llevar?</h2>
                    <p>Bolso de mano: Tamaño máximo de 40 x 40 x 25 cm</p>
                    <p>Valija: Tamaño máximo de 80 x 80 x 30 cm</p>
                    <p>Peso total permitido: Entre ambos, hasta 15 kg</p>
                    <p>Importante: Guardá siempre el ticket que te entrega el conductor al despachar tu equipaje</p>
                    <p>NO SE CONSIDERAN COMO EQUIPAJE:</p>
                    <p>Sillas, reposeras, sombrillas,heladeras, cañas de pescar, cajas y otros bultos que no sean valijas o bolsos</p>
                </div>

          


            </div>
        </div>
    );
};
