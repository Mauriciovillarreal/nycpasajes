import React from 'react'
import { Container } from 'react-bootstrap'
import "./Promociones.css"
const Promociones = () => {
    return (
        <div className='containerPromociones'>

            <div className="title">
                <Container>
                    <h1>PROMOCIONES</h1>
                </Container>
            </div>

            <Container className='promociones'>
                <h2>Aprovecha los descuentos</h2>

                <div className="containerPromo">
                    <div>
                        <h5>20% Soy Estudiante</h5>
                        <img src="./img/soyestudiante.png" alt="" />
                        <p>¡20% de descuento en pasajes de micro!
                            Si sos estudiante universitario y estás registrado en <a href="https://soyestudiante.com.ar/" target='blanck'>soyestudiante.com.ar</a>  podés obtener un 20% de descuento en una gran cantidad de destinos de muchas empresas de micro.
                        </p>
                    </div>

                    <div>
                        <h5>Cuotas Simple</h5>
                        <img src="./img/cuotas.png" alt="" />
                        <p>¡Financiá tus pasajes con plan Cuota Simple!
                            Comprá tus pasajes de micro en 3 o 6 cuotas fijas con las tarjetas de crédito Visa, Mastercard, American Express y Cabal.</p>
                    </div>

                </div>


            </Container>

        </div>

    )
}

export default Promociones