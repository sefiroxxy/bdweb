import express from "express";
import { Comentario } from "../models/Comentario.js";

const router = express.Router();

// GET /comentarios - Obtener comentarios con filtros
router.get("/", async (req, res) => {
    const { articuloId, username } = req.query;
    let filtro = {};
    if (articuloId) filtro.articuloId = articuloId;
    if (username) filtro.username = username;

    try {
        const comentarios = await Comentario.find(filtro);
        return res.status(200).json(comentarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener comentarios." });
    }
});

// POST /comentarios - Crear un comentario de un artículo
router.post("/", async (req, res) => {
    try {
        const { articuloId, username, rating, comment } = req.body;

        if (!articuloId || !username || !rating || !comment) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        const newComentario = new Comentario({
            articuloId,
            username,
            rating,
            comment
        });

        const savedComentario = await newComentario.save();
        res.status(201).json(savedComentario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear comentario" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const comentario = await Comentario.findByIdAndDelete(id);
        if (!comentario) return res.status(404).json({ error: "Comentario no encontrado" });
        return res.json({ deleted: true, comentario });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar el comentario." });
    }
});

export { router as ComentariosRouter };
