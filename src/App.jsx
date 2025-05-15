import { HashRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { Nosotros } from './components/Nosotros/Nosotros';
import Promociones from './components/Promociones/Promociones';

const App = () => {
  return (
    <HashRouter>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agencias" element={<Nosotros />} />
        <Route path="/Promociones" element={<Promociones />} />
      </Routes>

      <Footer />
    </HashRouter>
  )
}

export default App
