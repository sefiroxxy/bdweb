import React, { useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'

const Home = () => {
  
  return (
    <div className='hero'>
        <div className="hero-content">
            <h1 className='hero-text'>Puchero Market</h1>
            <p className='hero-description'>
            Ollas y sarternes para todos los fines y propositos.
            Navege, encuentre y califique.
            </p>
        </div>
        <div className="hero-image"></div>
    </div>
  )
}

export default Home