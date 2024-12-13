import express from 'express'
import { Admin_sql } from '../models/Admin_sql.js';
import { Reviewer_sql } from '../models/Reviewer_sql.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const router = express.Router();


router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Validate input
        if (!username || !password || !role) {
            return res.status(400).json({ message: "All fields are required." });
        }

        let user;
        let userType;

        // Check if the user is an admin
        if (role === 'admin') {
            user = await Admin_sql.findOne({ where: { username } });
            userType = 'admin';
        } 
        // Check if the user is a reviewer
        else if (role === 'reviewer') {
            user = await Reviewer_sql.findOne({ where: { username } });
            userType = 'reviewer';
        } else {
            return res.status(400).json({ message: "Invalid role specified." });
        }

        // If the user is not found
        if (!user) {
            return res.status(404).json({ message: `${userType === 'admin' ? 'Admin' : 'Reviewer'} not found.` });
        }

        // Validate the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        // Generate a token
        const token = jwt.sign({ username: user.username, role: userType }, 
                                userType === 'admin' ? process.env.Admin_Key : process.env.Reviewer_Key);

        // Set cookie
        res.cookie('token', token, { httpOnly: true, secure: true });

        // Respond with success
        return res.json({ login: true, role: userType });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

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