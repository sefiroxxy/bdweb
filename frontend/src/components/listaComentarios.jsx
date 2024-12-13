// ListaComentarios.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/listaComentarios.css";

const ListaComentarios = () => {
    const [comentarios, setComentarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 100; // 100 comentarios por página

    useEffect(() => {
        axios
            .get("http://localhost:3001/comentarios", { withCredentials: true })
            .then((res) => setComentarios(res.data))
            .catch((err) => console.error("Error al obtener comentarios:", err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
            axios
                .delete(`http://localhost:3001/comentarios/${id}`, { withCredentials: true })
                .then(() => setComentarios((prev) => prev.filter((comentario) => comentario._id !== id)))
                .catch((err) => console.error("Error al eliminar comentario:", err));
        }
    };

    // Cálculo de paginación
    const totalItems = comentarios.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const displayedComentarios = comentarios.slice(startIdx, endIdx);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <div className="lista-comentarios-container">
            <h2>Lista de Comentarios</h2>
            <table className="comentarios-table">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Artículo</th>
                        <th>Rating</th>
                        <th>Comentario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedComentarios.map((comentario) => (
                        <tr key={comentario._id}>
                            <td>{comentario.username}</td>
                            <td>{comentario.articuloId?.name || "Sin nombre"}</td>
                            <td>{comentario.rating}</td>
                            <td>{comentario.comment}</td>
                            <td>
                                <button className="btn-delete" onClick={() => handleDelete(comentario._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
    );
};

export default ListaComentarios;
