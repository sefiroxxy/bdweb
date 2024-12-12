// routes/articulo.js
import express from 'express';
import { Articulo } from '../models/Articulo.js';
import { verifyAdmin } from './auth.js';

const router = express.Router();

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        if (!name || !description || !price || !imageUrl) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }
        const nuevoArticulo = new Articulo({ name, description, price, imageUrl });
        await nuevoArticulo.save();
        return res.status(201).json({ added: true, message: 'Artículo agregado exitosamente.' });
    } catch (err) {
        return res.status(500).json({ added: false, message: 'Error al agregar el artículo.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const articulos = await Articulo.find();
        return res.status(200).json(articulos);
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener los artículos.' });
    }
});

// routes/articulo.js
router.get('/load/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const articulo = await Articulo.findById(id);
        
    } catch (err) {
        return res.status(500).json({ message: 'Error al obtener los artículos.' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const articulo = await Articulo.findByIdAndUpdate(id, req.body)
        return res.status(202).json({ updated: true, message: 'Artículo editado exitosamente.' });
    } catch (err) {
        return res.status(500).json({ updated: false, message: 'Error al editar el artículo.' });
    }
});
// routes/articulo.js

router.delete('/delete/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const articulo = await Articulo.findByIdAndDelete(id)
        return res.json ({deleted: true, articulo})
    }catch(err){
        return res.json(err)
    }   
});


export { router as ArticulosRouter };
