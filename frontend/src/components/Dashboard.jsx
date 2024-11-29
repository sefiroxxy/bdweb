import React from "react";
import "../css/Dashboard.css";

import imgCuchillo from "../assets/imgCuchillo.png"
import imgSarten from "../assets/imgSarten.png"
import imgPackSarten from "../assets/imgPackSarten.png"

const Dashboard = () => {
    return (
        <div className="user-dashboard">
            <h1>Bienvenido a tu Dashboard</h1>

            <div className="dashboard-overview">

                <div className="dashboard-card">
                    <h2>Productos Favoritos</h2>
                    <p>5 artículos</p>
                </div>

                <div className="dashboard-card">
                    <h2>Historial de Compras</h2>
                    <p>12 compras</p>
                </div>

                <div className="dashboard-card">
                    <h2>Ofertas Recomendadas</h2>
                    <p>3 nuevas ofertas</p>
                </div>

            </div>

            <div className="favorites-section">
                <h2>Tus Productos Favoritos</h2>
                <div className="favorites-grid">

                    <div className="favorite-item">
                        <img src={imgSarten} alt="Sartén" />
                        <h3>Sartén Antiadherente</h3>
                        <p>$29.999</p>
                        <button className="remove-btn">Eliminar de Favoritos</button>
                    </div>

                    <div className="favorite-item">
                        <img src={imgCuchillo} alt="Olla" />
                        <h3>Cuchillo de Acero</h3>
                        <p>$49.999</p>
                        <button className="remove-btn">Eliminar de Favoritos</button>
                    </div>

                </div>
            </div>

            <div className="purchase-history">

                <h2>Historial de Compras</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Fecha</th>
                            <th>Precio</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td>Sartén Antiadherente</td>
                            <td>2024-11-10</td>
                            <td>$29.999</td>
                            <td>Completado</td>
                        </tr>
                        <tr>
                            <td>Cuchillo de Acero</td>
                            <td>2024-10-05</td>
                            <td>$49.999</td>
                            <td>Completado</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
