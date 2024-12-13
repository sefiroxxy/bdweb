import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Articulos.css";

const Articulos = () => {
    const [articulos, setArticulos] = useState([]);
    const [filteredArticulos, setFilteredArticulos] = useState([]);
    const [search, setSearch] = useState("");

    // Filtros
    const [selectedMarca, setSelectedMarca] = useState('');
    const [selectedTipo, setSelectedTipo] = useState('');
    const [selectedPrecio, setSelectedPrecio] = useState('');
    const [enOferta, setEnOferta] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;
    const navigate = useNavigate();

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

    // Listas de opciones
    const availableMarcas = ["Arcos", "Victorinox", "Zwilling", "Wüsthof"];
    const availableTipos = ["acero al carbono", "acero inoxidable", "acero de herramienta", "acero de alta gama", "otro"];

    // Rangos de precio
    const precioRanges = [
        { label: "0 - 50.000", value: "0-50000" },
        { label: "50.000 - 100.000", value: "50000-100000" },
        { label: "100.000 - 250.000", value: "100000-250000" },
        { label: "Más de 250.000", value: "250000+" }
    ];

    useEffect(() => {
        let result = articulos;

        // Filtro por búsqueda
        if (search.trim() !== "") {
            result = result.filter((articulo) =>
                articulo.name.toLowerCase().includes(search)
            );
        }

        // Filtro por marca
        if (selectedMarca) {
            result = result.filter((art) => art.marca === selectedMarca);
        }

        // Filtro por tipo de cuchillo
        if (selectedTipo) {
            result = result.filter((art) => art.tipoCuchillo === selectedTipo);
        }

        // Filtro por rango de precio
        if (selectedPrecio) {
            let [min, max] = selectedPrecio.split('-');
            const minVal = Number(min);
            if (max === undefined) {
                // 250000+
                result = result.filter((art) => art.price >= minVal);
            } else {
                const maxVal = Number(max);
                result = result.filter((art) => art.price >= minVal && art.price <= maxVal);
            }
        }

        // Filtro por oferta
        if (enOferta) {
            result = result.filter((art) => art.onOferta === true);
        }

        setFilteredArticulos(result);
        setCurrentPage(0);
    }, [articulos, search, selectedMarca, selectedTipo, selectedPrecio, enOferta]);

    const totalItems = filteredArticulos.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const displayedArticulos = filteredArticulos.slice(startIdx, endIdx);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleArticuloClick = (id) => {
        // Redirige a detalles del artículo
        navigate(`/detallesArticulo/${id}`);
    };

    return (
        <div className="articulos-page">
            <h1>Lista de Artículos</h1>

            <div className="articulos-container">
                {/* Panel de Filtros */}
                <div className="filtros-panel">
                    <h2>Filtros</h2>

                    <div className="filtro-group">
                        <h3>Marcas</h3>
                        <select value={selectedMarca} onChange={(e) => setSelectedMarca(e.target.value)}>
                            <option value="">Todas</option>
                            {availableMarcas.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filtro-group">
                        <h3>Tipo de Cuchillo</h3>
                        <select value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)}>
                            <option value="">Todos</option>
                            {availableTipos.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filtro-group">
                        <h3>Rango de Precio</h3>
                        <select value={selectedPrecio} onChange={(e) => setSelectedPrecio(e.target.value)}>
                            <option value="">Todos</option>
                            {precioRanges.map((r) => (
                                <option key={r.value} value={r.value}>{r.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filtro-group">
                        <h3>En Oferta</h3>
                        <label>
                            <input
                                type="checkbox"
                                checked={enOferta}
                                onChange={(e) => setEnOferta(e.target.checked)}
                            />
                            Sólo en oferta
                        </label>
                    </div>
                </div>

                <div className="articulos-content">
                    <div className="search-bar">
                        <input type="text" placeholder="Buscar artículos..." value={search} onChange={handleSearch} />
                    </div>

                    <div className="articulos-grid">
                        {displayedArticulos.map((articulo) => (
                            <div className="articulo-card" key={articulo._id}>
                                <img 
                                    src={articulo.imageUrl} 
                                    alt={articulo.name} 
                                    className="articulo-image"
                                    onClick={() => handleArticuloClick(articulo._id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className="articulo-info">
                                    <h3>{articulo.name}</h3>
                                    <p>{articulo.description}</p>
                                    <p className="articulo-price">${articulo.price}</p>
                                    {articulo.onOferta && articulo.descuento > 0 && (
                                        <span className="descuento-label">{articulo.descuento}% OFF</span>
                                    )}
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
