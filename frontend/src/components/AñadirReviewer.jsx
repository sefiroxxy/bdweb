import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AñadirReviewer.css';

const AñadirReviewer = () => {
  const [formData, setFormData] = useState({ roll: '', username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.roll || !formData.username || !formData.password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    axios
      .post('http://localhost:3001/reviewer/register', formData)
      .then((res) => {
        if (res.data.registered) {
          setSuccess('Reviewer registrado exitosamente.');
          setTimeout(() => navigate('/dashboard'), 2000);
        } else {
          setError('Error al registrar el reviewer.');
        }
      })
      .catch(() => setError('Error al comunicarse con el servidor.'));
  };

  return (
    <div className="añadir-reviewer-container">
      <form className="añadir-reviewer-form" onSubmit={handleSubmit}>
        <h2>Registrar Reviewer</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <label htmlFor="roll">Número de Rol</label>
          <input type="text" id="roll" name="roll" placeholder="Ingrese el número de rol" value={formData.roll} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" name="username" placeholder="Ingrese el nombre de usuario" value={formData.username} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Ingrese la contraseña" value={formData.password} onChange={handleChange}/>
        </div>

        <button type="submit" className="btn-register">Registrar</button>

      </form>
    </div>
  );
};

export default AñadirReviewer;
