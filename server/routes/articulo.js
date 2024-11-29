import express from 'express';
import { Articulo } from '../models/Articulo.js';
import { verifyAdmin } from './auth.js';

const router = express.Router();

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        if (!name || !description || !price || !imageUrl) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        const nuevoArticulo = new Articulo({ name, description, price, imageUrl });
        await nuevoArticulo.save();
        return res.status(201).json({ added: true, message: "Artículo agregado exitosamente." });
    } catch (err) {
        return res.status(500).json({ added: false, message: "Error al agregar el artículo." });
    }
});

router.get('/', async (req, res) => {
    try {
        const articulos = await Articulo.find();
        return res.status(200).json(articulos);
    } catch (err) {
        return res.status(500).json({ message: "Error al obtener los artículos." });
    }
});

export { router as ArticulosRouter };
