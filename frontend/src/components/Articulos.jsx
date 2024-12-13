import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Articulos.css";

const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [filteredArticulos, setFilteredArticulos] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedMarcas, setSelectedMarcas] = useState([]);
    const [selectedMateriales, setSelectedMateriales] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        axios
            .get("http://localhost:3001/articulos", { withCredentials: true })
            .then((res) => {
                setArticulos(res.data);
                setFilteredArticulos(res.data);
            })
            .catch((err) => console.error("Error al obtener los artículos:", err));
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
    };

    const availableMarcas = ["Arcos", "Victorinox", "Zwilling", "Wüsthof"];
    const availableMateriales = ["Acero Inox", "Acero Carbono", "Cerámico", "Damascado"];

    const handleMarcaChange = (marca) => {
        setCurrentPage(0);
        if (selectedMarcas.includes(marca)) {
            setSelectedMarcas(selectedMarcas.filter(m => m !== marca));
        } else {
            setSelectedMarcas([...selectedMarcas, marca]);
        }
    };

    const handleMaterialChange = (material) => {
        setCurrentPage(0);
        if (selectedMateriales.includes(material)) {
            setSelectedMateriales(selectedMateriales.filter(mat => mat !== material));
        } else {
            setSelectedMateriales([...selectedMateriales, material]);
        }
    };

    useEffect(() => {
        let result = articulos;

        if (search.trim() !== "") {
            result = result.filter((articulo) =>
                articulo.name.toLowerCase().includes(search)
            );
        }

        if (selectedMarcas.length > 0) {
            result = result.filter((articulo) => selectedMarcas.includes(articulo.marca));
        }

        if (selectedMateriales.length > 0) {
            result = result.filter((articulo) => selectedMateriales.includes(articulo.material));
        }

        setFilteredArticulos(result);
        setCurrentPage(0);
    }, [articulos, search, selectedMarcas, selectedMateriales]);

    const totalItems = filteredArticulos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const displayedArticulos = filteredArticulos.slice(startIdx, endIdx);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <div className="articulos-page">

            <h1>Lista de Artículos</h1>

            <div className="articulos-container">
                <div className="filtros-panel">
                    <h2>Filtros</h2>
                    <div className="filtro-group">
                        <h3>Marcas</h3>
                        {availableMarcas.map((marca) => (
                            <div key={marca}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMarcas.includes(marca)}
                                        onChange={() => handleMarcaChange(marca)}
                                    />
                                    {marca}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="filtro-group">
                        <h3>Material</h3>
                        {availableMateriales.map((material) => (
                            <div key={material}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMateriales.includes(material)}
                                        onChange={() => handleMaterialChange(material)}
                                    />
                                    {material}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="articulos-content">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar artículos..." value={search} onChange={handleSearch} />
                    </div>

                    <div className="articulos-grid">
                        {displayedArticulos.map((articulo) => (
                            <div className="articulo-card" key={articulo._id}>
                                <img src={articulo.imageUrl} alt={articulo.name} className="articulo-image" />
                                <div className="articulo-info">
                                    <h3>{articulo.name}</h3>
                                    <p>{articulo.description}</p>
                                    <p className="articulo-price">${articulo.price}</p>
                                    <div className="comentario-btn">
                                        <Link to={`/comentarioArticulo/${articulo._id}`}>
                                            <i className="bi bi-chat"></i> 
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {displayedArticulos.length === 0 && (
                        <p className="no-results">No se encontraron resultados</p>
                    )}

                    {totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`page-btn ${index === currentPage ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Articulos;
