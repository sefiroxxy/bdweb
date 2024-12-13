import express from 'express'
import { Reviewer } from '../models/Reviewer.js';
import bcrypt from 'bcrypt'
const router = express.Router();
// Si se requiere verifyAdmin, importarlo: import { verifyAdmin } from './auth.js';

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const reviewer = await Reviewer.findOne({ username });
        if (reviewer) {
            return res.json({ message: "Reviewer ya está registrado" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newreviewer = new Reviewer({
            username,
            password: hashPassword,
        });
        await newreviewer.save();
        return res.json({ registered: true });
    } catch (err) {
        console.error(err);
        return res.json({ message: "Error al registrar al usuario" });
    }
});

router.get('/', async (req, res) => {
    try {
        const reviewers = await Reviewer.find();
        return res.status(200).json(reviewers);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al obtener los reviewers.' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("ID:", id);
        await Reviewer.findByIdAndUpdate(id, req.body);
        return res.status(202).json({ updated: true, message: 'Reviewer editado exitosamente.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ updated: false, message: 'Error al editar el reviewer.' });
    }
});

router.delete('/delete/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const reviewer = await Reviewer.findByIdAndDelete(id);
        return res.json ({deleted: true, reviewer});
    }catch(err){
        console.error(err);
        return res.json(err);
    }   
});

export { router as ReviewerRouter };
