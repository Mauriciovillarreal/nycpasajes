import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const IconRute = ({ ruta }) => {
    return (
        <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'white', marginRight: '5px' }} />
            {ruta}
        </p>
    );
};

export default IconRute;