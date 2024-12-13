import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
    articuloId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Articulo",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

export const Comentario = mongoose.model("Comentario", comentarioSchema);
