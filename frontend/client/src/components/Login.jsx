import React, { useState } from 'react';
import "/src/css/Login.css";

const Login = () => {
    
    const [nombreUsuario, setUsername] = useState("")
    const [contraseña, setPassword] = useState("")
    const [role, setRole] = useState("cliente")
    return (
        <div className='login-page'>
            <div className='login-container'>
                <h2>Login</h2> <br />
                <div className='form-group'>
                    <label htmlFor='nombreUsuario'>Usuario:</label>
                    <input type='text' placeholder='Ingresar Usuario' />
                </div>
                <div className='form-group'>
                    <label htmlFor='contraseña'>Contraseña:</label>
                    <input type='contraseña' placeholder='Ingresar Contraseña' />
                </div>
                <div className="form-group">
                    <label htmlFor='rol'>Rol:</label>
                    <select name="rol" id='rol'>
                        <option value='admin'>Administrador</option>
                        <option value='cliente'>Client</option>
                    </select>
                </div>
                <button class='btn-login'>Login</button>
            </div>
        </div>
    )
}

export default Login