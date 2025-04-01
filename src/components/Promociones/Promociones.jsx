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


            <Container>
                <h2>Aprovecha los descuentos</h2>
            </Container>

            <Container className='containerContent'>

                <div className='estudiantes'>
                    <h5>20% Soy Estudiante</h5>
                    <div class="containerPromo">
                        <div class="textLogo">
                            <div>
                                <h1>20%</h1>
                                <h6>de descuento</h6>
                            </div>
                            <div className='logo'>
                                <img src="./img/logo-white.png" alt="" />
                            </div>
                        </div>
                        <div className="botText">
                            <h6>En destinos seleccionados</h6>
                        </div>
                    </div>
                    <p>¡20% de descuento en pasajes de micro!
                        Si sos estudiante universitario y estás registrado en <a href="https://soyestudiante.com.ar/" target='blanck'>soyestudiante.com.ar</a>  podés obtener un 20% de descuento en una gran cantidad de destinos de muchas empresas de micro.
                    </p>

                </div>

                <div className='simple'>
                    <h5>Cuota Simple</h5>
                    <div class="containerPromo">
                        <div class="textLogo">
                            <div>
                                <h1>3<span className='spanCuota'>y</span>6</h1>
                                <h6>cuotas fijas</h6>
                            </div>
                            <div className='logo'>
                                <img src="./img/simple.png" alt="" />
                            </div>
                        </div>
                        <div className='botText'>

                            <h6>En todos los destinos</h6>

                        </div>
                    </div>
                    <p>¡Financiá tus pasajes con plan Cuota Simple!
                        Comprá tus pasajes de micro en 3 o 6 cuotas fijas con las tarjetas de crédito Visa, Mastercard, American Express y Cabal.</p>

                </div>
            </Container>

        </div>
    )
}

export default Promociones