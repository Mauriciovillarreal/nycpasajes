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

      <Container className='containerIndex'>
        <div className="formSarch">
          <h2 className="search-title">Busca tus pasajes</h2>

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
          <div className="date-picker-container">
            <div className="input-container izq">
              <label>Partida</label>
              <div className="input-with-icon">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-container der">
              <label>Regreso (opcional)</label>
              <div className="input-with-icon">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* PASAJEROS */}
          <div className="input-container">
            <label>Cantidad de pasajeros</label>
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