import express from 'express'
import { Admin_sql } from '../models/Admin_sql.js';
import { Reviewer_sql } from '../models/Reviewer_sql.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (role === 'admin') {
            const admin = await Admin_sql.findOne({ username })
            if (!admin) {
                return res.json({ message: "aEl admin no esta regstradoo" })
            }
            const validPassword = await bcrypt.compare(password, admin.password)
            if (!validPassword) {
                return res.json({ message: "Contraseña incorrecta" })
            }
            const token = jwt.sign({ username: admin.username, role: 'admin' }, process.env.Admin_Key)
            res.cookie('token', token, { httpOnly: true, secure: true })
            return res.json({ login: true, role: 'admin' })
        } else if (role === 'reviewer') {
            const reviewer = await Reviewer_sql.findOne({ username })
            if (!reviewer) {
                return res.json({ message: "Reviever no esta registrado" })
            }
            const validPassword = await bcrypt.compare(password, reviewer.password)
            if (!validPassword) {
                return res.json({ message: "Contraseña Incorrecta!!!" })
            }
            const token = jwt.sign({ username: reviewer.username, role: 'reviewer' }, process.env.Reviewer_Key)
            res.cookie('token', token, { httpOnly: true, secure: true })
            return res.json({ login: true, role: 'reviewer' })
        } else {

        }
    } catch (er) {
        res.json(er)
    }
})

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid Admin_sql" })
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                return res.json({ message: "Invalid token" })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}
router.get('/', async (req, res) => {
    try {
        const admin = await Admin_sql.find();
        return res.status(200).json(admin);
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener los artículos.' });
    }
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "Invalid User" })
    } else {
        jwt.verify(token, process.env.Admin_Key, (err, decoded) => {
            if (err) {
                jwt.verify(token, process.env.Reviewer_Key, (err, decoded) => {
                    if (err) {
                        return res.json({ message: "Invalid token" })
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role;
                        next()
                    }
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next()
            }
        })
    }
}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({ login: true, role: req.role })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ logout: true })
})

export { router as Admin_SqlRouter, verifyAdmin }