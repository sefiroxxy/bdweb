import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/detallesArticulo.css';

const DetallesArticulo = () => {
    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/articulos/load/${id}`)
            .then(res => setArticulo(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!articulo) {
        return <div className="detalles-articulo-container">Cargando...</div>;
    }

    return (
        <div className="detalles-articulo-container">
            <div className="articulo-imagen">
                <img src={articulo.imageUrl} alt={articulo.name} />
            </div>
            <div className="articulo-info">
                <h2>{articulo.name}</h2>
                <p>{articulo.description}</p>
                <p><strong>Precio:</strong> ${articulo.price}</p>
                <p><strong>Tipo de Cuchillo:</strong> {articulo.tipoCuchillo}</p>
                {articulo.onOferta && (
                    <p><strong>Descuento:</strong> {articulo.descuento}%</p>
                )}

                {/* Botón para comprar artículo, link externo */}
                <a href="https://www.tiendaexterna.com" target="_blank" rel="noopener noreferrer" className="btn-comprar">
                    Comprar Artículo
                </a>
            </div>
        </div>
    );
};

export default DetallesArticulo;
