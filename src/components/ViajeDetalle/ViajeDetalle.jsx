import './ViajeDetalle.css';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WHATSAPP_NUMBER = "5491139505311";

const ViajeDetalle = ({ route, date, returnDate, passengers, origin, destination }) => {

    const formatDateForWhatsapp = (dateString) => {
        if (!dateString) return "A definir"; // O el texto que prefieras para fecha no especificada
        try {
            // Creamos el objeto Date interpretando la fecha como local.
            // El formato 'YYYY-MM-DD' es interpretado como UTC por new Date() si no se especifica la hora.
            // Al añadir 'T00:00:00', nos aseguramos de que se mantenga como la fecha local correcta.
            const dateObj = new Date(dateString + 'T00:00:00');
            return dateObj.toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'America/Argentina/Buenos_Aires' // Especifica la zona horaria para evitar desfases
            });
        } catch (e) {
            console.error("Error formateando fecha:", e);
            return dateString; // Devuelve el string original si hay error
        }
    };

    const abrirWhatsApp = (originStop, destinationStop, price, empresa) => {
        let mensaje = `¡Hola! 👋 Estoy interesado/a en el siguiente viaje con *${empresa}*:\n\n`;
        mensaje += `🚌 *Desde:* ${originStop?.nombre || "Origen no especificado"}\n`;
        mensaje += `➡️ *Hacia:* ${destinationStop?.nombre || "Destino no especificado"}\n\n`;

        mensaje += `🗓️ *Fecha de Ida:* ${formatDateForWhatsapp(date)}\n`;
        if (returnDate) {
            mensaje += `↩️ *Fecha de Regreso:* ${formatDateForWhatsapp(returnDate)}\n`;
        }
        mensaje += `👥 *Pasajeros:* ${passengers}\n\n`;

        if (price) {
            mensaje += "Consulto por estas opciones de precio (por tramo):\n";
            if (price.semiCama) mensaje += `  • Semi-Cama: ARS ${price.semiCama}\n`;
            if (price.cama) mensaje += `  • Cama: ARS ${price.cama}\n`;
            if (price.estandar) mensaje += `  • Estándar: ARS ${price.estandar}\n`;
            if (price.promo) mensaje += `  • Promo 🔥: ARS ${price.promo}\n`;
            mensaje += "\n";
        } else {
            mensaje += "Quisiera saber los precios disponibles para este tramo.\n\n";
        }

        mensaje += `Agradecería información sobre la disponibilidad y cómo puedo realizar la reserva.\n¡Muchas gracias! 😊`;

        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWeb = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
        const urlApp = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${mensajeCodificado}`;

        Swal.fire({
            icon: 'info', // Cambiado a 'info' ya que es un paso informativo
            title: 'Preparando tu consulta',
            text: 'Serás redirigido a WhatsApp para enviar tu mensaje y coordinar la compra.',
            confirmButtonText: 'Ir a WhatsApp',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Detección simple de dispositivo móvil
                if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
                    window.location.href = urlApp;
                } else {
                    window.open(urlWeb, "_blank");
                }
            }
        });
    };


    const paradas1 = route.paradas.paradas1;
    const paradas2 = route.paradas.paradas2;

    let originStopResult = null;
    let destinationStopResult = null;

    const originStop1Result = paradas1.find(p => p.nombre === origin?.value); // Access origin.value safely
    const originStop2Result = paradas2.find(p => p.nombre === origin?.value); // Access origin.value safely
    const destinationStop1Result = paradas1.find(p => p.nombre === destination?.value); // Access destination.value safely
    const destinationStop2Result = paradas2.find(p => p.nombre === destination?.value); // Access destination.value safely

    if (originStop1Result && destinationStop2Result) {
        originStopResult = originStop1Result;
        destinationStopResult = destinationStop2Result;
    } else if (originStop2Result && destinationStop1Result) {
        originStopResult = originStop2Result;
        destinationStopResult = destinationStop1Result;
    }

    let priceToUse = null;

    if (destinationStopResult && (destinationStopResult.precioSemi || destinationStopResult.precioCama || destinationStopResult.precioEstandar || destinationStopResult.precioPromo)) {
        priceToUse = {
            semiCama: destinationStopResult.precioSemi,
            cama: destinationStopResult.precioCama,
            estandar: destinationStopResult.precioEstandar,
            promo: destinationStopResult.precioPromo
        };
    } else if (originStopResult && (originStopResult.precioSemi || originStopResult.precioCama || originStopResult.precioEstandar || originStopResult.precioPromo)) {
        priceToUse = {
            semiCama: originStopResult.precioSemi,
            cama: originStopResult.precioCama,
            estandar: originStopResult.precioEstandar,
            promo: originStopResult.precioPromo
        };
    }



    return (
        <div className="detalleViaje">
            <div className="viaje-header">
                {route.img && <img src={route.img} alt={`Logo de ${route.empresa}`} />}
            </div>
            <div className="grid-detalles">

                <div className="viajeInfo">
                    <div><p>{originStopResult?.nombre}</p></div>
                    <div>
                        <i className="fas fa-angle-right"></i>
                    </div>
                    <div><p>{destinationStopResult?.nombre}</p></div>
                </div>

            </div>





            <div className='containerPrice'>
                <div className="precios">
                    {priceToUse?.semiCama && (
                        <div className='precio-container'> {/* Nuevo contenedor */}
                            <div>
                                <h6><span>SEMICAMA</span></h6>
                            </div>
                            <div className='precioDetalle'>
                                <h3><span>DESDE</span></h3>
                                <h3><span>$</span><b>{priceToUse?.semiCama}</b></h3>
                            </div>
                        </div>
                    )}
                    {priceToUse?.cama && (
                        <div className='precio-container'> {/* Nuevo contenedor */}
                            <h6><span>CAMA</span></h6>
                            <div className='precioDetalle'>
                                <h3><span>DESDE</span></h3>
                                <h3><span>$</span><b>{priceToUse?.cama}</b></h3>
                            </div>
                        </div>
                    )}
                    {priceToUse?.estandar && (
                        <div className='precio-container'> {/* Nuevo contenedor */}
                            <h6><span>ESTANDAR</span></h6>
                            <div className='precioDetalle'>
                                <h3><span>DESDE</span></h3>
                                <h3><span>$</span><b>{priceToUse?.estandar}</b></h3>
                            </div>
                        </div>
                    )}
                    {priceToUse?.promo && (


                        <div className='precio-container'> {/* Nuevo contenedor */}
                            <h6><span>PROMO 🔥</span></h6>
                            <div className='precioDetalle'>
                                <h3><span>DESDE</span></h3>
                                <h3><span>$</span><b>{priceToUse?.promo}</b></h3>
                            </div>

                        </div>

                    )}
                </div>
                {priceToUse?.promo && (
                    <div className='notaBaja'>

                        <h2>🔥 Butacas seleccionadas</h2>
                    </div>
                )}
                <div>
                    <div className='notaBaja'>
                        <h2>Precios por tramo</h2>
                    </div>
                </div>
            </div>






            <div className='desktopbtn'>

                <div>

                    {priceToUse && (
                        <button onClick={() => abrirWhatsApp(originStopResult, destinationStopResult, priceToUse, route.empresa)} className="whatsapp-btn">
                            {/* Icono de Font Awesome */}
                            <i className="fab fa-whatsapp"></i>
                            Consultar
                        </button>
                    )}
                </div>

            </div>


        </div>
    );
};

export default ViajeDetalle;