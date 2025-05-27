import './NavBar.css';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='navBar'>
      <div className='navBar-header'> {/* Contenedor para la imagen de fondo */}
    
        <Container className='containerNav nav'>
          <div>
            <Link to="/">
              <img src="./img/logonyc.png" alt="Logo" className="nav-logo" />
            </Link>
          </div>
          <div className='navLink'>
            <Link to="/agencias" className="navbar-brand navBarMe">
              <p>AGENCIAS</p>
            </Link>
            <Link to="/promociones" className="navbar-brand navBarMe">
              <p>PROMOS</p>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default NavBar;