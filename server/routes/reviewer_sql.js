import express from 'express'
import { Reviewer_sql } from '../models/Reviewer_sql.js';
import bcrypt from 'bcrypt'
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const reviewer = await Reviewer_sql.findOne({ where: { username: username } });
        if (reviewer) {
            return res.json({ message: "reviewer esta registrado" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newReviewer = await Reviewer_sql.create({
            username,
            password: hashPassword,
        });
        return res.json({ registered: true })
    } catch (err) {
        return res.json({ message: "Error al registrar al usuario" })
    }
})

router.get('/', async (req, res) => {
    try {
        const reviewers = await Reviewer_sql.findAll();
        return res.status(200).json(reviewers);
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener los artículos.' });
    }
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        console.log("" + id);
        const [updated] = await Reviewer_sql.update(
            { username, password: hashedPassword }, // Fields to update
            { where: { id } } // Condition to find the user
        );
        return res.status(202).json({ updated: true, message: 'console.log("" + id);.' });
    } catch (err) {
        return res.status(500).json({ updated: false, message: 'Error al editar el reviewer.' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the reviewer exists
        const reviewer = await Reviewer_sql.findOne({ where: { id } });

        if (!reviewer) {
            return res.status(404).json({ deleted: false, message: "Reviewer not found" });
        }

        // Proceed to delete the reviewer
        await Reviewer_sql.destroy({ where: { id } });

        return res.json({ deleted: true, reviewer });
    } catch (err) {
        console.error("Error deleting reviewer:", err);
        return res.status(500).json({ deleted: false, error: err.message });
    }
});

export { router as Reviewer_sqlRouter }