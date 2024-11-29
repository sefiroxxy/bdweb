import React, { useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'

import imgEnvio from "../assets/imgEnvio.png"
import imgSoporte from "../assets/imgSoporte.png"
import imgCalidad from "../assets/imgCalidad.png"

import imgCuchillo from "../assets/imgCuchillo.png"
import imgSarten from "../assets/imgSarten.png"
import imgPackSarten from "../assets/imgPackSarten.png"

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-text">Puchero Market</h1>
        <p className="hero-description">
          Ollas y sartenes para todos los fines y propósitos.
          Navegue, encuentre y califique.
        </p>
        <button className="hero-button">Explorar Productos</button>
      </div>
      <div className="hero-image"></div>

      <div className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src={imgCuchillo} alt="Olla de Acero" className="product-image" />
            <h3>Cuchillo de Acero</h3>
            <p>$49.999</p>
          </div>
          <div className="product-card">
            <img src={imgSarten} alt="Sartén Antiadherente" className="product-image" />
            <h3>Sartén Antiadherente</h3>
            <p>$29.999</p>
          </div>
          <div className="product-card">
            <img src={imgPackSarten} alt="Cacerola de Cerámica" className="product-image" />
            <h3>Pack Sartenes</h3>
            <p>$39.999</p>
          </div>
        </div>
      </div>

      <div className="benefits-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <img src={imgEnvio} alt="Envío rápido" className="benefit-icon" />
            <h3>Envío Rápido</h3>
            <p>Entrega en 48 horas a todo el país.</p>
          </div>
          <div className="benefit-card">
            <img src={imgCalidad} alt="Calidad Garantizada" className="benefit-icon" />
            <h3>Calidad Garantizada</h3>
            <p>Productos seleccionados con los más altos estándares.</p>
          </div>
          <div className="benefit-card">
            <img src={imgSoporte} alt="Soporte 24/7" className="benefit-icon" />
            <h3>Soporte 24/7</h3>
            <p>Estamos aquí para ayudarte siempre.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

