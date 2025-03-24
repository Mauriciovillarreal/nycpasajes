import './Home.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Cartelera } from '../Cartelera/Cartelera';
import { PreguntasFrecuentes } from '../PreguntasFrecuentes/PreguntasFrecuentes';

export const Home = () => {
  return (
    <Container>
      <div className='Home'>
        <h1>Agencia de Turismo y Pasajes</h1>
      </div>

      <Cartelera />
      <PreguntasFrecuentes />

      <div className='ToWhatsApp'>
        <Link to="http://wa.me/5491139505311" className='btn-wa'>
          <img src="./img/wap1.png" alt="" />
        </Link>
      </div>
    </Container>
  );
};