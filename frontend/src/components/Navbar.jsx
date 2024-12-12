import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

const Navbar = ({ role }) => {
    useEffect(() => {
        const toggleButton = document.querySelector('#navbarSideCollapse');
        const offcanvas = document.querySelector('.offcanvas-collapse');

        if (toggleButton && offcanvas) {
            const handleClick = () => {
                offcanvas.classList.toggle('open');
            };

            toggleButton.addEventListener('click', handleClick);
            
            // Limpieza del event listener al desmontar el componente
            return () => {
                toggleButton.removeEventListener('click', handleClick);
            };
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" aria-label="Main navigation">
            <div className="container-fluid">
                {/* Marca de la web */}
                <Link to="/" className="navbar-brand">Puchero Market</Link>
                
                {/* Botón toggler para offcanvas en pantallas pequeñas */}
                <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenedor colapsable con clase offcanvas-collapse */}
                <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/articulos" className="nav-link">Artículos</Link>
                        </li>

                        {role === "admin" && (
                            <>
                                {/* Dropdown Listas */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#!" data-bs-toggle="dropdown" aria-expanded="false">
                                        Listas
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/listaarticulos" className="dropdown-item">Lista Artículos</Link></li>
                                        <li><Link to="/listausuarios" className="dropdown-item">Lista Usuarios</Link></li>
                                    </ul>
                                </li>

                                {/* Dropdown Agregar */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#!" data-bs-toggle="dropdown" aria-expanded="false">
                                        Agregar
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/añadirarticulo" className="dropdown-item">Añadir Artículo</Link></li>
                                        <li><Link to="/añadirreviewer" className="dropdown-item">Añadir Usuario</Link></li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                    {/* Parte derecha: Login/Logout */}
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {role === "" ? (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
