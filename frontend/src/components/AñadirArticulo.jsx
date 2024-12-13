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
        storeUrl: '',        // Nuevo campo para la URL externa
        tipoCuchillo: '',
        onOferta: false,
        descuento: 0
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const validateFormData = () => {
        const { name, description, price, imageUrl, storeUrl, tipoCuchillo, onOferta, descuento } = formData;

        if (!name || !description || !price || !imageUrl || !tipoCuchillo || !storeUrl) {
            setError('Todos los campos son obligatorios.');
            return false;
        }

        if (isNaN(price) || Number(price) <= 0) {
            setError('El precio debe ser un número positivo.');
            return false;
        }

        if (!isValidUrl(imageUrl)) {
            setError('La URL de la imagen no es válida.');
            return false;
        }

        if (!isValidUrl(storeUrl)) {
            setError('La URL externa de la tienda no es válida.');
            return false;
        }

        if (onOferta && (isNaN(descuento) || descuento < 0 || descuento > 100)) {
            setError('El descuento debe ser un número entre 0 y 100.');
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
                // Limpiar el formulario y redirigir después de 2 segundos
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    imageUrl: '',
                    storeUrl: '',
                    tipoCuchillo: '',
                    onOferta: false,
                    descuento: 0
                });
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

    const tiposCuchillo = [
        { value: '', label: 'Seleccione un tipo' },
        { value: 'acero al carbono', label: 'Acero al carbono' },
        { value: 'acero inoxidable', label: 'Acero inoxidable' },
        { value: 'acero de herramienta', label: 'Acero de herramienta' },
        { value: 'acero de alta gama', label: 'Acero de alta gama' },
        { value: 'otro', label: 'Otro' }
    ];

    return (
        <div className="añadir-articulo-container">
            <div className="form-scroll-container">
                <form className="añadir-articulo-form" onSubmit={handleSubmit}>
                    <h2>Ingresar Artículo</h2>
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

                    {/* Nuevo campo: URL Externo */}
                    <div className="form-group">
                        <label htmlFor="storeUrl">URL Externa de la Tienda</label>
                        <input
                            type="text"
                            id="storeUrl"
                            name="storeUrl"
                            placeholder="Ingrese la URL externa de la tienda"
                            value={formData.storeUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Tipo de Cuchillo</label>
                        <select name="tipoCuchillo" value={formData.tipoCuchillo} onChange={handleChange}>
                            {tiposCuchillo.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="onOferta"
                                checked={formData.onOferta}
                                onChange={handleChange}
                            />
                            Está en descuento
                        </label>
                    </div>

                    {formData.onOferta && (
                        <div className="form-group">
                            <label>Descuento (%)</label>
                            <input
                                type="number"
                                name="descuento"
                                value={formData.descuento}
                                onChange={handleChange}
                                min="0"
                                max="100"
                            />
                        </div>
                    )}

                    <button type="submit" className="btn-register" disabled={loading}>
                        {loading ? 'Cargando...' : 'Agregar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AñadirArticulo;
