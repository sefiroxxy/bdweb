import express from 'express';
import { Articulo } from '../models/Articulo.js';
import { verifyAdmin } from './auth.js';

const router = express.Router();

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, description, price, imageUrl, storeUrl, tipoCuchillo, onOferta, descuento } = req.body;

        if (!name || !description || !price || !imageUrl || !tipoCuchillo || !storeUrl) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const priceNumber = Number(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            return res.status(400).json({ message: 'El precio debe ser un número positivo.' });
        }

        // Validar onOferta y descuento
        let ofertaBool = onOferta === true;
        let descuentoNum = Number(descuento) || 0;
        if (ofertaBool && (isNaN(descuentoNum) || descuentoNum < 0 || descuentoNum > 100)) {
            return res.status(400).json({ message: 'El descuento debe ser un número entre 0 y 100.' });
        }

        const nuevoArticulo = new Articulo({
            name,
            description,
            price: priceNumber,
            imageUrl,
            storeUrl,
            tipoCuchillo,
            onOferta: ofertaBool,
            descuento: descuentoNum
        });

        await nuevoArticulo.save();
        return res.status(201).json({ added: true, message: 'Artículo agregado exitosamente.' });
    } catch (err) {
        console.error(err);
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

router.put('/update/:id', verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, price, imageUrl, storeUrl, tipoCuchillo, onOferta, descuento } = req.body;

        if (!name || !description || !price || !imageUrl || !tipoCuchillo || !storeUrl) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        const priceNumber = Number(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            return res.status(400).json({ message: 'El precio debe ser un número positivo.' });
        }

        let ofertaBool = onOferta === true;
        let descuentoNum = Number(descuento) || 0;
        if (ofertaBool && (isNaN(descuentoNum) || descuentoNum < 0 || descuentoNum > 100)) {
            return res.status(400).json({ message: 'El descuento debe ser un número entre 0 y 100.' });
        }

        await Articulo.findByIdAndUpdate(id, {
            name,
            description,
            price: priceNumber,
            imageUrl,
            storeUrl,
            tipoCuchillo,
            onOferta: ofertaBool,
            descuento: descuentoNum
        });

        return res.status(202).json({ updated: true, message: 'Artículo editado exitosamente.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ updated: false, message: 'Error al editar el artículo.' });
    }
});

router.delete('/delete/:id', verifyAdmin, async (req,res) => {
    try{
        const id = req.params.id;
        const articulo = await Articulo.findByIdAndDelete(id)
        return res.json({deleted: true, articulo})
    }catch(err){
        return res.json(err)
    }   
});

export { router as ArticulosRouter };
