import Select from 'react-select';
import './ViajesSearchForm.css';
import { Container } from 'react-bootstrap';


const ViajesSearchForm = ({ origin, setOrigin, destination, setDestination, date, setDate, returnDate, setReturnDate, passengers, setPassengers, uniqueStops, handleSearch }) => {
    return (
        <div className="filtros-form">
            {/* Fondo */}
            <div className="navBar-background-image" />


            <Container className='containerIndex'>
                {/* Contenido por delante */}
                <div className="formSarch">
                    <h2 className="search-title">Busca tus pasajes</h2>
                    <div>
                        <label>Origen</label>
                        <Select
                            value={origin}
                            onChange={setOrigin}
                            options={uniqueStops}
                            placeholder="Selecciona el origen"
                        />
                    </div>
                    <div className="input-container">
                        <label>Destino</label>
                        <Select
                            value={destination}
                            onChange={setDestination}
                            options={uniqueStops}
                            placeholder="Selecciona el destino"
                        />
                    </div>
                    <div className="date-picker-container">
                        <div className="input-container izq">
                            <label>Partida</label>
                            <div className="input-with-icon">
                                <input
                                    name="fecha"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="input-field"
                                    placeholder="Selecciona el destino"
                                />
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                        </div>
                        <div className="input-container der">
                            <label>Regreso (opcional)</label>
                            <div className="input-with-icon">
                                <input
                                    name="fechaRegreso"
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="input-field"
                                    placeholder="Selecciona el destino"
                                />
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <label>Cantidad de pasajeros</label>
                        <input
                            type="number"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            min="1"
                            className="pasajeros"
                        />
                    </div>
                    <button onClick={handleSearch} className="search-button">
                        Buscar pasajes
                    </button>
                    <h6>
                        Si no encontrás tu origen y destino podés consultar por Whatsapp
                    </h6>
                </div>

                <div className="containerBaner">
                    <div className="bannerHome">
                    <img src="./img/bannerform.jpg" alt="" />
                    </div>
                </div>


            </Container>

        </div>

    );
};

export default ViajesSearchForm;