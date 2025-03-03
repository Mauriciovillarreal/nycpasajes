import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NavBar.css';

const NavBar = () => {
    return (
        <Container>
        <nav>
            <Link to="/">
            <img src="./img/logonyc.png" alt="" />
            </Link>
           
        </nav>


        </Container>
    )
}

export default NavBar