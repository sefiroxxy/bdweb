import express from 'express'
import { Reviewer } from '../models/Reviewer.js';
import bcrypt from 'bcrypt'
const router = express.Router();
import { verifyAdmin } from './auth.js';

router.post('/register', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const reviewers = await Reviewer.find();
        return res.status(200).json(reviewers);
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener los artículos.' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("" + id);
        const reviewer = await Reviewer.findByIdAndUpdate(id, req.body)
        return res.status(202).json({ updated: true, message: 'console.log("" + id);.' });
    } catch (err) {
        return res.status(500).json({ updated: false, message: 'Error al editar el reviewer.' });
    }
});

router.delete('/delete/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const reviewer = await Reviewer.findByIdAndDelete(id)
        return res.json ({deleted: true, reviewer})
    }catch(err){
        return res.json(err)
    }   
})

export { router as ReviewerRouter }