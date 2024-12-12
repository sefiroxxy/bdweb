import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Articulos.css";

const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [filteredArticulos, setFilteredArticulos] = useState([]);
    const [search, setSearch] = useState("");

    // Estados para filtros
    const [selectedMarcas, setSelectedMarcas] = useState([]);
    const [selectedMateriales, setSelectedMateriales] = useState([]);

    // Paginación
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 40;

    useEffect(() => {
        axios
            .get("http://localhost:3001/articulos")
            .then((res) => {
                setArticulos(res.data);
                setFilteredArticulos(res.data);
            })
            .catch((err) => console.error("Error al obtener los artículos:", err));
    }, []);

    // Filtrado por texto
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
    };

    // Ejemplo de marcas y materiales disponibles (podría venir del backend, aquí se asume estático)
    const availableMarcas = ["Arcos", "Victorinox", "Zwilling", "Wüsthof"];
    const availableMateriales = ["Acero Inox", "Acero Carbono", "Cerámico", "Damascado"];

    const handleMarcaChange = (marca) => {
        setCurrentPage(0); // Reiniciar a primera página al cambiar filtros
        if (selectedMarcas.includes(marca)) {
            // deseleccionar
            setSelectedMarcas(selectedMarcas.filter(m => m !== marca));
        } else {
            // seleccionar
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

    // Aplicación de filtros combinados
    useEffect(() => {
        let result = articulos;

        // Filtro por texto
        if (search.trim() !== "") {
            result = result.filter((articulo) =>
                articulo.name.toLowerCase().includes(search)
            );
        }

        // Filtro por marcas seleccionadas
        if (selectedMarcas.length > 0) {
            result = result.filter((articulo) => selectedMarcas.includes(articulo.marca));
        }

        // Filtro por materiales seleccionados
        if (selectedMateriales.length > 0) {
            result = result.filter((articulo) => selectedMateriales.includes(articulo.material));
        }

        setFilteredArticulos(result);
        setCurrentPage(0); // Al cambiar filtros o búsqueda, volver a la primera página
    }, [articulos, search, selectedMarcas, selectedMateriales]);

    // Cálculo de paginación
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
                {/* Panel de Filtros a la izquierda */}
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

                {/* Contenido de artículos a la derecha */}
                <div className="articulos-content">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar artículos..." value={search} onChange={handleSearch} />
                    </div>

                    <div className="articulos-grid">
                        {displayedArticulos.map((articulo) => (
                            <div className="articulo-card" key={articulo.id}>
                                <img src={articulo.imageUrl} alt={articulo.name} className="articulo-image" />
                                <div className="articulo-info">
                                    <h3>{articulo.name}</h3>
                                    <p className="articulo-price">${articulo.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {displayedArticulos.length === 0 && (
                        <p className="no-results">No se encontraron resultados</p>
                    )}

                    {/* Paginación */}
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