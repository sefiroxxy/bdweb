import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css'

const Navbar = ({ role }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">Puchero Market</Link>
            </div>
            <div className="navbar-right">
                <Link to="/articulos" className="navbar-link">Articulos</Link>
                {role === "admin" && <>
                    <Link to="/añadirarticulo" className="navbar-link">Añadir Articulo</Link>
                    <Link to="/añadirreviewer" className="navbar-link">Añadir Reviewer</Link>
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                </>
                }
                {role === "" ?
                    <Link to="/login" className='navbar-link'>Login</Link>
                    : <Link to="/logout" className='navbar-link'>Logout</Link>
                }

            </div>
        </nav>
    )
}

export default Navbar