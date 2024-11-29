import mongoose from "mongoose";


const articuloSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
}, { timestamps: true });

const articuloModel = mongoose.model('Articulo', articuloSchema);

export { articuloModel as Articulo };
