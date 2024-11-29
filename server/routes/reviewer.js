import express from 'express'
import { Reviewer } from '../models/Reviewer.js';
import bcrypt from 'bcrypt'
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register', verifyAdmin, async (req, res) => {
    try {
        const { username, password, roll } = req.body;
        const reviewer = await Reviewer.findOne({ username })
        if (reviewer) {
            return res.json({ message: "reviewer esta registrado" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newreviewer = new Reviewer({
            username,
            password: hashPassword,
            roll: roll
        })
        await newreviewer.save()
        return res.json({ registered: true })
    } catch (err) {
        return res.json({ message: "Error al registrar al usuario" })
    }
})

export { router as ReviewerRouter }