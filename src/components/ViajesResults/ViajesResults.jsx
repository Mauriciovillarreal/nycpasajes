import React from 'react';
import ViajeDetalle from '../ViajeDetalle/ViajeDetalle';
import { Container } from 'react-bootstrap';


const ViajesResults = ({ foundRoutes, date, returnDate, passengers, origin, destination }) => {
    return (
        <Container className="routes-list">
            {foundRoutes.map((route, index) => (
                <ViajeDetalle 
                    key={index} 
                    route={route} 
                    date={date} 
                    returnDate={returnDate} 
                    passengers={passengers} 
                    origin={origin} // Pasar origin como prop
                    destination={destination} // Pasar destination como prop
                />
            ))}
        </Container>
    );
};

export default ViajesResults;