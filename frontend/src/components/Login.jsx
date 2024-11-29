import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from 'axios';

const Login = ({ setRoleVar }) => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');


    if (!formData.username || !formData.password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    axios
      .post('http://localhost:3001/auth/login', formData)
      .then((res) => {
        if (res.data.login) {
          setRoleVar(res.data.role);
          res.data.role === 'admin' ? navigate('/dashboard') : navigate('/');
        } else {
          setError('Credenciales incorrectas. Intente nuevamente.');
        }
      })
      .catch(() => {
        setError('Hubo un problema con el servidor. Intente nuevamente más tarde.');
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Inicio de Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input type="text" id="username" name="username" placeholder="Ingrese su nombre de usuario" value={formData.username} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="role">Rol</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="admin">Administrador</option>
              <option value="reviewer">Reviewer</option>
            </select>
          </div>

          <button type="submit" className="btn-login">Iniciar Sesión</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
