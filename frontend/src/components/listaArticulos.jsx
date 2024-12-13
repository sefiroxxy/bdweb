import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/listaArticulos.css";

const ListaArticulos = () => {
    const [articulos, setArticulos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/articulos")
            .then((res) => setArticulos(res.data))
            .catch((err) => console.error("Error al obtener artículos:", err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
            axios
                .delete(`http://localhost:3001/articulos/delete/${id}`)
                .then(() => setArticulos((prev) => prev.filter((articulo) => articulo._id !== id)))
                .catch((err) => console.error("Error al eliminar artículo:", err));
        }
    };

    const handleEdit = (id) => {
        navigate(`/updateArticulo/${id}`);
    };

    return (
        <div className="lista-articulos-container">
            <h2>Lista de Artículos</h2>
            <table className="articulos-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Tipo de Cuchillo</th>
                        <th>Precio</th>
                        <th>En Oferta</th>
                        <th>Descuento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo) => (
                        <tr key={articulo._id}>
                            <td>{articulo.name}</td>
                            <td>{articulo.marca || "N/A"}</td>
                            <td>{articulo.tipoCuchillo || "N/A"}</td>
                            <td>${articulo.price}</td>
                            <td>{articulo.onOferta ? "Sí" : "No"}</td>
                            <td>{articulo.onOferta && articulo.descuento > 0 ? `${articulo.descuento}%` : "-"}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(articulo._id)}>
                                    Editar
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(articulo._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaArticulos;
