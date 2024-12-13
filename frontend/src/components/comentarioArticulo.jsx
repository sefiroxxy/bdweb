import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/comentarioArticulo.css";

const ComentarioArticulo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [articuloName, setArticuloName] = useState("");
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    useEffect(() => {
        // Verificar usuario
        axios.get("http://localhost:3001/auth/verify", { withCredentials: true })
            .then(res => {
                if (res.data.login) {
                    setUsername(res.data.username);
                    setRole(res.data.role);

                    // Obtener datos del artículo
                    return axios.get(`http://localhost:3001/articulos/load/${id}`, { withCredentials: true })
                } else {
                    navigate("/login");
                }
            })
            .then(res => {
                if (res && res.data) {
                    setArticuloName(res.data.name);

                    // Cargar comentario previo (si existe)
                    return axios.get(`http://localhost:3001/comentarios?articuloId=${id}&username=${username}`, { withCredentials: true })
                }
            })
            .then(res => {
                if (res && res.data && res.data.length > 0) {
                    const prevComment = res.data[0]; 
                    setRating(prevComment.rating);
                    setComment(prevComment.comment);
                }
            })
            .catch(err => console.error(err));
    }, [id, navigate, username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/comentarios", {
            articuloId: id,
            username,
            rating,
            comment
        }, { withCredentials: true })
        .then((res) => {
            console.log("Comentario guardado:", res.data);
            navigate("/articulos");
        })
        .catch((err) => console.error("Error al guardar comentario:", err));
    };

    return (
        <div className="comentario-articulo-page">
            <h2>Comentar Artículo</h2>
            <p><strong>Artículo:</strong> {articuloName}</p>
            <form onSubmit={handleSubmit} className="comentario-form">
                <div className="form-group">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        readOnly
                    />
                </div>

                <div className="form-group">
                    <label>Calificación (1 a 5 estrellas):</label>
                    <div className="rating-group">
                        {[1,2,3,4,5].map(star => (
                            <label key={star}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                                {star} ★
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Comentario:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn-submit">Enviar Comentario</button>
            </form>
        </div>
    );
};

export default ComentarioArticulo;
