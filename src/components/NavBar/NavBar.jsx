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
          <Nav className="ms-auto"> {/* Cambiado a ms-auto */}
            <Link to="/Nosotros" className="navbar-brand navBarMe">
              <p>AGENCIAS</p> 
            </Link>
            <Link to="/catalogo" className="navbar-brand navBarMe">
              <p>BUSCAR SERVICIOS</p> 
            </Link>
            <Link to="/promociones" className="navbar-brand navBarMe">
              <p>PROMOCIONES</p> 
            </Link>
         
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;