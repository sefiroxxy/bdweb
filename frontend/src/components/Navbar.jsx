import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';

const Navbar = ({ role }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="navbar-brand">Puchero Market</Link>
                </div>
                <div className="navbar-right">
                    <Link to="/articulos" className="navbar-link">Artículos</Link>
                    {role === "admin" && (
                        <>
                            <Link to="/añadirarticulo" className="navbar-link">Añadir Artículo</Link>
                            <Link to="/añadirreviewer" className="navbar-link">Añadir Reviewer</Link>
                            <Link to="/listausuarios" className="navbar-link">Lista Usuarios</Link>
                            <Link to="/listaarticulos" className="navbar-link">Lista Artículos</Link>
                            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                        </>
                    )}
                    {role === "" ? (
                        <Link to="/login" className="navbar-link">Login</Link>
                    ) : (
                        <Link to="/logout" className="navbar-link">Logout</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
