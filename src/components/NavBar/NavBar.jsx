import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
            {/* Cambiar Link por un <a> normal */}
            <a href="/Nosotros" className="navbar-brand">
              Nosotros
            </a>
            <a href="/catalogo" className="navbar-brand">
              Buscar pasajes
            </a>
            <a href="https://www.instagram.com/nycpasajes/?igsh=MTR3ejUzYjR5enJs&utm_source=qr" className="navbar-brand">
              Instagram
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
