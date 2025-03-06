import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-white">
            <Container className='NaVBar'>
                <Navbar.Brand href="/">
                    <img src="./img/logonyc.png" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/nosotros">Nosotros</Link>
                        <Link to="/catalogo">Buscar pasajes</Link>
                        <Link to="https://www.instagram.com/nycpasajes/?igsh=MTR3ejUzYjR5enJs&utm_source=qr">Instagram</Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;