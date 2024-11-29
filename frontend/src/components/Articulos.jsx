import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Articulos.css";

const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [filteredArticulos, setFilteredArticulos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:3001/articulos")
            .then((res) => {
                setArticulos(res.data);
                setFilteredArticulos(res.data);
            })
            .catch((err) => console.error("Error al obtener los artículos:", err));
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        const filtered = articulos.filter((articulo) =>
            articulo.name.toLowerCase().includes(value)
        );
        setFilteredArticulos(filtered);
    };

    return (
        <div className="articulos-page">
            <h1>Lista de Artículos</h1>
            
            <div className="search-bar">
                <input type="text" placeholder="Buscar artículos..." value={search} onChange={handleSearch}/>
            </div>
            
            <div className="articulos-grid">
                {filteredArticulos.map((articulo) => (
                    <div className="articulo-card" key={articulo.id}>
                        <img src={articulo.imageUrl} alt={articulo.name} className="articulo-image"/>
                        <div className="articulo-info">
                            <h3>{articulo.name}</h3>
                            <p>{articulo.description}</p>
                            <p className="articulo-price">${articulo.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {filteredArticulos.length === 0 && (
                <p className="no-results">No se encontraron resultados</p>
            )}
        </div>
    );
};

export default Articulos;
