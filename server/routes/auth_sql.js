import express from 'express';
import { Admin_sql } from '../models/Admin_sql.js';
import { Reviewer_sql } from '../models/Reviewer_sql.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Validate input
        if (!username || !password || !role) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        let user;
        let userType;

        // Determinar el tipo de usuario según el role
        if (role === 'admin') {
            user = await Admin_sql.findOne({ where: { username } });
            userType = 'admin';
        } else if (role === 'reviewer') {
            user = await Reviewer_sql.findOne({ where: { username } });
            userType = 'reviewer';
        } else {
            return res.status(400).json({ message: "Rol no válido." });
        }

        // Si el usuario no existe
        if (!user) {
            return res.status(404).json({ message: userType === 'admin' ? 'El admin no está registrado' : 'El reviewer no está registrado' });
        }

        // Validar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar el token
        const key = userType === 'admin' ? process.env.Admin_Key : process.env.Reviewer_Key;
        const token = jwt.sign({ username: user.username, role: userType }, key);

        // Establecer la cookie
        // Nota: 'secure: true' requiere HTTPS; en desarrollo local sin HTTPS, usar secure: false
        res.cookie('token', token, { httpOnly: true, secure: true });

        // Responder con éxito
        return res.json({ login: true, role: userType });
    } catch (error) {
        console.error("Error en login SQL:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin_sql" });
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                return res.json({ message: "Invalid token" });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

router.get('/', async (req, res) => {
    try {
        const admin = await Admin_sql.findAll();
        return res.status(200).json(admin);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al obtener admins.' });
    }
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" });
    } else {
        // Intentar verificar con la llave de admin
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                // Si falla con admin, probar con reviewer
                jwt.verify(token, process.env.Reviewer_Key, (err, decoded) => {
                    if (err) {
                        return res.json({ message: "Invalid token" });
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next();
                    }
                });
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
};

router.get('/verify', verifyUser, (req, res) => {
    // Ahora también devolvemos el username, para que comentarioArticulo.jsx pueda tener el usuario logueado
    return res.json({ login: true, role: req.role, username: req.username });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

export { router as Admin_SqlRouter, verifyAdmin };
