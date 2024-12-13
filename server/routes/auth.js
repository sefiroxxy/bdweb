import express from 'express';
import { Admin } from '../models/Admin.js';
import { Reviewer } from '../models/Reviewer.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (role === 'admin') {
            const admin = await Admin.findOne({ username });
            if (!admin) return res.json({ message: "El admin no está registrado" });

            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) return res.json({ message: "Contraseña incorrecta" });

            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key);
            res.cookie('token', token, { httpOnly: true }); // secure:true en prod
            return res.json({ login: true, role: 'admin' });
        } else if (role === 'reviewer') {
            const reviewer = await Reviewer.findOne({ username });
            if (!reviewer) return res.json({ message: "Reviewer no está registrado" });

            const validPassword = await bcrypt.compare(password, reviewer.password);
            if (!validPassword) return res.json({ message: "Contraseña Incorrecta!!!" });

            const token = jwt.sign({ username: reviewer.username, role: 'reviewer' }, process.env.Reviewer_Key);
            res.cookie('token', token, { httpOnly: true });
            return res.json({ login: true, role: 'reviewer' });
        } else {
            return res.json({ message: "Rol no válido" });
        }
    } catch (er) {
        console.error(er);
        res.json(er);
    }
});

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({ message: "Invalid Admin" });

    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
        if (err) return res.json({ message: "Invalid token" });
        req.username = decoded.username;
        req.role = decoded.role;
        if (req.role !== 'admin') return res.json({ message: "No autorizado" });
        next();
    });
};

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({ message: "Invalid User" });

    jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
        if (err) {
            jwt.verify(token, process.env.Reviewer_Key, (err, decoded) => {
                if (err) return res.json({ message: "Invalid token" });
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            });
        } else {
            req.username = decoded.username;
            req.role = decoded.role;
            next();
        }
    });
};

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role, username: req.username });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
