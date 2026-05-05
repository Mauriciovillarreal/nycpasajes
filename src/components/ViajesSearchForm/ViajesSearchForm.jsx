import Select from 'react-select';
import './ViajesSearchForm.css';
import { Container } from 'react-bootstrap';

const ViajesSearchForm = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  date,
  setDate,
  returnDate,
  setReturnDate,
  passengers,
  setPassengers,
  uniqueStops,
  handleSearch
}) => {
  return (
    <div className="filtros-form">
      <div className="navBar-background-image" />
      <Container>

      <div className='containerIndex'>
        <div className="formSarch">

           <div className="formGrid">
            {/* ORIGEN */}
            <div>
              <label>Origen</label>
              <Select
                value={origin}
                onChange={(selected) => setOrigin(selected)}
                options={uniqueStops}
                placeholder="Selecciona el origen"
                isClearable
              />
            </div>

            {/* DESTINO */}
            <div className="input-container">
              <label>Destino</label>
              <Select
                value={destination}
                onChange={(selected) => setDestination(selected)}
                options={uniqueStops}
                placeholder="Selecciona el destino"
                isClearable
              />
            </div>

            {/* FECHAS */}
            <div className="date-row">
              <div className="input-container">
                <label>Partida</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="input-container">
                <label>Regreso (opcional)</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>


            {/* PASAJEROS */}
            <div className="input-container">
              <label>Pasajeros</label>
              <input
                type="number"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                min="1"
                className="pasajeros"
              />
            </div>

            {/* BOTON */}
            <button
              onClick={handleSearch}
              className="search-button"
              disabled={!origin || !destination} // 👈 importante
            >
              Buscar pasajes
            </button>
          </div>


        </div>


      </div>
         </Container>
    </div>
  );
};

export default ViajesSearchForm;