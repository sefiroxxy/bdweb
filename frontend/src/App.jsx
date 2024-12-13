import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Articulos from './components/Articulos';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AñadirReviewer from './components/AñadirReviewer';
import AñadirArticulo from './components/AñadirArticulo';
import ListaArticulos from './components/listaArticulos'; // Ajuste: Nombre PascalCase
import ListaUsuarios from './components/listaUsuarios';  // Ajuste: Nombre PascalCase
import ListaComentarios from './components/listaComentarios';  
import Logout from './components/Logout';
import axios from 'axios';
import EditarArticulo from './components/editarArticulo';
import EditarReviewer from './components/editarReviewer';
import ComentarioArticulo from './components/comentarioArticulo';
function App() {
  const [role, setRole] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/verify')
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole('');
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/login" element={<Login setRoleVar={setRole} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/añadirreviewer" element={<AñadirReviewer />} />
        <Route path="/añadirarticulo" element={<AñadirArticulo />} />
        <Route path="/listausuarios" element={<ListaUsuarios />} /> 
        <Route path="/listaarticulos" element={<ListaArticulos />} /> 
        <Route path="/updateArticulo/:id" element={<EditarArticulo />} /> 
        <Route path="/updateReviewer/:id" element={<EditarReviewer />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/comentarioArticulo/:id" element={<ComentarioArticulo/>} />
        <Route path="/listaComentarios" element={<ListaComentarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
