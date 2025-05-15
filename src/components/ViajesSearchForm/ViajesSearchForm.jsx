import Select from 'react-select';
import './ViajesSearchForm.css';

const ViajesSearchForm = ({ origin, setOrigin, destination, setDestination, date, setDate, returnDate, setReturnDate, passengers, setPassengers, uniqueStops, handleSearch }) => {
    return (
        <div className="filtros-form">
            <div className="formSarch">
                <h2 className="search-title">Busca tus pasajes</h2>
                <div>
                    <label>Origen</label>
                    <div className="custom-select">
                        <Select
                            value={origin}
                            onChange={setOrigin}
                            options={uniqueStops}
                            placeholder="Selecciona el origen"
                        />
                    </div>
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
                                onChange={e => setDate(e.target.value)}
                                className="input-field"
                            />
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                    </div>
                    <div className="input-container der">
                        <label>Regreso (opcional)</label>
                        <div className="input-with-icon ">
                            <input
                                name="fechaRegreso"
                                type="date"
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                className="input-field"
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
                        onChange={e => setPassengers(e.target.value)}
                        min="1"
                        className="input-field pasajeros"
                    />
                </div>
                <button onClick={handleSearch} className="search-button">Buscar pasajes</button>
                <h6>Si no encontras tu origen y destino podes consutlar por Whatsapp</h6>
            </div>
        </div>
    );
};

export default ViajesSearchForm;