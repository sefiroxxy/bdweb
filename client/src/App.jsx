import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";
import Home from './components/Home'
import Navbar from './components/Navbar'
import Articulos from './components/Articulos'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AñadirReviewer from './components/añadirreviewer'
import Logout from "./components/Logout";
import axios from "axios";

function App() {
  const [role, setRole] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role)
        } else {
          setRole('')
        }
        console.log(res)
      }).catch(err => console.log(err))
  }, [])
  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articulos" element={<Articulos />}></Route>
        <Route path="/login" element={<Login setRoleVar={setRole} />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/añadirreviewer" element={<AñadirReviewer />}></Route>
        <Route path="/logout" element={<Logout setRole={setRole} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
