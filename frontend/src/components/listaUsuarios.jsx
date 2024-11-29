import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/listaUsuarios.css";

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/reviewer")
            .then((res) => setUsuarios(res.data))
            .catch((err) => console.error("Error al obtener usuarios:", err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            axios
                .delete(`http://localhost:3001/reviewer/${id}`)
                .then(() => setUsuarios((prev) => prev.filter((usuario) => usuario._id !== id)))
                .catch((err) => console.error("Error al eliminar usuario:", err));
        }
    };

    const handleEdit = (id) => {
        navigate(`/editarusuario/${id}`);
    };

    return (
        <div className="lista-usuarios-container">
            <h2>Lista de Usuarios</h2>
            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.username}</td>
                            <td>{usuario.roll}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(usuario._id)}>
                                    Editar
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(usuario._id)}>
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

export default ListaUsuarios;
