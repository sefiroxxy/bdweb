import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AñadirArticulo.css';

const AñadirArticulo = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateFormData = () => {
        const { name, description, price, imageUrl } = formData;

        if (!name || !description || !price || !imageUrl) {
            setError('Todos los campos son obligatorios.');
            return false;
        }

        if (isNaN(price) || Number(price) <= 0) {
            setError('El precio debe ser un número positivo.');
            return false;
        }

        // Validar formato de URL para imageUrl
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*).)+[a-z]{2,}|'+ // nombre de dominio
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // dirección IP (v4)
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // puerto y ruta
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // cadena de consulta
            '(\\#[-a-z\\d_]*)?$','i'); // fragmento de URL

        if (!urlPattern.test(imageUrl)) {
            setError('La URL de la imagen no es válida.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!validateFormData()) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('http://localhost:3001/articulos/add', formData, {
                withCredentials: true,
            });

            if (res.data.added) {
                setSuccess('Artículo agregado exitosamente.');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setError(res.data.message || 'Error al agregar el artículo.');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Error al comunicarse con el servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="añadir-articulo-container">
            <form className="añadir-articulo-form" onSubmit={handleSubmit}>
                <h2>Agregar Artículo</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="form-group">
                    <label htmlFor="name">Nombre del Artículo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Ingrese el nombre del artículo"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Ingrese una descripción"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Ingrese el precio del artículo"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">URL de la Imagen</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Ingrese la URL de la imagen"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-register" disabled={loading}>
                    {loading ? 'Cargando...' : 'Agregar'}
                </button>
            </form>
        </div>
    );
};

export default AñadirArticulo;
