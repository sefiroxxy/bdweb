import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="left-navbar">
                <span> Puchero Market </span>  {/* MODIFICAR */}
            </div>
            <div className="right-navbar">
                <Link to="/articulos" className="navbar-link">Articulos</Link>
                <Link to="/login" className="navbar-link">Login</Link>
            </div>
        </nav>
    )
}
export default Navbar
